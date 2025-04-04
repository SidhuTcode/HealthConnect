const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { ensureAuthenticated } = require('../middleware/auth');

// Get feedback form
router.get('/new', ensureAuthenticated, feedbackController.getFeedbackForm);

// Submit feedback
router.post('/new', ensureAuthenticated, feedbackController.postFeedback);

module.exports = router;
