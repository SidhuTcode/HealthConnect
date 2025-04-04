const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['tips', 'articles', 'additional'], required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Resource', ResourceSchema);