// backend/src/services/trendAnalysisService.js
const natural = require('natural');
const Trend = require('../models/Trend');
const { getRedisClient } = require('../config/redis');

const tfidf = new natural.TfIdf();

const analyzeRelevanceScore = async (title, description) => {
  const redisClient = getRedisClient();
  const cacheKey = `relevance:${title}`;

  // Try to get the relevance score from cache
  const cachedScore = await redisClient.get(cacheKey);
  if (cachedScore) {
    return parseFloat(cachedScore);
  }

  const allTrends = await Trend.find({}, 'title description');
  
  allTrends.forEach(trend => {
    tfidf.addDocument(`${trend.title} ${trend.description}`);
  });

  const newDocument = `${title} ${description}`;
  tfidf.addDocument(newDocument);

  const scores = tfidf.tfidf(newDocument, tfidf.documents.length - 1);
  const relevanceScore = Math.min(...scores) * 100; // Normalize to 0-100 scale

  // Cache the relevance score
  await redisClient.set(cacheKey, relevanceScore.toString(), {
    EX: 3600 // Expire after 1 hour
  });

  return relevanceScore;
};

module.exports = { analyzeRelevanceScore };