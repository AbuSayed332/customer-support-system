const Comment = require('../models/Comment');

// @desc    Add comment to ticket
// @route   POST /api/v1/tickets/:ticketId/comments
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const { content, isInternal } = req.body;
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
        message: 'Not authorized to comment on this ticket',
      });
    }

    // Only admins can create internal comments
    if (isInternal && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can create internal comments',
      });
    }

    // Handle file attachments
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

    const comment = await Comment.create({
      content,
      ticket: ticketId,
      author: req.user.id,
      isInternal: isInternal || false,
      attachments,
    });

    await comment.populate('author', 'name email role');

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding comment',
      error: error.message,
    });
  }
};

// @desc    Get all comments for a ticket
// @route   GET /api/v1/tickets/:ticketId/comments
// @access  Private
exports.getComments = async (req, res) => {
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
        message: 'Not authorized to view comments on this ticket',
      });
    }

    // Build query
    const query = { ticket: ticketId };

    // Hide internal comments from customers
    if (req.user.role === 'customer') {
      query.isInternal = false;
    }

    const comments = await Comment.find(query)
      .populate('author', 'name email role')
      .sort('createdAt');

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching comments',
      error: error.message,
    });
  }
};

// @desc    Update comment
// @route   PUT /api/v1/comments/:id
// @access  Private
exports.updateComment = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    // Check if user is the author
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this comment',
      });
    }

    comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true, runValidators: true }
    ).populate('author', 'name email role');

    res.status(200).json({
      success: true,
      message: 'Comment updated successfully',
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating comment',
      error: error.message,
    });
  }
};

// @desc    Delete comment
// @route   DELETE /api/v1/comments/:id
// @access  Private
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    // Check if user is the author or admin
    if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment',
      });
    }

    await comment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting comment',
      error: error.message,
    });
  }
};
