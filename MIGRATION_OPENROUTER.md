# Migration to OpenRouter

## Що змінилось

Проект тепер використовує **OpenRouter API** замість Google Gemini для генерації AI-відповідей.

### Зміни:

1. **Додано пакет**: `@openrouter/sdk`
2. **Видалено пакети**: `@google/genai`, `@google/generative-ai`
3. **Оновлено файли**:
   - `server/utils/ai.ts` - повністю переписано для OpenRouter
   - `nuxt.config.ts` - змінено `geminiApiKey` на `openrouterApiKey`
   - `.env` - замінено `GEMINI_API_KEY` на `OPENROUTER_API_KEY`

### Модель AI:
Використовується безкоштовна модель: **`mistralai/devstral-2512:free`**

## Як налаштувати

1. **Отримайте API ключ OpenRouter**:
   - Зареєструйтесь на [OpenRouter](https://openrouter.ai/)
   - Створіть новий API ключ

2. **Додайте ключ у `.env`**:
   ```bash
   OPENROUTER_API_KEY="your-actual-api-key-here"
   ```

3. **Перезапустіть dev сервер**:
   ```bash
   npm run dev
   ```

## API використання

Існуючий код не потребує змін - усі функції працюють так само:

```typescript
// Звичайна генерація
const response = await generateAIResponse(
  "Що таке Math.js?",
  "Ти корисний AI асистент для математики"
);

// Стрімінг
for await (const chunk of streamAIResponse(
  "Поясни цю формулу",
  "Ти вчитель математики"
)) {
  console.log(chunk);
}
```

## Переваги OpenRouter

- ✅ Безкоштовна модель Mistral
- ✅ Підтримка streaming
- ✅ Простий API
- ✅ Велика кількість доступних моделей
- ✅ Можливість легко міняти модель

## Зміна моделі

Якщо хочете використати іншу модель, змініть `model` параметр у `server/utils/ai.ts`:

```typescript
const response = await openrouter.chat.send({
  model: "mistralai/devstral-2512:free", // Змініть тут
  messages,
  temperature: 0.7,
  max_tokens: 500,
});
```

Доступні моделі: https://openrouter.ai/models
