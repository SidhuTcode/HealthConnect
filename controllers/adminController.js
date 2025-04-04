// controllers/adminController.js
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Hospital = require('../models/Hospital');

exports.getDashboard = async (req, res) => {
  const doctorCount = await Doctor.countDocuments();
  const hospitalCount = await Hospital.countDocuments();
  const userCount = await User.countDocuments();

  res.render('admin/dashboard', { doctorCount, hospitalCount, userCount });
};
exports.getDoctors = async (req, res) => {
  const doctors = await Doctor.find({});
  res.render('admin/doctors', { title: 'Manage Doctors', doctors });
};

exports.createDoctor = async (req, res) => {
    try {
      const { name, specialization, schedule } = req.body;
  
      // Ensure schedule is parsed correctly
      const formattedSchedule = schedule.map((entry) => ({
        date: entry.date,
        timeSlots: entry.timeSlots.split(',').map((slot) => slot.trim()), // Convert comma-separated string to array
      }));
  
      const doctor = new Doctor({
        name,
        specialization,
        schedule: formattedSchedule,
      });
  
      await doctor.save();
      req.flash('success_msg', 'Doctor created successfully!');
      res.redirect('/admin/doctors');
    } catch (err) {
      console.error(err);
      res.status(400).send('Error creating doctor.');
    }
  };
  

exports.editDoctor = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  res.render('admin/editDoctor', { title: 'Edit Doctor', doctor });
};

// Update doctor function in the controller
exports.updateDoctor = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, specialization, schedule } = req.body;
  
      // Parse schedule to ensure correct format
      const parsedSchedule = schedule.map((entry) => ({
        date: entry.date,
        timeSlots: entry.timeSlots.split(',').map((slot) => slot.trim()), // Split and trim time slots
      }));
  
      await Doctor.findByIdAndUpdate(id, {
        name,
        specialization,
        schedule: parsedSchedule,
      });
  
      req.flash('success_msg', 'Doctor updated successfully!');
      res.redirect('/admin/doctors');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating doctor.');
    }
  };
  

exports.deleteDoctor = async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Doctor deleted successfully!');
  res.redirect('/admin/doctors');
};

exports.getHospitals = async (req, res) => {
  const hospitals = await Hospital.find({});
  res.render('admin/hospitals', { title: 'Manage Hospitals', hospitals });
};

exports.createHospital = async (req, res) => {
  try {
    const { name, address, phone, opdSchedule, bloodStocks, icuBeds } = req.body;

    // Create new hospital
    const hospital = new Hospital({
      name,
      address,
      phone,
      opdSchedule,
      bloodStocks,
      icuBeds: icuBeds === 'on' || icuBeds === true, // Handle checkbox value
    });

    await hospital.save();
    req.flash('success_msg', 'Hospital created successfully!');
    res.redirect('/admin/hospitals');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error creating hospital.');
  }
};


exports.editHospital = async (req, res) => {
  const hospital = await Hospital.findById(req.params.id);
  res.render('admin/editHospital', { title: 'Edit Hospital', hospital });
};

// Parse checkbox value in your create or update controller
exports.updateHospital = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, phone, opdSchedule, icuBeds, bloodStocks } = req.body;

        // Convert 'on' to true for icuBeds
        const icuBedsBoolean = icuBeds === 'on';

        await Hospital.findByIdAndUpdate(id, {
            name,
            address,
            phone,
            opdSchedule,
            icuBeds: icuBedsBoolean, // Save as boolean
            bloodStocks
        });
        req.flash('success_msg', 'Hospital updated successfully!');
         
        res.redirect('/admin/hospitals');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};


exports.deleteHospital = async (req, res) => {
  await Hospital.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Hospital deleted successfully!');
  res.redirect('/admin/hospitals');
};
