// backend/src/models/Chat.js
const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [{
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }],
  title: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);

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