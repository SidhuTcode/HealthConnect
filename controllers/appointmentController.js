// controllers/appointmentController.js
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Hospital = require('../models/Hospital');
// Display booking form
exports.getBooking = async (req, res) => {
  try {
    // Fetch all doctors from the database
    const doctors = await Doctor.find();
  const { name, address } = req.query;
  res.render('appointments/book', {
    title: 'Book Appointment',
    hospitalName: name,
    hospitalAddress: address,
    doctors: doctors,
  });
  }catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Error fetching doctors' });
  }

  
};



// Handle appointment booking
exports.postBooking = async (req, res) => {
  try {
    const { doctorId, appointmentTime,appointmentDate, patientName } = req.body;

    // Validate required fields
    if (!doctorId || !appointmentTime || !appointmentDate || !patientName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the selected doctor
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Extract hospital details from query parameters or request body
    const hospitalName = req.query.name || req.body.hospitalName;
    const hospitalAddress = req.query.address || req.body.hospitalAddress;

    if (!hospitalName || !hospitalAddress) {
      return res.status(400).json({ message: 'Hospital details are required' });
    }

    // Create a new appointment
    const appointment = new Appointment({
      hospitalName,
      hospitalAddress,
      patientEmail: req.user.email,
      patientName,
      doctor: doctorId,
      appointmentTime,
      appointmentDate,
      doctorName: doctor.name,
      doctorSpecialization: doctor.specialization,
      createdAt: new Date(),
    });

    // Save the appointment to the database
    await appointment.save();
    req.flash('success_msg', 'Appointment confirmed');
    res.redirect('/');

   ;
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Error booking appointment' });
  }
};


exports.getAppointmentHistory = async (req, res) => {
  try {
    // Fetch all appointments for the logged-in user (you can adjust this based on user authentication)
    const appointments = await Appointment.find({ patientEmail: req.user.email }).populate('doctor');

    // Get the current date
    const today = new Date();

    // Separate appointments into upcoming, past, and cancelled
    const upcoming = appointments.filter(a => new Date(a.appointmentDate) >= today && a.status !== 'cancelled');
    const past = appointments.filter(a => new Date(a.appointmentDate) < today && a.status !== 'cancelled');
    const cancelled = appointments.filter(a => a.status === 'cancelled');

    // Render the history page and pass the filtered appointments
    res.render('appointments/history', {
      appointments: { upcoming, past, cancelled },
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).send('Error fetching appointments');
  }
};
 
 // import the Appointment model

// Route to handle appointment cancellation
exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body; // Get the appointment ID from the request body

    // Find the appointment and update its status to "cancelled"
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status: 'cancelled' }, { new: true });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Send a response indicating the appointment was successfully cancelled
    res.status(200).json({ message: 'Appointment cancelled successfully', appointment });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ message: 'Error cancelling appointment' });
  }
};


// Display appointment history
// exports.getHistory = async (req, res) => {
//   try {
//     const appointments = await Appointment.find({ user: req.user ? req.user._id : null })
//       .sort({ date: -1 });

//     res.render('appointments/history', {
//       title: 'Appointment History',
//       appointments
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).render('error', {
//       title: 'Server Error',
//       message: 'An error occurred while loading your appointment history'
//     });
//   }
// };


// Cancel appointment
// exports.cancelAppointment = async (req, res) => {
//   try {
//     const appointment = await Appointment.findById(req.params.id);
    
//     if (!appointment) {
//       req.flash('error_msg', 'Appointment not found');
//       return res.redirect('/appointments/history');
//     }
    
//     // Check if the appointment belongs to the user
//     if (appointment.user.toString() !== req.user._id.toString()) {
//       req.flash('error_msg', 'Not authorized');
//       return res.redirect('/appointments/history');
//     }
    
//     // Check if the appointment can be cancelled (not in the past)
//     const appointmentDate = new Date(appointment.date);
//     if (appointmentDate < new Date()) {
//       req.flash('error_msg', 'Cannot cancel past appointments');
//       return res.redirect('/appointments/history');
//     }
    
//     appointment.status = 'cancelled';
//     await appointment.save();
    
//     req.flash('success_msg', 'Appointment cancelled successfully');
//     res.redirect('/appointments/history');
//   } catch (err) {
//     console.error(err);
//     req.flash('error_msg', 'An error occurred while cancelling your appointment');
//     res.redirect('/appointments/history');
//   }
// };