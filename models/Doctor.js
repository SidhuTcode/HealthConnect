// models/Doctor.js
const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  date: {
    type: String, // format "YYYY-MM-DD"
    required: true
  },
  timeSlots: [{
    type: String, // e.g., "10:00 AM", "02:00 PM"
    required: true
  }]
});

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  schedule: [timeSlotSchema] // List of schedules for each date
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
