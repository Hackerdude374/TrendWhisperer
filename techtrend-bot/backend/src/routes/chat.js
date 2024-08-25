// backend/src/routes/chat.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const { generateTrendResponse } = require('../services/bedrockService');
const Chat = require('../models/Chat');
const Trend = require('../models/Trend');
const User = require('../models/User');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    const recentTrends = await Trend.find().sort({ timestamp: -1 }).limit(10);
    const aiResponse = await generateTrendResponse(message, recentTrends);

    let chat = await Chat.findOne({ user: userId }).sort({ createdAt: -1 });
    if (!chat) {
      chat = new Chat({ user: userId, messages: [] });
    }

    chat.messages.push({ role: 'user', content: message });
    chat.messages.push({ role: 'assistant', content: aiResponse });
    await chat.save();

    res.json({ message: aiResponse, chatId: chat._id });
  } catch (error) {
    console.error('Error in chat route:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/favorite', authMiddleware, async (req, res) => {
  try {
    const { chatId } = req.body;
    const userId = req.user.id;

    await User.findByIdAndUpdate(userId, { $addToSet: { favoriteChats: chatId } });
    res.json({ message: 'Chat added to favorites' });
  } catch (error) {
    console.error('Error adding chat to favorites:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/favorites', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('favoriteChats');
    res.json(user.favoriteChats);
  } catch (error) {
    console.error('Error fetching favorite chats:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;