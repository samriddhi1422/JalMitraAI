// service/aiService.js

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const askAI = async (message, report) => {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile", 
    messages: [
      {
        role: "system",
        content: `
You are a rainwater harvesting expert.

Rules:
- Explain in simple language
- Give practical advice
- Use numbers from report
- Keep answers short and helpful
        `,
      },
      {
        role: "user",
        content: `
User question: ${message}

Report data:
${JSON.stringify(report)}
        `,
      },
    ],
  });

  return response.choices[0].message.content;
};