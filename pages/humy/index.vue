<template>
  <NuxtLayout name="default">
    <div class="flex items-center justify-center p-4">
      <div
        class="max-w-4xl w-full mx-auto flex flex-col h-[80vh] bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden"
      >
        <!-- Header -->
        <div
          class="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5 flex items-center justify-between"
        >
          <div class="flex items-center gap-4">
            <div class="flex gap-2">
              <div class="w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
              <div
                class="w-3 h-3 bg-white/50 rounded-full animate-pulse"
                style="animation-delay: 0.5s"
              ></div>
              <div
                class="w-3 h-3 bg-white/70 rounded-full animate-pulse"
                style="animation-delay: 1s"
              ></div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-white font-semibold text-lg">
                Чат з асистентом
              </span>
            </div>
          </div>
          <!-- Clear Chat Button -->
        </div>

        <!-- Messages Container -->
        <div
          ref="messageContainerRef"
          class="flex-grow p-6 space-y-4 overflow-y-auto custom-scrollbar"
        >
          <div
            v-for="(message, index) in messages"
            :key="message.id"
            class="flex items-end gap-3 animate-message-slide"
            :class="message.sender === 'user' ? 'justify-end' : 'justify-start'"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <!-- Bot Avatar -->
            <div
              v-if="message.sender === 'bot'"
              class="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md"
            >
              <Icon
                name="streamline-flex:ai-scanner-robot-remix"
                class="text-lg text-white"
              />
            </div>

            <!-- Message Bubble -->
            <div
              class="max-w-sm md:max-w-md lg:max-w-lg px-5 py-3 rounded-2xl shadow-sm transform transition-all duration-300"
              :class="{
                'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-br-md message-user':
                  message.sender === 'user',
                'bg-gray-100 text-gray-800 rounded-bl-md message-bot':
                  message.sender === 'bot',
              }"
            >
              <div
                class="text-sm leading-relaxed whitespace-pre-wrap"
                v-html="formatMessage(message.text)"
              ></div>
            </div>

            <!-- User Avatar -->
            <div
              v-if="message.sender === 'user'"
              class="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md"
            >
              <Icon name="lucide:user" class="text-white" size="18" />
            </div>
          </div>

          <!-- Typing Indicator -->
          <div
            v-if="isTyping"
            class="flex items-end gap-3 justify-start animate-typing-appear"
          >
            <div
              class="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center flex-shrink-0 shadow-md"
            >
              <span class="text-emerald-600 text-lg">🤖</span>
            </div>
            <div
              class="px-5 py-3 rounded-2xl rounded-bl-md bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm"
            >
              <div class="flex items-center gap-1">
                <span class="text-emerald-600 font-medium text-sm">
                  Друкую
                </span>
                <div class="flex gap-1 ml-1">
                  <div
                    class="w-1 h-1 bg-emerald-600 rounded-full animate-typing-dot"
                  ></div>
                  <div
                    class="w-1 h-1 bg-emerald-600 rounded-full animate-typing-dot"
                    style="animation-delay: 0.2s"
                  ></div>
                  <div
                    class="w-1 h-1 bg-emerald-600 rounded-full animate-typing-dot"
                    style="animation-delay: 0.4s"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div
          class="p-6 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100"
        >
          <div class="flex items-center justify-center gap-4">
            <div class="flex-grow relative">
              <textarea
                v-model="newMessage"
                @keydown.enter.prevent="handleEnter"
                @input="autoResize"
                ref="textareaRef"
                placeholder="Запитайте Humy про математику або програмування..."
                rows="1"
                class="w-full bg-white rounded-xl px-5 py-3 pr-20 resize-none focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm transition-all duration-200 max-h-32 overflow-y-auto custom-scrollbar"
                style="min-height: 48px"
                maxlength="300"
                :disabled="isTyping"
              ></textarea>
              <div class="absolute right-3 bottom-3 flex items-center gap-2">
                <span class="text-xs text-gray-400">
                  {{ newMessage.length }}/300
                </span>
                <div class="w-px h-4 bg-gray-300"></div>
                <button
                  @click="sendMessage"
                  :disabled="!newMessage.trim() || isTyping"
                  class="cursor-pointer w-8 h-8 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-500/90 hover:to-emerald-600/90 text-white transition-all duration-300 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed rounded-full"
                >
                  <Icon
                    :name="isTyping ? 'lucide:loader-2' : 'f7:return'"
                    size="20"
                    :class="isTyping ? 'animate-spin' : ''"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";

useHead({
  title: "Humy - AI помічник з математики та програмування",
  meta: [
    {
      name: "description",
      content:
        "Чат з AI-асистентом Humy - вашим помічником з математики та програмування.",
    },
  ],
});

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp?: Date;
}

interface ChatHistory {
  role: "user" | "model";
  parts: { text: string }[];
}

// Реактивні змінні
const messages = ref<Message[]>([
  {
    id: 1,
    text: "Привіт! 🤖 Я Humy, ваш спеціалізований AI-помічник з математики та програмування!\n\n📊 Можу допомогти з:\n• Алгеброю та геометрією\n• Математичним аналізом\n• Статистикою та ймовірністю\n\n💻 А також з:\n• Програмуванням на будь-яких мовах\n• Алгоритмами та структурами даних\n• Веб-розробкою\n\nЧим можу допомогти?",
    sender: "bot",
    timestamp: new Date(),
  },
]);

const newMessage = ref("");
const isTyping = ref(false);
const messageContainerRef = ref<HTMLElement | null>(null);
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const chatHistory = ref<ChatHistory[]>([]);

// Швидкі дії
const quickActions = ref([
  { emoji: "📊", text: "Чому дорівнює число ПІ?" },
  { emoji: "🔢", text: "Допомогти з алгоритмом" },
  { emoji: "📐", text: "Геометрична задача" },
]);

// Функції
const scrollToBottom = async () => {
  await nextTick();
  const container = messageContainerRef.value;
  if (container) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }
};

const autoResize = () => {
  const textarea = textareaRef.value;
  if (textarea) {
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 128) + "px";
  }
};

const formatMessage = (text: string) => {
  // Замінюємо символи для кращого відображення
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Жирний текст
    .replace(/\*(.*?)\*/g, "<em>$1</em>") // Курсив
    .replace(
      /`(.*?)`/g,
      '<code class="bg-gray-200 px-1 py-0.5 rounded text-sm">$1</code>'
    ) // Інлайн код
    .replace(
      /```([\s\S]*?)```/g,
      '<pre class="bg-gray-800 text-green-400 p-3 rounded mt-2 overflow-x-auto"><code>$1</code></pre>'
    ) // Блоки коду
    .replace(/\n/g, "<br>"); // Переноси рядків
};

const handleEnter = (event: KeyboardEvent) => {
  if (event.shiftKey) {
    // Shift + Enter = новий рядок
    return;
  }
  // Enter = відправити повідомлення
  sendMessage();
};

const sendQuickMessage = (message: string) => {
  newMessage.value = message;
  sendMessage();
};

const sendMessage = async () => {
  if (!newMessage.value.trim() || isTyping.value) return;

  const userMessageText = newMessage.value.trim();
  const timestamp = new Date();

  // Додаємо повідомлення користувача
  messages.value.push({
    id: Date.now(),
    text: userMessageText,
    sender: "user",
    timestamp,
  });

  // Очищуємо поле введення
  newMessage.value = "";
  if (textareaRef.value) {
    textareaRef.value.style.height = "48px";
  }
  scrollToBottom();

  // Включаємо індикатор друку
  isTyping.value = true;
  scrollToBottom();

  try {
    // Відправляємо запит до API
    const response = await $fetch("/api/chat", {
      method: "POST",
      body: {
        message: userMessageText,
        history: chatHistory.value,
      },
    });

    let botText = "";

    // Обробляємо відповідь API
    if (typeof response === "object" && response.response) {
      botText = response.response;
      if (response.newHistory) {
        chatHistory.value = response.newHistory;
      }
    } else if (typeof response === "string") {
      botText = response;
      // Оновлюємо історію вручну
      chatHistory.value.push(
        { role: "user", parts: [{ text: userMessageText }] },
        { role: "model", parts: [{ text: botText }] }
      );
    }

    // Додаємо відповідь бота
    messages.value.push({
      id: Date.now() + 1,
      text: botText,
      sender: "bot",
      timestamp: new Date(),
    });
  } catch (error: any) {
    console.error("Помилка при відправці повідомлення:", error);

    let errorMessage =
      "🤖 Вибачте, виникла технічна помилка. Спробуйте ще раз пізніше.";

    if (error.data?.statusMessage) {
      errorMessage = `🤖 ${error.data.statusMessage}`;
    } else if (error.message) {
      errorMessage = `🤖 Помилка: ${error.message}`;
    }

    messages.value.push({
      id: Date.now() + 1,
      text: errorMessage,
      sender: "bot",
      timestamp: new Date(),
    });
  } finally {
    isTyping.value = false;
    scrollToBottom();
  }
};

// Хуки життєвого циклу
onMounted(() => {
  // Фокусуємось на полі введення при завантаженні
  if (textareaRef.value) {
    textareaRef.value.focus();
  }
});
</script>

<style scoped>
/* Кастомний скролбар */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #10b981, #059669);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #059669, #047857);
}

/* Анімації для повідомлень */
@keyframes message-slide {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-message-slide {
  animation: message-slide 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Анімація для індикатора друку */
@keyframes typing-appear {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-typing-appear {
  animation: typing-appear 0.4s ease-out forwards;
}

/* Анімація крапок для індикатора друку */
@keyframes typing-dot {
  0%,
  60%,
  100% {
    transform: scale(1);
    opacity: 0.4;
  }
  30% {
    transform: scale(1.3);
    opacity: 1;
  }
}

.animate-typing-dot {
  animation: typing-dot 1.6s ease-in-out infinite;
}

/* Стилі для повідомлень */
.message-user {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.message-bot {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* Плавні переходи */
* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Плавне прокручування */
.custom-scrollbar {
  scroll-behavior: smooth;
}

/* Стилі для коду в повідомленнях */
:deep(code) {
  font-family: "Fira Code", "Monaco", "Consolas", monospace;
  font-size: 0.9em;
}

:deep(pre) {
  font-family: "Fira Code", "Monaco", "Consolas", monospace;
  font-size: 0.85em;
  line-height: 1.4;
}

/* Адаптивність */
@media (max-width: 640px) {
  .max-w-sm {
    max-width: 85%;
  }

  .px-6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Анімація для швидких дій */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}

/* Фокус стилі */
textarea:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

/* Заборонити селекцію тексту на кнопках */
button {
  user-select: none;
}

/* Стилі для повідомлень помилок */
.error-message {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}
</style>
