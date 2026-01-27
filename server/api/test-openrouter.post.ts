/**
 * Тестовий файл для перевірки роботи OpenRouter API
 *
 * Використання:
 * 1. Переконайтеся, що OPENROUTER_API_KEY встановлений у .env
 * 2. Запустіть dev сервер: npm run dev
 * 3. Викличте API endpoint: POST /api/test-openrouter
 */

import { generateAIResponse } from "~/server/utils/ai";

export default defineEventHandler(async (event) => {
  try {
    console.log("🧪 Testing OpenRouter API...");

    const testPrompt = "Поясни коротко, що таке математика?";
    const systemInstruction =
      "Ти корисний AI асистент для навчання математики. Відповідай коротко та зрозуміло українською мовою.";

    const response = await generateAIResponse(testPrompt, systemInstruction);

    console.log("✅ OpenRouter API response received!");
    console.log("Response:", response);

    return {
      success: true,
      message: "OpenRouter API працює коректно!",
      prompt: testPrompt,
      response,
      model: "mistralai/devstral-2512:free",
    };
  } catch (error) {
    console.error("❌ OpenRouter API error:", error);

    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : "Unknown error",
    });
  }
});
