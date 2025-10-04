const Ticket = require('../models/Ticket');
const Comment = require('../models/Comment');

// @desc    Create new ticket
// @route   POST /api/v1/tickets
// @access  Private (Customer & Admin)
exports.createTicket = async (req, res) => {
  try {
    const { subject, description, category, priority } = req.body;

    // Add customer ID from authenticated user
    req.body.customer = req.user.id;

    // Handle file attachments if any
    const attachments = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        attachments.push({
          filename: file.filename,
          originalName: file.originalname,
          path: file.path,
          mimetype: file.mimetype,
          size: file.size,
        });
      });
    }

    const ticket = await Ticket.create({
      subject,
      description,
      category,
      priority,
      customer: req.user.id,
      attachments,
    });

    // Populate customer details
    await ticket.populate('customer', 'name email');

    res.status(201).json({
      success: true,
      message: 'Ticket created successfully',
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating ticket',
      error: error.message,
    });
  }
};

// @desc    Get all tickets
// @route   GET /api/v1/tickets
// @access  Private (Customer sees own, Admin sees all)
exports.getAllTickets = async (req, res) => {
  try {
    let query;

    // Build query based on user role
    if (req.user.role === 'customer') {
      query = { customer: req.user.id };
    } else {
      query = {};
    }

    // Filter by status if provided
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by category if provided
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by priority if provided
    if (req.query.priority) {
      query.priority = req.query.priority;
    }

    // Search functionality
    if (req.query.search) {
      query.$or = [
        { subject: { $regex: req.query.search, $options: 'i' } },
        { ticketNumber: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Ticket.countDocuments(query);

    const tickets = await Ticket.find(query)
      .populate('customer', 'name email')
      .populate('assignedTo', 'name email')
      .sort('-createdAt')
      .skip(startIndex)
      .limit(limit);

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: tickets.length,
      total,
      pagination,
      data: tickets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tickets',
      error: error.message,
    });
  }
};

// @desc    Get single ticket
// @route   GET /api/v1/tickets/:id
// @access  Private
exports.getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('assignedTo', 'name email');

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    // Check ownership (customer can only view own tickets)
    if (req.user.role === 'customer' && ticket.customer._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this ticket',
      });
    }

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching ticket',
      error: error.message,
    });
  }
};

// @desc    Update ticket
// @route   PUT /api/v1/tickets/:id
// @access  Private
exports.updateTicket = async (req, res) => {
  try {
    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    // Check permissions
    if (req.user.role === 'customer') {
      // Customers can only update their own tickets
      if (ticket.customer.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this ticket',
        });
      }
      // Customers can only update certain fields
      const allowedUpdates = ['subject', 'description', 'priority'];
      const updates = Object.keys(req.body);
      const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
      
      if (!isValidUpdate) {
        return res.status(400).json({
          success: false,
          message: 'Invalid updates. Customers can only update subject, description, and priority',
        });
      }
    }

    ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('customer', 'name email')
      .populate('assignedTo', 'name email');

    res.status(200).json({
      success: true,
      message: 'Ticket updated successfully',
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating ticket',
      error: error.message,
    });
  }
};

// @desc    Delete ticket
// @route   DELETE /api/v1/tickets/:id
// @access  Private (Admin only)
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    // Only admin can delete tickets
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete tickets',
      });
    }

    // Delete associated comments
    await Comment.deleteMany({ ticket: req.params.id });

    await ticket.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Ticket and associated comments deleted successfully',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting ticket',
      error: error.message,
    });
  }
};

// @desc    Assign ticket to admin
// @route   PUT /api/v1/tickets/:id/assign
// @access  Private (Admin only)
exports.assignTicket = async (req, res) => {
  try {
    const { adminId } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { assignedTo: adminId, status: 'In Progress' },
      { new: true, runValidators: true }
    ).populate('customer', 'name email')
      .populate('assignedTo', 'name email');

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Ticket assigned successfully',
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error assigning ticket',
      error: error.message,
    });
  }
};