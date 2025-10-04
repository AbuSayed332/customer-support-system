const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, 'Please provide a ticket subject'],
      trim: true,
      maxlength: [200, 'Subject cannot be more than 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a ticket description'],
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: [
        'Technical Support',
        'Billing',
        'Account',
        'Feature Request',
        'Bug Report',
        'General Inquiry',
        'Other',
      ],
    },
    priority: {
      type: String,
      required: [true, 'Please select a priority level'],
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
      default: 'Open',
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
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
    resolvedAt: {
      type: Date,
    },
    closedAt: {
      type: Date,
    },
    ticketNumber: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Generate unique ticket number before saving
ticketSchema.pre('save', async function (next) {
  if (!this.ticketNumber) {
    const count = await mongoose.model('Ticket').countDocuments();
    this.ticketNumber = `TKT-${Date.now()}-${(count + 1).toString().padStart(5, '0')}`;
  }
  next();
});

// Update resolvedAt when status changes to Resolved
ticketSchema.pre('save', function (next) {
  if (this.isModified('status')) {
    if (this.status === 'Resolved' && !this.resolvedAt) {
      this.resolvedAt = Date.now();
    }
    if (this.status === 'Closed' && !this.closedAt) {
      this.closedAt = Date.now();
    }
  }
  next();
});

// Virtual for comments
ticketSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'ticket',
  justOne: false,
});

// Index for faster queries
ticketSchema.index({ customer: 1, status: 1 });
ticketSchema.index({ ticketNumber: 1 });

module.exports = mongoose.model('Ticket', ticketSchema);