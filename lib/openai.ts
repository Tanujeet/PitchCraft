import OpenAI from "openai";

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure .env.local me set hai
});

export default openAi;
