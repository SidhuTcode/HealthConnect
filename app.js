// app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const doctorRoutes = require('./controllers/doctorController');

// Initialize app
const app = express();

// Connect to MongoDB
require('./config/database');
// Passport config
require('./config/auth')(passport);

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(flash());

// Global variables for flash messages and user
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/hospitals', require('./routes/hospitalRoutes'));
app.use('/appointments', require('./routes/appointmentRoutes'));
app.use('/feedback', require('./routes/feedbackRoutes'));
app.use('/admin', require('./routes/adminRoutes'));
app.use('/resources', require('./routes/resourceRoutes'));
app.use(doctorRoutes);


// Error handling
app.use((req, res) => {
  res.status(404).render('error', {
    title: '404 Not Found',
    message: 'The page you requested was not found.'
  });
});

// Start server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Server running on port ${PORT} http://localhost:${PORT}`));