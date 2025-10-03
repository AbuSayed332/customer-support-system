const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
      maxlength: [1000, 'Message cannot be more than 1000 characters'],
    },
    messageType: {
      type: String,
      enum: ['text', 'file', 'system'],
      default: 'text',
    },
    attachment: {
      filename: String,
      originalName: String,
      path: String,
      mimetype: String,
      size: Number,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Mark message as read
chatSchema.methods.markAsRead = function () {
  this.isRead = true;
  this.readAt = Date.now();
  return this.save();
};

// Mark message as delivered
chatSchema.methods.markAsDelivered = function () {
  this.isDelivered = true;
  this.deliveredAt = Date.now();
  return this.save();
};

// Index for faster queries
chatSchema.index({ ticket: 1, createdAt: 1 });
chatSchema.index({ sender: 1, receiver: 1 });

module.exports = mongoose.model('Chat', chatSchema);