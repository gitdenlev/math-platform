import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  // Застосовуємо тільки до API routes
  const path = event.path;
  if (!path.startsWith("/api/")) return;

  // Public endpoints (якщо потрібно)
  const publicEndpoints = ["/api/health", "/api/public"];
  if (publicEndpoints.some((endpoint) => path.startsWith(endpoint))) {
    return;
  }

  try {
    const user = await serverSupabaseUser(event);

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized - Please login",
      });
    }

    // Додаємо користувача до контексту для використання в API handlers
    event.context.user = user;
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required",
    });
  }
});
