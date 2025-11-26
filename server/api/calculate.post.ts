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
    // Use local mathjs evaluation
    const result = math.evaluate(expression);

    // Format the result to a string
    // precision: 14 is a good default to avoid floating point artifacts like 0.30000000000000004
    const formattedResult = math.format(result, { precision: 14 });

    return { result: formattedResult };
  } catch (error: any) {
    // Return a 200 OK even for math errors so the frontend can display them nicely
    // instead of the browser showing a 500 error page if not caught
    // But strictly speaking, 400 is correct for bad syntax.
    // However, the frontend `useFetch` might throw on 400.
    // Let's throw a 400 but ensure the message is clear.
    throw createError({
      statusCode: 400,
      message: error.message || "Invalid mathematical expression",
    });
  }
});
