// controllers/authController.js
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

// Display login page
exports.getLogin = (req, res) => {
  res.render('auth/login', {
    title: 'Login'
  });
};

// Display register page
exports.getRegister = (req, res) => {
  res.render('auth/register', {
    title: 'Register'
  });
};

// Handle user registration
exports.postRegister = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.render('auth/register', {
      title: 'Register',
      errors,
      name,
      email
    });
  }

  try {
    // Check if email already exists
    const user = await User.findOne({ email });
    if (user) {
      errors.push({ msg: 'Email is already registered' });
      return res.render('auth/register', {
        title: 'Register',
        errors,
        name,
        email
      });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();

    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', {
      title: 'Server Error',
      message: 'An error occurred during registration'
    });
  }
};

// Handle user login
exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
};

// Handle user logout
exports.logout = (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
};

// Display dashboard
// exports.getDashboard = (req, res) => {
//   res.render('admin/dashboard', {
//     title: 'Dashboard',
//     name: req.user.name
//   });
// };

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.render('profile', { user });
  }catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
  