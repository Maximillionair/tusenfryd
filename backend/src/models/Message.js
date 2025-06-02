const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['chat', 'notification', 'alert'],
    default: 'chat'
  },
  department: {
    type: String,
    enum: ['all', 'sales', 'operations', 'it', 'management'],
    default: 'all'
  },
  readBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    readAt: {
      type: Date,
      default: Date.now
    }
  }],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  relatedAttraction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attraction'
  }
}, {
  timestamps: true
});

// Index for efficient querying
messageSchema.index({ department: 1, createdAt: -1 });
messageSchema.index({ sender: 1, createdAt: -1 });
messageSchema.index({ type: 1, priority: 1 });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message; 