// backend/src/models/Trend.js
const mongoose = require('mongoose');

const TrendSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  source: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String, required: true },
  relevanceScore: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trend', TrendSchema);