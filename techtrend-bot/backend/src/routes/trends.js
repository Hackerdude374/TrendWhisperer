const express = require('express');
const router = express.Router();
const Trend = require('../models/Trend');

router.get('/', async (req, res) => {
  try {
    const trends = await Trend.find().sort({ timestamp: -1 }).limit(20);
    res.json(trends);
  } catch (error) {
    console.error('Error fetching trends:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;