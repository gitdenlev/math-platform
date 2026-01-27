import { generateAIResponse } from "~/server/utils/ai";
import { HINT_GENERATOR_PROMPT } from "~/server/constants/prompts";
import { z } from "zod";

const RequestSchema = z.object({
  expression: z.string().min(1).max(500),
});

export default defineEventHandler(async (event) => {
  try {
    const body = RequestSchema.parse(await readBody(event));
    const { expression } = body;

    // Генеруємо hints через AI
    const prompt = `Вираз: "${expression}"\n\nСтвори підказки:`;
    const response = await generateAIResponse(prompt, HINT_GENERATOR_PROMPT);

    // Парсимо JSON відповідь
    const cleanResponse = response.match(/\[[\s\S]*\]/)?.[0] || "[]";

    let hints: string[] = [];
    try {
      const parsed = JSON.parse(cleanResponse);
      if (Array.isArray(parsed)) {
        hints = parsed
          .filter((h): h is string => typeof h === "string")
          .slice(0, 3); // Максимум 3 підказки
      }
    } catch (e) {
      console.error("Failed to parse hints JSON:", response);
      // Fallback: витягуємо питання з лапками
      const matches = response.match(/"([^"?]+\??)"/g);
      if (matches) {
        hints = matches
          .map((m) => m.replace(/"/g, ""))
          .filter((h) => h.includes("?") || h.length < 50)
          .slice(0, 3);
      }
    }

    return {
      hints,
    };
  } catch (error: any) {
    console.error("Hint generation error:", error);

    // Zod validation error
    if (error.name === "ZodError") {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request",
      });
    }

    return {
      hints: [], // Повертаємо порожній масив замість помилки
    };
  }
});
