// backend/src/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log('Received registration data:', { username, email, password: '****' });
  
      // Check if user already exists
      console.log('Checking for existing user...');
      let user = await User.findOne({ $or: [{ email }, { username }] });
      if (user) {
        console.log('User already exists');
        return res.status(400).json({ error: 'User with this email or username already exists' });
      }
  
      console.log('Creating new user...');
      user = new User({ username, email, password });
      
      console.log('Saving user to database...');
      await user.save();
  
      console.log('User saved successfully');
  
      // Generate JWT token
      console.log('Generating JWT token...');
      const payload = { user: { id: user.id } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          console.error('Error generating token:', err);
          throw err;
        }
        console.log('Registration successful, sending response');
        res.json({ token });
      });
  
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  });

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;