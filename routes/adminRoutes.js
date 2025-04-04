// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // Ensure the path is correct
const { ensureAuthenticated } = require('../middleware/auth'); // Ensure these exist
const { ensureAdmin } = require('../middleware/admin');
// Dashboard Route
router.get('/', ensureAuthenticated, ensureAdmin, adminController.getDashboard);

// Doctor Management Routes
router.get('/doctors', ensureAuthenticated, ensureAdmin, adminController.getDoctors);
router.post('/doctors', ensureAuthenticated, ensureAdmin, adminController.createDoctor);
router.get('/doctors/:id/edit', ensureAuthenticated, ensureAdmin, adminController.editDoctor);
router.put('/doctors/:id', ensureAuthenticated, ensureAdmin, adminController.updateDoctor);
router.delete('/doctors/:id', ensureAuthenticated, ensureAdmin, adminController.deleteDoctor);

// Hospital Management Routes
router.get('/hospitals', ensureAuthenticated, ensureAdmin, adminController.getHospitals);
router.post('/hospitals', ensureAuthenticated, ensureAdmin, adminController.createHospital);
router.get('/hospitals/:id/edit', ensureAuthenticated, ensureAdmin, adminController.editHospital);
router.put('/hospitals/:id', ensureAuthenticated, ensureAdmin, adminController.updateHospital);
router.delete('/hospitals/:id', ensureAuthenticated, ensureAdmin, adminController.deleteHospital);

module.exports = router;
