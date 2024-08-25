// backend/src/services/trendIngestionService.js
const axios = require('axios');
const Trend = require('../models/Trend');
const { analyzeRelevanceScore } = require('./trendAnalysisService');
const { getRedisClient } = require('../config/redis');

const ingestRSSFeed = async (feedUrl, category) => {
  const redisClient = getRedisClient();
  try {
    const cacheKey = `rssfeed:${feedUrl}`;
    let items;

    // Try to get the feed from cache
    const cachedFeed = await redisClient.get(cacheKey);
    if (cachedFeed) {
      items = JSON.parse(cachedFeed);
    } else {
      const response = await axios.get(feedUrl);
      items = response.data.items || [];
      // Cache the feed
      await redisClient.set(cacheKey, JSON.stringify(items), {
        EX: 3600 // Expire after 1 hour
      });
    }

    for (const item of items) {
      const relevanceScore = await analyzeRelevanceScore(item.title, item.description);
      const trend = new Trend({
        title: item.title,
        description: item.description,
        source: feedUrl,
        url: item.link,
        category: category,
        relevanceScore: relevanceScore
      });
      await trend.save();
    }
  } catch (error) {
    console.error(`Error ingesting RSS feed ${feedUrl}:`, error);
  }
};

const ingestGitHubTrending = async () => {
  const redisClient = getRedisClient();
  try {
    const cacheKey = 'github:trending';
    let items;

    // Try to get the trending repos from cache
    const cachedRepos = await redisClient.get(cacheKey);
    if (cachedRepos) {
      items = JSON.parse(cachedRepos);
    } else {
      const response = await axios.get('https://api.github.com/search/repositories?q=created:>2023-01-01&sort=stars&order=desc');
      items = response.data.items || [];
      // Cache the trending repos
      await redisClient.set(cacheKey, JSON.stringify(items), {
        EX: 3600 // Expire after 1 hour
      });
    }

    for (const item of items) {
      const relevanceScore = await analyzeRelevanceScore(item.name, item.description);
      const trend = new Trend({
        title: item.name,
        description: item.description,
        source: 'GitHub Trending',
        url: item.html_url,
        category: 'OpenSource',
        relevanceScore: relevanceScore
      });
      await trend.save();
    }
  } catch (error) {
    console.error('Error ingesting GitHub trending:', error);
  }
};

module.exports = { ingestRSSFeed, ingestGitHubTrending };