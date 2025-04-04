const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

// Main Resources Page (Health Resources)
router.get('/', resourceController.getResources); // Updated the route to the root of '/resources'

// Health Tips Page
router.get('/tips', resourceController.getTips);

// Health Articles Page
router.get('/articles', resourceController.getArticles);

// Additional Resources Page
router.get('/additional', resourceController.getAdd);

module.exports = router;
