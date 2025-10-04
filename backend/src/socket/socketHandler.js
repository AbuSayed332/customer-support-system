const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const chatEvents = require('./chatEvents');

// Store connected users
const connectedUsers = new Map();

/**
 * Initialize Socket.IO server
 * @param {Object} server - HTTP server instance
 * @returns {Object} Socket.IO instance
 */
const initializeSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: process.env.SOCKET_CORS_ORIGIN || process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // ============================================================================
  // AUTHENTICATION MIDDLEWARE
  // ============================================================================

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];

      if (!token) {
        return next(new Error('Authentication token required'));
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from database
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return next(new Error('User not found'));
      }

      if (!user.isActive) {
        return next(new Error('Account is deactivated'));
      }

      // Attach user to socket
      socket.user = user;
      next();
    } catch (error) {
      console.error('Socket authentication error:', error.message);
      next(new Error('Authentication failed'));
    }
  });

  // ============================================================================
  // CONNECTION HANDLER
  // ============================================================================

  io.on('connection', (socket) => {
    const userId = socket.user._id.toString();
    const userName = socket.user.name;
    const userRole = socket.user.role;

    console.log(`✅ User connected: ${userName} (${userRole}) - Socket ID: ${socket.id}`);

    // Store connected user
    connectedUsers.set(userId, {
      socketId: socket.id,
      userId,
      userName,
      userRole,
      connectedAt: new Date(),
    });

    // Send connection confirmation
    socket.emit('connected', {
      message: 'Successfully connected to chat server',
      user: {
        id: userId,
        name: userName,
        role: userRole,
      },
    });

    // Broadcast online status to all users
    io.emit('user_online', {
      userId,
      userName,
      userRole,
    });

    // ============================================================================
    // CHAT EVENTS
    // ============================================================================

    // Join ticket room
    socket.on('join_ticket', (data) => chatEvents.handleJoinTicket(io, socket, data));

    // Leave ticket room
    socket.on('leave_ticket', (data) => chatEvents.handleLeaveTicket(io, socket, data));

    // Send message
    socket.on('send_message', (data) => chatEvents.handleSendMessage(io, socket, data, connectedUsers));

    // Typing indicator
    socket.on('typing', (data) => chatEvents.handleTyping(io, socket, data));

    // Stop typing indicator
    socket.on('stop_typing', (data) => chatEvents.handleStopTyping(io, socket, data));

    // Mark message as read
    socket.on('mark_as_read', (data) => chatEvents.handleMarkAsRead(io, socket, data));

    // Get online users
    socket.on('get_online_users', () => {
      socket.emit('online_users', Array.from(connectedUsers.values()));
    });

    // Get connected user info
    socket.on('get_user_info', () => {
      socket.emit('user_info', {
        userId,
        userName,
        userRole,
        socketId: socket.id,
      });
    });

    // ============================================================================
    // NOTIFICATION EVENTS
    // ============================================================================

    // New ticket notification
    socket.on('new_ticket', (data) => {
      // Notify all admins about new ticket
      if (userRole === 'customer') {
        connectedUsers.forEach((user) => {
          if (user.userRole === 'admin') {
            io.to(user.socketId).emit('ticket_created', {
              ticketId: data.ticketId,
              ticketNumber: data.ticketNumber,
              subject: data.subject,
              customer: userName,
              priority: data.priority,
              createdAt: new Date(),
            });
          }
        });
      }
    });

    // Ticket assignment notification
    socket.on('ticket_assigned', (data) => {
      const assignedUser = Array.from(connectedUsers.values()).find(
        u => u.userId === data.assignedToId
      );
      
      if (assignedUser) {
        io.to(assignedUser.socketId).emit('assigned_to_ticket', {
          ticketId: data.ticketId,
          ticketNumber: data.ticketNumber,
          subject: data.subject,
          assignedBy: userName,
        });
      }
    });

    // Ticket status change notification
    socket.on('ticket_status_changed', (data) => {
      socket.to(`ticket_${data.ticketId}`).emit('status_updated', {
        ticketId: data.ticketId,
        oldStatus: data.oldStatus,
        newStatus: data.newStatus,
        updatedBy: userName,
      });
    });

    // New comment notification
    socket.on('new_comment', (data) => {
      socket.to(`ticket_${data.ticketId}`).emit('comment_added', {
        ticketId: data.ticketId,
        commentId: data.commentId,
        content: data.content,
        author: userName,
        createdAt: new Date(),
      });
    });

    // ============================================================================
    // ERROR HANDLING
    // ============================================================================

    socket.on('error', (error) => {
      console.error(`Socket error for user ${userName}:`, error);
      socket.emit('error_occurred', {
        message: 'An error occurred',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    });

    // ============================================================================
    // DISCONNECTION HANDLER
    // ============================================================================

    socket.on('disconnect', (reason) => {
      console.log(`❌ User disconnected: ${userName} - Reason: ${reason}`);
      
      // Remove from connected users
      connectedUsers.delete(userId);

      // Broadcast offline status
      io.emit('user_offline', {
        userId,
        userName,
        userRole,
      });

      // Leave all rooms
      socket.rooms.forEach(room => {
        if (room !== socket.id) {
          socket.leave(room);
        }
      });
    });
  });

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  /**
   * Get connected users count
   */
  io.getConnectedUsersCount = () => {
    return connectedUsers.size;
  };

  /**
   * Get connected users by role
   */
  io.getConnectedUsersByRole = (role) => {
    return Array.from(connectedUsers.values()).filter(user => user.userRole === role);
  };

  /**
   * Send notification to specific user
   */
  io.sendToUser = (userId, event, data) => {
    const user = connectedUsers.get(userId);
    if (user) {
      io.to(user.socketId).emit(event, data);
      return true;
    }
    return false;
  };

  /**
   * Send notification to all admins
   */
  io.sendToAdmins = (event, data) => {
    connectedUsers.forEach((user) => {
      if (user.userRole === 'admin') {
        io.to(user.socketId).emit(event, data);
      }
    });
  };

  /**
   * Send notification to ticket participants
   */
  io.sendToTicketRoom = (ticketId, event, data) => {
    io.to(`ticket_${ticketId}`).emit(event, data);
  };

  console.log('✅ Socket.IO server initialized');

  return io;
};

// ============================================================================
// EXPORT
// ============================================================================

module.exports = {
  initializeSocket,
  connectedUsers,
};
