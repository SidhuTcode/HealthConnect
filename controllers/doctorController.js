 // contollers/doctorController.js
const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor'); // Assuming you have this model
const moment = require('moment');

// API route to get time slots for a doctor
router.get('/api/timeSlots/:doctorId', async (req, res) => {
    try {
      const doctor = await Doctor.findById(req.params.doctorId);
  
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      // Return all schedules
      res.json(doctor.schedule);
    } catch (error) {
      console.error('Error fetching time slots:', error);
      res.status(500).json({ message: 'Error fetching time slots' });
    }
  });
  
  
  

module.exports = router;
