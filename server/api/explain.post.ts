import { generateAIResponse } from "~/server/utils/ai";

// 1. Prompt to aggregate raw data into the required JSON format
const AGGREGATOR_SYSTEM_PROMPT = `
You are a Mathematical Data Aggregator.
Your task is to analyze a list of raw user expressions and convert them into a structured JSON summary.

Output strict JSON only. No markdown formatting.
Schema:
{
  "total_equations": number,
  "topics": {
    "algebra": number,
    "trigonometry": number,
    "fractions": number,
    "other": number
  },
  "mistakes": [
    {
      "type": "string (e.g. 'syntax_error', 'unit_mismatch', 'redundant_calculation')",
      "count": number
    }
  ],
  "examples": [
    {
      "user_step": "string (the raw expression that was problematic)",
      "correct_step": "string (a better or corrected way)"
    }
  ],
  "difficulty_rating_avg": number (1-10),
  "sessions": number (default to 1)
}

Notes:
- If a result is "Invalid" or "Error", count it as a mistake (syntax_error).
- Classify topics based on keywords (sin/cos -> trigonometry, x/y/= -> algebra, / -> fractions).
- Estimate difficulty based on complexity.
`;

// 2. The Analyst Prompt provided by the User
const ANALYST_SYSTEM_PROMPT = `
You are an AI math analyst. Your job is to analyze a user's mathematical activity based on aggregated data, detect mistakes, identify patterns, and generate helpful personalized recommendations.

INPUT FORMAT
You will receive a JSON object with aggregated data (total_equations, topics, mistakes, examples, difficulty_rating_avg, sessions).

OUTPUT FORMAT
You must output STRICT JSON. Do not use Markdown styling in the JSON values.
Schema:
{
  "progress_summary": {
    "title": "string (e.g. 'Initial Momentum' or 'Steady Progress')",
    "text": "string (3-5 sentences summary of progress)",
    "score": number (0-100, representing overall progress strength)
  },
  "stats": {
    "total_equations": number,
    "sessions": number,
    "average_difficulty": number (0-5, e.g 2.5),
    "topics_distribution": [
       { "name": "Algebra", "value": number, "color": "#10B981" },
       { "name": "Trigonometry", "value": number, "color": "#3B82F6" },
       { "name": "Fractions", "value": number, "color": "#F59E0B" },
       { "name": "Other", "value": number, "color": "#6366F1" }
    ]
  },
  "error_patterns": {
    "has_errors": boolean,
    "title": "string (e.g. 'No specific patterns detected' or 'Watch your signs')",
    "description": "string (detailed explanation of the pattern or lack thereof)"
  },
  "recommendations": [
    {
      "title": "string (Short action title)",
      "description": "string (Detailed actionable advice)"
    }
  ]
}

YOUR GOALS
1. Progress Summary: Motivate the user.
2. Stats: Ensure topics distribution matches the input data.
3. Error Patterns: If no mistakes, say "No specific error patterns have been detected yet...". If mistakes, be specific.
4. Recommendations: Give 3 specific actionable items.
`;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { title, description, expressions } = body;

  if (!expressions || !Array.isArray(expressions) || expressions.length === 0) {
    // Return a default "empty" state structure to avoid client breaking
    return {
      success: false,
      data: {
        progress_summary: {
          title: "No Data",
          text: "Add more expressions to get an analysis.",
          score: 0,
        },
        stats: {
          total_equations: 0,
          sessions: 0,
          average_difficulty: 0,
          topics_distribution: [],
        },
        error_patterns: {
          has_errors: false,
          title: "No Data",
          description: "",
        },
        recommendations: [],
      },
    };
  }

  try {
    // Step 1: Aggregate Data
    const rawData = expressions
      .map(
        (e: any, index: number) =>
          `Expr ${index + 1}: ${e.content} (Result: ${e.result}, Type: ${
            e.type
          })`,
      )
      .join("\n");

    const aggregationText = await generateAIResponse(
      `Here is the raw data:\n${rawData}`,
      AGGREGATOR_SYSTEM_PROMPT,
    );

    const cleanAggregationText =
      aggregationText.match(/\{[\s\S]*\}/)?.[0] || aggregationText;

    let aggregatedStats;
    try {
      aggregatedStats = JSON.parse(cleanAggregationText);
    } catch (e) {
      console.error("Failed to parse aggregation JSON:", aggregationText);
      // Fallback
      aggregatedStats = {
        total_equations: expressions.length,
        topics: {
          algebra: expressions.length,
          trigonometry: 0,
          fractions: 0,
          other: 0,
        },
        mistakes: [],
        examples: [],
        difficulty_rating_avg: 5,
        sessions: 1,
      };
    }

    // Step 2: Analyze with "Analyst" Persona
    const analysisText = await generateAIResponse(
      JSON.stringify(aggregatedStats, null, 2),
      ANALYST_SYSTEM_PROMPT,
    );

    const cleanAnalysisText =
      analysisText.match(/\{[\s\S]*\}/)?.[0] || analysisText;

    let finalData;
    try {
      finalData = JSON.parse(cleanAnalysisText);
    } catch (e) {
      console.error("Failed to parse analyst JSON:", analysisText);
      // Minimal fallback in case of AI malformed JSON
      finalData = {
        progress_summary: {
          title: "Analysis Failed",
          text: "Could not parse AI response.",
          score: 0,
        },
        stats: {
          total_equations: expressions.length,
          sessions: 1,
          average_difficulty: 0,
          topics_distribution: [],
        },
        error_patterns: {
          has_errors: false,
          title: "Error",
          description: "Please try again.",
        },
        recommendations: [],
      };
    }

    return {
      success: true,
      data: finalData,
    };
  } catch (error) {
    console.error("Error generating explanation:", error);
    return {
      success: false,
      message: "Server error during analysis",
    };
  }
});
