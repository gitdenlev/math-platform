import { GoogleGenerativeAI } from "@google/generative-ai";

// Тип для повідомлення
interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

// Тип для тіла запиту
interface RequestBody {
  message: string;
  history?: ChatMessage[];
}

export default defineEventHandler(async (event) => {
  // Перевіряємо метод запиту
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Метод не дозволений. Використовуйте POST.",
    });
  }

  const config = useRuntimeConfig();
  const apiKey = config.geminiApiKey;

  if (!apiKey) {
    console.error("GEMINI_API_KEY не знайдено в конфігурації");
    throw createError({
      statusCode: 500,
      statusMessage: "GEMINI_API_KEY не встановлено в змінних оточення.",
    });
  }

  try {
    const body: RequestBody = await readBody(event);
    const { message, history = [] } = body;

    // Валідація вхідних даних
    if (!message || typeof message !== "string" || !message.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: "Повідомлення не може бути порожнім.",
      });
    }

    // Обмеження довжини повідомлення
    if (message.length > 4000) {
      throw createError({
        statusCode: 400,
        statusMessage: "Повідомлення занадто довге. Максимум 4000 символів.",
      });
    }

    // Валідація історії
    if (history && (!Array.isArray(history) || history.length > 50)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Некоректна історія чату або занадто довга.",
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Розширені системні інструкції
    const systemInstruction = `
Ти - Humy, спеціалізований AI-асистент з математики та програмування. 

ПЕРСОНАЛЬНІСТЬ:
- Ім'я: Humy (завжди представляйся цим ім'ям)
- Характер: дружелюбний, терпеливий, ентузіастичний щодо навчання
- Фірмовий знак: використовуй емодзі 🤖 коли представляєшся

ОБЛАСТІ ЕКСПЕРТИЗИ:
📊 МАТЕМАТИКА:
- Алгебра та геометрія
- Математичний аналіз
- Статистика та ймовірність
- Дискретна математика
- Лінійна алгебра
- Числові методи

💻 ПРОГРАМУВАННЯ:
- Усі мови програмування (Python, JavaScript, Java, C++, тощо)
- Алгоритми та структури даних
- Веб-розробка (Frontend/Backend)
- Бази даних
- Машинне навчання
- Мобільна розробка

ПОВЕДІНКА ПРИ НЕПОДХОДЯЩИХ ПИТАННЯХ:
Якщо користувач питає про щось, що не стосується математики чи програмування, відповідай ТОЧНО так:

"🤖 Привіт! Я Humy, і моя суперсила - це математика та програмування! 📊💻 

Я не можу допомогти з іншими темами, але зате можу:
• Розв'язати математичні задачі будь-якої складності
• Написати код на будь-якій мові програмування  
• Пояснити алгоритми та структури даних
• Допомогти з веб-розробкою
• Розказати про машинне навчання

Що з цього вас цікавить? Давайте програмувати чи рахувати! 🚀"

СТИЛЬ ВІДПОВІДЕЙ:
1. Завжди починай з короткого привітання як Humy
2. Використовуй емодзі для візуального розділення
3. Давай структуровані відповіді з прикладами
4. Пропонуй додаткові питання або теми
5. Для коду використовуй markdown форматування
6. Для математики використовуй чіткі пояснення кроків

ПРИКЛАДИ ХОРОШИХ ВІДПОВІДЕЙ:
- "Привіт! Humy тут 🤖 Давайте розберемо цю задачу з алгебри..."
- "Це відмінне питання про JavaScript! 💻 Ось як це працює..."
- "Як математик, я радий пояснити цю концепцію! 📊"
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction,
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1000,
      },
    });

    // Створюємо чат з історією
    const chat = model.startChat({
      history: history as ChatMessage[],
    });

    // Відправляємо повідомлення з timeout
    const result = (await Promise.race([
      chat.sendMessage(message.trim()),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 30000)
      ),
    ])) as any;

    const response = await result.response;
    const text = response.text();

    // Перевіряємо, чи отримали відповідь
    if (!text || text.trim() === "") {
      throw new Error("Порожня відповідь від AI");
    }

    return {
      success: true,
      response: text,
      // Обмежуємо розмір історії (останні 20 повідомлень)
      newHistory: [
        ...history.slice(-18), // Залишаємо останні 18 + 2 нові = 20
        { role: "user" as const, parts: [{ text: message.trim() }] },
        { role: "model" as const, parts: [{ text: text }] },
      ],
    };
  } catch (error) {
    console.error("Помилка при зверненні до Gemini API:", error);

    // Детальніше логування для діагностики
    if (error instanceof Error) {
      console.error("Деталі помилки:", {
        name: error.name,
        message: error.message,
        stack: error.stack?.slice(0, 500),
      });
    }

    // Повертаємо різні помилки залежно від типу
    if (error instanceof Error) {
      if (error.message.includes("API_KEY")) {
        throw createError({
          statusCode: 500,
          statusMessage: "Помилка авторизації API.",
        });
      }

      if (error.message.includes("quota") || error.message.includes("limit")) {
        throw createError({
          statusCode: 429,
          statusMessage: "Перевищено ліміт запитів. Спробуйте пізніше.",
        });
      }

      if (error.message === "Timeout") {
        throw createError({
          statusCode: 408,
          statusMessage:
            "Час очікування відповіді вичерпано. Спробуйте ще раз.",
        });
      }
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Помилка при обробці запиту до AI. Спробуйте пізніше.",
    });
  }
});
