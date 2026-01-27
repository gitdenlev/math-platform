import { create, all } from "mathjs";

// Створюємо sandboxed екземпляр MathJS з обмеженими функціями
const math = create(all);

// КРИТИЧНО: Вимикаємо небезпечні функції для запобігання code injection
const restrictedFunctions = {
  import: function () {
    throw new Error("Function import is disabled for security reasons");
  },
  createUnit: function () {
    throw new Error("Function createUnit is disabled for security reasons");
  },
  // Evaluate і parse вже використовуються, але обмежуємо їх контекст
};

math.import(restrictedFunctions, { override: true });

// Функція для безпечної валідації виразу
function validateExpression(expression: string): void {
  // Обмежуємо довжину
  if (expression.length > 500) {
    throw new Error("Expression too long (max 500 characters)");
  }

  // Блокуємо підозрілі патерни
  const dangerousPatterns = [
    /import\s*\(/i,
    /require\s*\(/i,
    /eval\s*\(/i,
    /Function\s*\(/i,
    /__proto__/i,
    /constructor/i,
    /prototype/i,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(expression)) {
      throw new Error("Expression contains forbidden patterns");
    }
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { expression } = body;

  if (!expression) {
    throw createError({
      statusCode: 400,
      message: "Expression is required",
    });
  }

  try {
    // Валідуємо вираз перед виконанням
    validateExpression(expression);

    const result = math.evaluate(expression);

    const formattedResult = math.format(result, { precision: 14 });

    return { result: formattedResult };
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      message: error.message || "Invalid mathematical expression",
    });
  }
});
