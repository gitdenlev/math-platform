import { generateAIResponse } from "~/server/utils/ai";

const ANALYZE_SYSTEM_PROMPT = `Ти експерт з математики та MathJS. Аналізуй код та надавай корисну інформацію українською мовою, коротко та зрозуміло.`;

export default defineEventHandler(async (event) => {
  const { code } = await readBody(event);

  if (!code) {
    throw createError({
      statusCode: 400,
      message: "Код не надано",
    });
  }

  try {
    const prompt = `Проаналізуй наступний MathJS код та надай корисну інформацію про нього:

Код:
\`\`\`
${code}
\`\`\`

Твій аналіз повинен включати:
1. Пояснення того, що робить цей код
2. Очікуваний результат виконання
3. Можливі помилки або проблеми
4. Рекомендації щодо оптимізації (якщо є)

Відповідай українською мовою, коротко та зрозуміло.`;

    const text = await generateAIResponse(prompt, ANALYZE_SYSTEM_PROMPT);

    return {
      analysis: text,
    };
  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    throw createError({
      statusCode: 500,
      message: "Помилка при аналізі коду з AI",
    });
  }
});
