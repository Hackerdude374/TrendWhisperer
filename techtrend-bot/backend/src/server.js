// backend/src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const { connectRedis } = require('./config/redis');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const trendsRoutes = require('./routes/trends');
const userRoutes = require('./routes/user');
const { startCronJobs } = require('./cron/updateTrends');

const app = express();

connectDB();
connectRedis();

app.use(cors({
    origin: 'http://localhost:5173', // Update this to match your frontend URL
    credentials: true
  }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/trends', trendsRoutes);
app.use('/api/user', userRoutes);

startCronJobs();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));