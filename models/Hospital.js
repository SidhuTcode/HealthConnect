// models/Hospital.js
const mongoose = require('mongoose');

const bloodStockSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., A+, O-, etc.
    units: { type: Number, required: true } // Number of units available
});

const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    opdSchedule: { type: String, required: true }, // e.g., "Mon-Fri, 9AM-5PM"
    bloodStocks: [bloodStockSchema],
    icuBeds: { type: Boolean, required: true } // Whether ICU beds are available
});

module.exports = mongoose.model('Hospital', hospitalSchema);
