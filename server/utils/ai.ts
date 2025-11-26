import { GoogleGenerativeAI } from "@google/generative-ai";

export const getGeminiModel = (systemInstruction?: string) => {
  const config = useRuntimeConfig();
  const apiKey = config.geminiApiKey;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "GEMINI_API_KEY is not set",
    });
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: systemInstruction,
    generationConfig: {
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 1000,
    },
  });
};
