import { MATH_TEACHER_PROMPT } from "~/server/constants/prompts";
import { generateAIResponse } from "~/server/utils/ai";
import { z } from "zod";

// Строга валідація з Zod
const ChatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const RequestBodySchema = z.object({
  message: z.string().min(1).max(2000).trim(),
  history: z.array(ChatMessageSchema).max(50).optional().default([]),
});

type ChatMessage = z.infer<typeof ChatMessageSchema>;
type RequestBody = z.infer<typeof RequestBodySchema>;

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed",
    });
  }

  try {
    // Валідуємо з Zod (автоматично кине помилку якщо невалідно)
    const body = RequestBodySchema.parse(await readBody(event));
    const { message, history = [] } = body;

    // Формуємо контекст з історії чату
    const contextMessages = history
      .slice(-10) // Останні 10 повідомлень для контексту
      .map(
        (msg) =>
          `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`,
      )
      .join("\n");

    const fullPrompt = contextMessages
      ? `Previous conversation:\n${contextMessages}\n\nUser: ${message.trim()}\n\nRespond as the assistant:`
      : message.trim();

    const text = await generateAIResponse(fullPrompt, MATH_TEACHER_PROMPT);

    if (!text || text.trim() === "") {
      throw new Error("Empty response from AI");
    }

    return {
      success: true,
      message: text,
      newHistory: [
        ...history.slice(-18),
        { role: "user" as const, content: message.trim() },
        { role: "assistant" as const, content: text },
      ],
    };
  } catch (error: any) {
    console.error("Error in chat API:", error);

    // Обробка Zod validation errors
    if (error.name === "ZodError") {
      throw createError({
        statusCode: 400,
        statusMessage: `Validation error: ${error.errors.map((e: any) => e.message).join(", ")}`,
      });
    }

    if (error.message === "Timeout") {
      throw createError({
        statusCode: 408,
        statusMessage: "Request timeout",
      });
    }

    // Re-throw if it's already a H3Error
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: `AI Error: ${error.message || "Unknown error"}`,
    });
  }
});
