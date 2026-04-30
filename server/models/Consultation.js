const mongoose = require('mongoose');
// consultation schema
const ConsultationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  issue: {
    type: String,
    required: [true, 'Issue description is required'],
    maxLength: [300, 'Issue cannot exceed 300 characters'],
    trim: true
  },
  timeSlot: {
    type: String,
    required: [true, 'Preferred time slot is required'],
    enum: ['morning', 'afternoon', 'evening']
  },
  referenceId: {
    type: String,
    unique: true,
    required: true
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'contacted', 'resolved']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional for anonymous requests, but required for authenticated flow
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Consultation', ConsultationSchema);
