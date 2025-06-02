const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'maintenance'],
    default: 'open'
  },
  currentWaitTime: {
    type: Number,
    default: 0
  },
  openingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  minimumHeight: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['rollercoaster', 'water', 'family', 'thrill', 'kids'],
    required: true
  },
  imageUrl: {
    type: String
  },
  capacity: {
    type: Number,
    required: true
  },
  currentOccupancy: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for search functionality
attractionSchema.index({ name: 'text', description: 'text' });

const Attraction = mongoose.model('Attraction', attractionSchema);

module.exports = Attraction; 