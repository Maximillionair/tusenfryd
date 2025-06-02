const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  attraction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attraction',
    required: true
  },
  visitorId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['waiting', 'ready', 'completed', 'cancelled'],
    default: 'waiting'
  },
  estimatedWaitTime: {
    type: Number,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  notificationSent: {
    type: Boolean,
    default: false
  },
  entryTime: {
    type: Date,
    default: Date.now
  },
  readyTime: {
    type: Date
  },
  completionTime: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for efficient querying
queueSchema.index({ attraction: 1, status: 1, position: 1 });
queueSchema.index({ visitorId: 1 });

const Queue = mongoose.model('Queue', queueSchema);

module.exports = Queue; 