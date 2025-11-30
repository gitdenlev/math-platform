import { getGeminiModel } from "~/server/utils/ai";

const SUGGESTION_PROMPT = `
You are a math autocomplete assistant.
Your goal is to provide short, relevant completions for mathematical expressions.
The user is typing a math expression. You should provide 3-5 likely completions or related expressions.
Return ONLY a JSON array of strings. No markdown, no explanations.
IMPORTANT: Do NOT solve the expression. Do NOT provide the numerical result.
Examples:
Input: "cos" -> ["cos(30 deg)", "cos(pi/2)", "cos(x)^2"]
Input: "int" -> ["integrate(x^2, x)", "integral(sin(x))", "integrate(1/x)"]
Input: "sq" -> ["sqrt(x)", "square(x)", "sqrt(16)"]
Input: "2+2" -> ["2+2*2", "2+2/2", "(2+2)^2"]
`;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { input } = body;

  if (!input || typeof input !== "string" || input.trim().length < 2) {
    return { suggestions: [] };
  }

  try {
    const model = getGeminiModel(SUGGESTION_PROMPT);
    const result = await model.generateContent(input);
    const response = await result.response;
    const text = response.text();

    // Clean up the response to ensure it's valid JSON
    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let suggestions: string[] = [];
    try {
      suggestions = JSON.parse(cleanedText);
    } catch (e) {
      console.error("Failed to parse AI suggestions:", text);
      // Fallback: try to split by newlines if JSON parsing fails
      suggestions = text
        .split("\n")
        .filter((s) => s.trim().length > 0)
        .slice(0, 3);
    }

    return { suggestions };
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return { suggestions: [] };
  }
});
