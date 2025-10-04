const Chat = require('../models/Chat');
const Ticket = require('../models/Ticket');
const User = require('../models/User');

/**
 * Handle user joining a ticket chat room
 */
exports.handleJoinTicket = async (io, socket, data) => {
  try {
    const { ticketId } = data;

    if (!ticketId) {
      return socket.emit('error', { message: 'Ticket ID is required' });
    }

    // Verify ticket exists
    const ticket = await Ticket.findById(ticketId);
    
    if (!ticket) {
      return socket.emit('error', { message: 'Ticket not found' });
    }

    // Check permissions
    const userId = socket.user._id.toString();
    const isCustomer = socket.user.role === 'customer';
    const isAdmin = socket.user.role === 'admin';

    if (isCustomer && ticket.customer.toString() !== userId) {
      return socket.emit('error', { message: 'Not authorized to join this ticket' });
    }

    // Join the ticket room
    const roomName = `ticket_${ticketId}`;
    socket.join(roomName);

    console.log(`📥 ${socket.user.name} joined room: ${roomName}`);

    // Notify room participants
    socket.to(roomName).emit('user_joined_ticket', {
      ticketId,
      userName: socket.user.name,
      userRole: socket.user.role,
      joinedAt: new Date(),
    });

    // Send confirmation to user
    socket.emit('joined_ticket', {
      ticketId,
      roomName,
      message: 'Successfully joined ticket chat',
    });

    // Load and send recent messages
    const messages = await Chat.find({ ticket: ticketId })
      .populate('sender', 'name email role')
      .populate('receiver', 'name email role')
      .sort('createdAt')
      .limit(50);

    socket.emit('chat_history', {
      ticketId,
      messages,
    });

  } catch (error) {
    console.error('Error joining ticket:', error);
    socket.emit('error', { message: 'Failed to join ticket', error: error.message });
  }
};

/**
 * Handle user leaving a ticket chat room
 */
exports.handleLeaveTicket = (io, socket, data) => {
  try {
    const { ticketId } = data;

    if (!ticketId) {
      return socket.emit('error', { message: 'Ticket ID is required' });
    }

    const roomName = `ticket_${ticketId}`;
    socket.leave(roomName);

    console.log(`📤 ${socket.user.name} left room: ${roomName}`);

    // Notify room participants
    socket.to(roomName).emit('user_left_ticket', {
      ticketId,
      userName: socket.user.name,
      userRole: socket.user.role,
      leftAt: new Date(),
    });

    // Send confirmation
    socket.emit('left_ticket', {
      ticketId,
      message: 'Successfully left ticket chat',
    });

  } catch (error) {
    console.error('Error leaving ticket:', error);
    socket.emit('error', { message: 'Failed to leave ticket', error: error.message });
  }
};

/**
 * Handle sending a chat message
 */
exports.handleSendMessage = async (io, socket, data, connectedUsers) => {
  try {
    const { ticketId, receiverId, message, messageType = 'text' } = data;

    if (!ticketId || !receiverId || !message) {
      return socket.emit('error', { message: 'Missing required fields' });
    }

    // Verify ticket and permissions
    const ticket = await Ticket.findById(ticketId);
    
    if (!ticket) {
      return socket.emit('error', { message: 'Ticket not found' });
    }

    const userId = socket.user._id.toString();
    const isCustomer = socket.user.role === 'customer';

    if (isCustomer && ticket.customer.toString() !== userId) {
      return socket.emit('error', { message: 'Not authorized to send messages on this ticket' });
    }

    // Create chat message
    const chatMessage = await Chat.create({
      ticket: ticketId,
      sender: userId,
      receiver: receiverId,
      message,
      messageType,
    });

    // Populate sender and receiver info
    await chatMessage.populate('sender', 'name email role');
    await chatMessage.populate('receiver', 'name email role');

    // Mark as delivered if receiver is online
    const receiver = connectedUsers.get(receiverId);
    if (receiver) {
      await chatMessage.markAsDelivered();
    }

    // Send to ticket room
    const roomName = `ticket_${ticketId}`;
    io.to(roomName).emit('message_received', {
      messageId: chatMessage._id,
      ticketId,
      sender: {
        id: chatMessage.sender._id,
        name: chatMessage.sender.name,
        role: chatMessage.sender.role,
      },
      receiver: {
        id: chatMessage.receiver._id,
        name: chatMessage.receiver.name,
      },
      message: chatMessage.message,
      messageType: chatMessage.messageType,
      isDelivered: chatMessage.isDelivered,
      createdAt: chatMessage.createdAt,
    });

    // Send delivery confirmation to sender
    socket.emit('message_sent', {
      messageId: chatMessage._id,
      ticketId,
      status: 'sent',
    });

    // Send notification to receiver if online
    if (receiver) {
      io.to(receiver.socketId).emit('new_message_notification', {
        messageId: chatMessage._id,
        ticketId,
        ticketNumber: ticket.ticketNumber,
        sender: socket.user.name,
        preview: message.substring(0, 50),
      });
    }

    console.log(`💬 Message sent from ${socket.user.name} in ticket ${ticket.ticketNumber}`);

  } catch (error) {
    console.error('Error sending message:', error);
    socket.emit('error', { message: 'Failed to send message', error: error.message });
  }
};

/**
 * Handle typing indicator
 */
exports.handleTyping = (io, socket, data) => {
  try {
    const { ticketId } = data;

    if (!ticketId) {
      return socket.emit('error', { message: 'Ticket ID is required' });
    }

    const roomName = `ticket_${ticketId}`;
    
    socket.to(roomName).emit('user_typing', {
      ticketId,
      userId: socket.user._id,
      userName: socket.user.name,
    });

  } catch (error) {
    console.error('Error handling typing:', error);
  }
};

/**
 * Handle stop typing indicator
 */
exports.handleStopTyping = (io, socket, data) => {
  try {
    const { ticketId } = data;

    if (!ticketId) {
      return socket.emit('error', { message: 'Ticket ID is required' });
    }

    const roomName = `ticket_${ticketId}`;
    
    socket.to(roomName).emit('user_stop_typing', {
      ticketId,
      userId: socket.user._id,
      userName: socket.user.name,
    });

  } catch (error) {
    console.error('Error handling stop typing:', error);
  }
};

/**
 * Handle mark message as read
 */
exports.handleMarkAsRead = async (io, socket, data) => {
  try {
    const { messageId, ticketId } = data;

    if (!messageId) {
      return socket.emit('error', { message: 'Message ID is required' });
    }

    const message = await Chat.findById(messageId);

    if (!message) {
      return socket.emit('error', { message: 'Message not found' });
    }

    // Only receiver can mark as read
    if (message.receiver.toString() !== socket.user._id.toString()) {
      return socket.emit('error', { message: 'Not authorized' });
    }

    // Mark as read
    await message.markAsRead();

    // Notify sender
    const roomName = `ticket_${ticketId}`;
    socket.to(roomName).emit('message_read', {
      messageId,
      ticketId,
      readBy: socket.user.name,
      readAt: message.readAt,
    });

    // Send confirmation
    socket.emit('marked_as_read', {
      messageId,
      status: 'success',
    });

    console.log(`✅ Message ${messageId} marked as read by ${socket.user.name}`);

  } catch (error) {
    console.error('Error marking message as read:', error);
    socket.emit('error', { message: 'Failed to mark as read', error: error.message });
  }
};