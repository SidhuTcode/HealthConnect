// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Route to show the booking page
router.get('/book', appointmentController.getBooking);

// Route to handle appointment submission
router.post('/book', appointmentController.postBooking);

router.get('/history', appointmentController.getAppointmentHistory);

router.post('/cancel', appointmentController.cancelAppointment);

module.exports = router;
