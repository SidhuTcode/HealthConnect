const Feedback = require('../models/Feedback');

// Display feedback form
exports.getFeedbackForm = (req, res) => {
  res.render('feedback/form', {
    title: 'Leave Your Feedback',
  });
};

// Handle feedback submission
exports.postFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    // Validate input
    if (!rating) {
      req.flash('error_msg', 'Rating is required');
      return res.redirect('/feedback/new');
    }

    // Create new feedback
    const newFeedback = new Feedback({
      user: req.user._id,
      rating: parseInt(rating),
      comment: comment || undefined,
    });

    await newFeedback.save();

    req.flash('success_msg', 'Feedback submitted successfully');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred while submitting your feedback');
    res.redirect('/feedback/new');
  }
};
