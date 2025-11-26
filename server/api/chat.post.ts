import { MATH_TEACHER_PROMPT } from "../constants/prompts";
import { getGeminiModel } from "../utils/ai";

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

interface RequestBody {
  message: string;
  history?: ChatMessage[];
}

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed",
    });
  }

  try {
    const body = await readBody(event);
    const { message, history = [] } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: "Message cannot be empty",
      });
    }

    if (message.length > 2000) {
      throw createError({
        statusCode: 400,
        statusMessage: "Message too long. Maximum 2000 characters.",
      });
    }

    if (history && (!Array.isArray(history) || history.length > 50)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid chat history",
      });
    }

    // Initialize model using the utility
    const model = getGeminiModel(MATH_TEACHER_PROMPT);

    const chat = model.startChat({
      history: history as ChatMessage[],
    });

    const result = await Promise.race([
      chat.sendMessage(message.trim()),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 30000)
      ),
    ]);

    const response = await (result as any).response;
    const text = response.text();

    if (!text || text.trim() === "") {
      throw new Error("Empty response from AI");
    }

    return {
      success: true,
      message: text,
      newHistory: [
        ...history.slice(-18),
        { role: "user" as const, parts: [{ text: message.trim() }] },
        { role: "model" as const, parts: [{ text: text }] },
      ],
    };
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);

    if (
      error.message?.includes("API_KEY") ||
      (error.statusCode === 500 &&
        error.statusMessage === "GEMINI_API_KEY is not set")
    ) {
      throw createError({
        statusCode: 500,
        statusMessage: "API authorization error",
      });
    }

    if (error.message?.includes("quota") || error.message?.includes("limit")) {
      throw createError({
        statusCode: 429,
        statusMessage: "Rate limit exceeded",
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
