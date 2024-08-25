// backend/src/config/redis.js
const redis = require('redis');

let redisClient;

const connectRedis = async () => {
  redisClient = redis.createClient({
    url: process.env.REDIS_URL
  });

  redisClient.on('error', (error) => console.error(`Redis Error : ${error}`));

  await redisClient.connect();
  console.log('Redis connected');
};

const getRedisClient = () => {
  if (!redisClient) {
    throw new Error('Redis client not initialized');
  }
  return redisClient;
};

module.exports = { connectRedis, getRedisClient };