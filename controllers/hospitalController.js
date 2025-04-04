// controllers/hospitalController.js

const Hospital = require('../models/Hospital');

// Display hospitals map
exports.getMap = async (req, res) => {
  try {
    const hospitals = await Hospital.find({}, 'name location');
    
    res.render('hospitals/map', {
      title: 'Hospital Map',
      hospitals: JSON.stringify(hospitals),
      apiKey: process.env.GOOGLE_MAPS_API_KEY
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', {
      title: 'Server Error',
      message: 'An error occurred while loading the map'
    });
  }
};

// Display hospital list
exports.getHospitals = async (req, res) => {
  try {
    // Get filter parameters
    const { bloodType, bedType } = req.query;
    let query = {};
    
    // Apply filters if provided
    if (bloodType) {
      query['bloodStock.bloodType'] = bloodType;
      query['bloodStock.units'] = { $gt: 0 };
    }
    
    if (bedType === 'icu') {
      query['beds.icu.available'] = { $gt: 0 };
    } else if (bedType === 'regular') {
      query['beds.available'] = { $gt: 0 };
    }
    
    const hospitals = await Hospital.find(query);
    
    res.render('hospitals/list', {
      title: 'Hospitals',
      hospitals,
      bloodType,
      bedType
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', {
      title: 'Server Error',
      message: 'An error occurred while loading hospitals'
    });
  }
};

exports.listResources = async (req, res) => {
    try {
        const { bloodType, icuBeds } = req.query;

        // Build query object based on filters
        const query = {};
        if (bloodType) {
            query['bloodStocks.type'] = bloodType;
        }
        if (icuBeds) {
            query.icuBeds = icuBeds === 'Available';
        }

        // Fetch hospitals from the database
        const hospitals = await Hospital.find(query);

        res.render('hospitals/hospitalResources', { hospitals });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Error fetching hospital resources.' });
    }
};

// Get all hospitals
exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find({});
    res.render("hospitals/hospitalResources", { hospitals });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Filter hospitals based on blood type and ICU beds
exports.filterHospitals = async (req, res) => {
  try {
    const { bloodType, icuBeds } = req.query;

    // Build the query dynamically based on the filters
    const query = {};
    if (bloodType) {
      query["bloodStocks.type"] = bloodType;
    }
    if (icuBeds) {
      query.icuBeds = icuBeds === "true"; // Convert icuBeds to a boolean
    }

    const hospitals = await Hospital.find(query);
    res.render("hospitals/hospitalResources", { hospitals });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};