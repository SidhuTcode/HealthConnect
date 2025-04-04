module.exports = {
    // Ensure user is an admin
    ensureAdmin: function(req, res, next) {
      if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
      }
      req.flash('error_msg', 'Access denied. Admin privileges required.');
      res.redirect('/');
    }
  };