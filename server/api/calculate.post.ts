import { create, all } from "mathjs";

const math = create(all);

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
