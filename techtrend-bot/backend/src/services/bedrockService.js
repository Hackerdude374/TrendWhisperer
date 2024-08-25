// backend/src/services/bedrockService.js
const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");
const { getRedisClient } = require('../config/redis');

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const generateTrendResponse = async (message, recentTrends) => {
  const redisClient = getRedisClient();
  const cacheKey = `chat:${message}`;
  
  // Try to get the response from cache
  const cachedResponse = await redisClient.get(cacheKey);
  if (cachedResponse) {
    return JSON.parse(cachedResponse);
  }

  const prompt = `You are an AI assistant specialized in discussing the latest technology trends. 
                  Here are some recent tech trends: ${JSON.stringify(recentTrends)}
                  User's message: ${message}
                  Provide an informative response about current tech trends:`;

  const params = {
    modelId: "anthropic.claude-v2",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      prompt: prompt,
      max_tokens_to_sample: 300,
      temperature: 0.7,
      top_p: 1,
      top_k: 250,
      stop_sequences: ["\n\nHuman:"],
    }),
  };

  try {
    const command = new InvokeModelCommand(params);
    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    
    // Cache the response
    await redisClient.set(cacheKey, JSON.stringify(responseBody.completion), {
      EX: 3600 // Expire after 1 hour
    });
    
    return responseBody.completion;
  } catch (error) {
    console.error('Error calling Bedrock:', error);
    throw error;
  }
};

module.exports = { generateTrendResponse };