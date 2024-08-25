// backend/src/routes/user.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const User = require('../models/User');

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  const { username, email } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's favorite chats
router.get('/favorite-chats', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favoriteChats');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.favoriteChats);
  } catch (error) {
    console.error('Error fetching favorite chats:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;