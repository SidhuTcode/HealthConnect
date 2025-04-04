const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth');

// Home page
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Hospital Management System'
  });
});

// Login page
router.get('/login', forwardAuthenticated, authController.getLogin);

// Register page
router.get('/register', forwardAuthenticated, authController.getRegister);

// Register handle
router.post('/register', authController.postRegister);

// Login handle
router.post('/login', authController.postLogin);

// Logout
router.get('/logout', authController.logout);

// Dashboard
//router.get('/dashboard', ensureAuthenticated, authController.getDashboard);

router.get('/profile', ensureAuthenticated, authController.getProfile );

router.get("/terms", (req, res) => {
  res.render("terms", { title: "Terms and Conditions" });
});

router.get("/privacy", (req, res) => {
  res.render("privacy", { title: "Privacy Policy" });
});
module.exports = router;