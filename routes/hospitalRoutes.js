// hospitalRoutes.js
const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');
const { ensureAuthenticated } = require('../middleware/auth');

// Get hospital map
router.get('/map', ensureAuthenticated, hospitalController.getMap);

// Get hospitals list
router.get('/', ensureAuthenticated, hospitalController.getHospitals);

router.get('/hospitalResources', hospitalController.listResources);

// Route to filter hospitals based on blood type and ICU beds
router.get("/filter", hospitalController.filterHospitals);

module.exports = router;