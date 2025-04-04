// model/Appointment.js
const mongoose = require('mongoose');

// Check if the model is already registered to prevent overwriting
const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', new mongoose.Schema({
  hospitalName: {
    type: String,
    required: true,
  },
  hospitalAddress: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  patientEmail: {
    type: String,
    required: true,
  },
  doctor: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  doctorSpecialization: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'confirmed', 
  },
}));

module.exports = Appointment;
