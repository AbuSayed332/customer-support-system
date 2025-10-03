const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
      maxlength: [1000, 'Comment cannot be more than 1000 characters'],
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isInternal: {
      type: Boolean,
      default: false, // Internal comments only visible to admins
    },
    attachments: [
      {
        filename: String,
        originalName: String,
        path: String,
        mimetype: String,
        size: Number,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    edited: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Update edited status when comment is modified
commentSchema.pre('save', function (next) {
  if (this.isModified('content') && !this.isNew) {
    this.edited = true;
    this.editedAt = Date.now();
  }
  next();
});

// Index for faster queries
commentSchema.index({ ticket: 1, createdAt: -1 });

module.exports = mongoose.model('Comment', commentSchema);
