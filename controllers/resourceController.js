const Resource = require('../models/Resource');

// Display Health Resources main page
exports.getResources = async (req, res) => {
  res.render('resources/resource', {
    title: 'Health Resources'
  });
};

// Display Health Tips page
exports.getTips = async (req, res) => {
  res.render('resources/tips', {
    title: 'Health Tips'
  });
};

// Display Health Articles page
exports.getArticles = async (req, res) => {
  res.render('resources/articles', {
    title: 'Health Articles'
  });
};

// Display Additional Resources page
exports.getAdd = (req, res) => {
  res.render('resources/add', {
    title: 'Additional Health Resources'
  });
};
