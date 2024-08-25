const cron = require('node-cron');
const { ingestRSSFeed, ingestGitHubTrending } = require('../services/trendIngestionService');

const startCronJobs = () => {
  cron.schedule('0 */6 * * *', async () => {
    console.log('Updating tech trends...');
    await ingestRSSFeed('https://feeds.feedburner.com/TechCrunch/', 'General');
    await ingestRSSFeed('https://www.wired.com/feed/rss', 'General');
    await ingestRSSFeed('https://www.theverge.com/rss/index.xml', 'General');
    await ingestGitHubTrending();
    console.log('Tech trends updated.');
  });
};
module.exports = { startCronJobs };