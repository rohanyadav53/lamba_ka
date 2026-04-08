const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    trim: true
  },
  university: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    default: 'Website'
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'In Progress', 'Closed', 'Converted'],
    default: 'New'
  },
  notes: {
    type: String,
    trim: true
  },
  assignedCounselor: {
    type: String,
    trim: true
  },
  contactedBy: {
    type: String,
    trim: true
  }
}, {
  timestamps: true // Automatically manages createdAt and updatedAt
});

// Create text index for search functionality in Admin Dashboard
leadSchema.index({ name: 'text', email: 'text', phone: 'text' });

module.exports = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
