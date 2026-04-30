const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    enum: ['Criminal Law', 'Corporate Law', 'Family Law', 'Civil Litigation'],
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
  photo: {
    type: String,
    required: true
  },
  coordinates: {
    type: [Number], // Expects exactly [lat, lng]
    required: true,
    validate: {
      validator: function(v) {
        return v.length === 2;
      },
      message: 'Coordinates must be exactly 2 numbers: [latitude, longitude]'
    }
  },
  credentials: [{
    title: { type: String, required: true },
    body: { type: String, required: true }
  }],
  timeline: [{
    year: { type: String, required: true },
    event: { type: String, required: true }
  }]
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
