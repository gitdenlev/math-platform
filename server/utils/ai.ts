import { OpenRouter } from "@openrouter/sdk";

// Інтерфейс для повідомлень
export type AIMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

// Створення клієнта OpenRouter
const getOpenRouterClient = () => {
  const config = useRuntimeConfig();
  const apiKey = config.openrouterApiKey;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "OPENROUTER_API_KEY not configured",
    });
  }

  return new OpenRouter({ apiKey });
};

// Основна функція для генерації відповіді
export const generateAIResponse = async (
  prompt: string,
  systemInstruction?: string,
): Promise<string> => {
  const openrouter = getOpenRouterClient();

  try {
    // Формуємо масив повідомлень
    const messages: Array<{ role: "system" | "user"; content: string }> = [];

    if (systemInstruction) {
      messages.push({
        role: "system",
        content: systemInstruction,
      });
    }

    messages.push({
      role: "user",
      content: prompt,
    });

    const response = await openrouter.chat.send({
      model: "mistralai/devstral-2512:free",
      messages,
      temperature: 0.7,
      maxTokens: 500,
    });

    const text = response.choices[0]?.message?.content;

    if (!text || typeof text !== "string" || text.trim() === "") {
      throw new Error("Empty response from OpenRouter");
    }

    return text;
  } catch (error) {
    console.error("OpenRouter error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: `AI generation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    });
  }
};

// Функція для стрімінгу відповіді
export const streamAIResponse = async function* (
  prompt: string,
  systemInstruction?: string,
): AsyncGenerator<string> {
  const openrouter = getOpenRouterClient();

  try {
    // Формуємо масив повідомлень
    const messages: Array<{ role: "system" | "user"; content: string }> = [];

    if (systemInstruction) {
      messages.push({
        role: "system",
        content: systemInstruction,
      });
    }

    messages.push({
      role: "user",
      content: prompt,
    });

    const stream = await openrouter.chat.send({
      model: "mistralai/devstral-2512:free",
      messages,
      temperature: 0.7,
      maxTokens: 500,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        yield content;
      }
    }
  } catch (error) {
    console.error("OpenRouter streaming error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: `AI streaming failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    });
  }
};
