const Chat = require('../models/Chat');

// @desc    Send chat message
// @route   POST /api/v1/chat
// @access  Private
exports.sendMessage = async (req, res) => {
  try {
    const { ticketId, receiverId, message, messageType } = req.body;

    // Check if ticket exists
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    // Check permissions
    if (req.user.role === 'customer' && ticket.customer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to chat on this ticket',
      });
    }

    // Handle file attachment
    let attachment = null;
    if (req.file) {
      attachment = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      };
    }

    const chatMessage = await Chat.create({
      ticket: ticketId,
      sender: req.user.id,
      receiver: receiverId,
      message,
      messageType: messageType || 'text',
      attachment,
    });

    await chatMessage.populate('sender', 'name email role');
    await chatMessage.populate('receiver', 'name email role');

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: chatMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.message,
    });
  }
};

// @desc    Get chat messages for a ticket
// @route   GET /api/v1/chat/ticket/:ticketId
// @access  Private
exports.getChatMessages = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;

    // Check if ticket exists
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    // Check permissions
    if (req.user.role === 'customer' && ticket.customer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view chat messages on this ticket',
      });
    }

    const messages = await Chat.find({ ticket: ticketId })
      .populate('sender', 'name email role')
      .populate('receiver', 'name email role')
      .sort('createdAt');

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching chat messages',
      error: error.message,
    });
  }
};

// @desc    Get chat conversations
// @route   GET /api/v1/chat/conversations
// @access  Private
exports.getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const conversations = await Chat.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: '$ticket',
          lastMessage: { $first: '$$ROOT' },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$receiver', userId] },
                    { $eq: ['$isRead', false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: 'tickets',
          localField: '_id',
          foreignField: '_id',
          as: 'ticket',
        },
      },
      {
        $unwind: '$ticket',
      },
      {
        $sort: { 'lastMessage.createdAt': -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      count: conversations.length,
      data: conversations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching conversations',
      error: error.message,
    });
  }
};

// @desc    Mark message as read
// @route   PUT /api/v1/chat/:id/read
// @access  Private
exports.markAsRead = async (req, res) => {
  try {
    const message = await Chat.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    // Only receiver can mark as read
    if (message.receiver.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to mark this message as read',
      });
    }

    await message.markAsRead();

    res.status(200).json({
      success: true,
      message: 'Message marked as read',
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error marking message as read',
      error: error.message,
    });
  }
};

// @desc    Get unread message count
// @route   GET /api/v1/chat/unread/count
// @access  Private
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Chat.countDocuments({
      receiver: req.user.id,
      isRead: false,
    });

    res.status(200).json({
      success: true,
      data: { count },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching unread count',
      error: error.message,
    });
  }
};