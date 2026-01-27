import { generateAIResponse } from "~/server/utils/ai";
import { HINT_ANSWER_PROMPT } from "~/server/constants/prompts";
import { z } from "zod";

const RequestSchema = z.object({
  question: z.string().min(3).max(200),
});

export default defineEventHandler(async (event) => {
  try {
    const body = RequestSchema.parse(await readBody(event));
    const { question } = body;

    // Генеруємо коротку відповідь
    const answer = await generateAIResponse(
      `Питання: "${question}"\n\nДай коротку відповідь:`,
      HINT_ANSWER_PROMPT,
    );

    return {
      answer: answer.trim(),
    };
  } catch (error: any) {
    console.error("Hint answer error:", error);

    if (error.name === "ZodError") {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid question",
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to generate answer",
    });
  }
});
