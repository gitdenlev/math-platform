// Simple in-memory rate limiter
// Для production краще використовувати Redis або Upstash

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

// ВАЖЛИВО: setInterval не можна використовувати в global scope в Cloudflare Workers
// Замість цього виконуємо очищення під час кожної перевірки (inline cleanup)

export default defineEventHandler(async (event) => {
  // Застосовуємо тільки до API routes
  const path = event.path;
  if (!path.startsWith("/api/")) return;

  // Отримуємо IP адресу або user ID
  const identifier =
    event.context.user?.id || // Якщо авторизований
    getRequestIP(event, { xForwardedFor: true }) ||
    "unknown";

  const now = Date.now();
  const windowMs = 60 * 1000; // 1 хвилина
  const maxRequests = 30; // 30 запитів на хвилину

  // Inline cleanup: видаляємо застарілі записи під час перевірки
  // Це замінює setInterval, який не працює в Cloudflare Workers
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key);
    }
  }

  // Отримуємо або створюємо запис
  let entry = rateLimitStore.get(identifier);

  if (!entry || entry.resetAt < now) {
    // Створюємо новий запис
    entry = {
      count: 0,
      resetAt: now + windowMs,
    };
    rateLimitStore.set(identifier, entry);
  }

  // Збільшуємо лічильник
  entry.count++;

  // Перевіряємо ліміт
  if (entry.count > maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);

    throw createError({
      statusCode: 429,
      statusMessage: "Too Many Requests",
      data: {
        retryAfter,
        message: `Rate limit exceeded. Please try again in ${retryAfter} seconds.`,
      },
    });
  }

  // Додаємо headers для інформування клієнта
  setResponseHeader(event, "X-RateLimit-Limit", maxRequests.toString());
  setResponseHeader(
    event,
    "X-RateLimit-Remaining",
    Math.max(0, maxRequests - entry.count).toString(),
  );
  setResponseHeader(
    event,
    "X-RateLimit-Reset",
    new Date(entry.resetAt).toISOString(),
  );
});
