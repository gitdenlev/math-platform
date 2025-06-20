import { GoogleGenerativeAI } from "@google/generative-ai";

// Тип для повідомлення
interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = config.geminiApiKey;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "GEMINI_API_KEY не встановлено в змінних оточення.",
    });
  }

  try {
    const { message, history = [] } = await readBody(event);

    if (!message || !message.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: "Повідомлення не може бути порожнім.",
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
        temperature: 0.7, // Трохи креативності, але не надто
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1000,
      },
    });

    // Створюємо чат з історією
    const chat = model.startChat({
      history: history as ChatMessage[],
    });

    // Відправляємо повідомлення
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return {
      response: text,
      // Можна повернути оновлену історію для збереження контексту
      newHistory: [
        ...history,
        { role: "user", parts: [{ text: message }] },
        { role: "model", parts: [{ text: text }] },
      ],
    };
  } catch (error) {
    console.error("Помилка при зверненні до Gemini API:", error);

    throw createError({
      statusCode: 500,
      statusMessage: `Помилка при обробці запиту до AI: ${
        error instanceof Error ? error.message : "Невідома помилка"
      }`,
    });
  }
});
