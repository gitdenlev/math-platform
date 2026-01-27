import { generateAIResponse } from "~/server/utils/ai";

const SUGGESTION_PROMPT = `
You are a math autocomplete assistant for MathJS library.
Your goal is to provide 3-5 short, relevant completions for mathematical expressions.

CRITICAL RULES:
1. Return ONLY a valid JSON array of strings
2. NO markdown, NO code blocks, NO explanations
3. Do NOT solve the expression - only suggest completions
4. Each suggestion must be a valid MathJS expression
5. Keep suggestions short and practical

EXACT OUTPUT FORMAT (no deviations):
["suggestion1", "suggestion2", "suggestion3"]

Examples:
- Input: "cos" → ["cos(0)", "cos(pi)", "cos(45 deg)"]
- Input: "sqrt" → ["sqrt(16)", "sqrt(x)", "sqrt(2)"]
- Input: "2+2" → ["2+2*3", "(2+2)^2", "2+2+2"]
`;

// Функція для виправлення типових помилок JSON
function fixJsonString(str: string): string {
  let fixed = str.trim();

  // Видаляємо markdown code blocks
  fixed = fixed.replace(/```json\s*/gi, "").replace(/```\s*/g, "");

  // Шукаємо JSON масив
  const arrayMatch = fixed.match(/\[[\s\S]*\]/);
  if (arrayMatch) {
    fixed = arrayMatch[0];
  }

  // Виправляємо типові помилки
  // Відсутні лапки перед ]
  fixed = fixed.replace(/([^"\s])\]/g, '$1"]');
  fixed = fixed.replace(/,\s*\]/g, "]");

  // Виправляємо подвійні лапки
  fixed = fixed.replace(/""/g, '"');

  return fixed;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { input } = body;

  if (!input || typeof input !== "string" || input.trim().length < 2) {
    return { suggestions: [] };
  }

  try {
    const text = await generateAIResponse(
      `Complete this math expression: "${input}"`,
      SUGGESTION_PROMPT,
    );

    // Спробуємо виправити та спарсити JSON
    const fixedText = fixJsonString(text);

    let suggestions: string[] = [];

    try {
      const parsed = JSON.parse(fixedText);
      if (Array.isArray(parsed)) {
        suggestions = parsed.filter(
          (s): s is string => typeof s === "string" && s.trim().length > 0,
        );
      }
    } catch (parseError) {
      console.error("Failed to parse AI suggestions:", text);
      console.error("Fixed attempt:", fixedText);

      // Fallback: витягуємо рядки в лапках
      const matches = text.match(/"([^"]+)"/g);
      if (matches) {
        suggestions = matches
          .map((m) => m.replace(/"/g, ""))
          .filter((s) => s.length > 0 && s.length < 50)
          .slice(0, 5);
      }
    }

    return { suggestions: suggestions.slice(0, 5) };
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return { suggestions: [] };
  }
});
