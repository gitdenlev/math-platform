<script setup lang="ts">
import { ref } from "vue";

// Форма логіну
const loginForm = ref({
  email: "",
  password: "",
  rememberMe: false,
});

// Стан завантаження
const isLoading = ref(false);

// Обробка відправки форми
const handleLogin = async () => {
  isLoading.value = true;

  try {
    // Тут буде логіка авторизації
    console.log("Дані для логіну:", loginForm.value);

    // Симуляція запиту
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Перенаправлення після успішного логіну
    // await navigateTo('/dashboard')
  } catch (error) {
    console.error("Помилка логіну:", error);
  } finally {
    isLoading.value = false;
  }
};

// SEO
useHead({
  title: "Увійти - Humanify",
  meta: [
    {
      name: "description",
      content:
        "Увійдіть до свого облікового запису Humanify та продовжуйте вивчати математику через програмування.",
    },
  ],
  link: [
    {
      rel: "icon",
      href: "/logo.svg",
      type: "image/svg+xml",
    },
  ],
});

// Переваги платформи для відображення
const benefits = [
  {
    icon: "mdi:code-braces",
    title: "Інтерактивні задачі",
    description: "Розв'язуйте математичні задачі з миттєвою перевіркою",
  },
  {
    icon: "mdi:flask-outline",
    title: "Експериментальна лабораторія",
    description: "Досліджуйте концепції через симуляції",
  },
  {
    icon: "mdi:book-open-variant",
    title: "Докладний довідник",
    description: "Повний математичний довідник з візуалізаціями",
  },
];
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Ліва частина - форма логіну -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <!-- Логотип та заголовок -->
        <div class="text-center">
          <div
            class="mx-auto h-16 w-16 bg-emerald-600 rounded-xl flex items-center justify-center mb-6"
          >
            <Icon name="mdi:function" class="text-3xl text-white" />
          </div>

          <h2 class="text-3xl font-semibold mb-2">Ласкаво просимо!</h2>
          <p class="text-gray-600">
            Увійдіть до свого облікового запису Humanify
          </p>
        </div>

        <!-- Форма логіну -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-4">
            <!-- Email -->
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Електронна пошта
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <Icon name="mdi:email-outline" class="text-gray-400" />
                </div>
                <input
                  id="email"
                  v-model="loginForm.email"
                  type="email"
                  required
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <!-- Пароль -->
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Пароль
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <Icon name="mdi:lock-outline" class="text-gray-400" />
                </div>
                <input
                  id="password"
                  v-model="loginForm.password"
                  type="password"
                  required
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <!-- Додаткові опції -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="loginForm.rememberMe"
                type="checkbox"
                class="h-4 w-4 text-emerald-600 focus:ring-emerald-600 border-gray-300 rounded bg-red-500"
              />
              <ULabel for="remember-me" class="ml-2 block text-sm text-gray-700">
                Запам'ятати мене
              </ULabel>
            </div>

            <NuxtLink
              to="/forgot-password"
              class="text-sm text-emerald-600 hover:text-emerald-500 transition-colors"
            >
              Забули пароль?
            </NuxtLink>
          </div>

          <!-- Кнопка входу -->
          <UButton
            type="submit"
            :loading="isLoading"
            :disabled="isLoading"
            class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02]"
            size="lg"
          >
            <template v-if="!isLoading">
              <Icon name="mdi:login" class="mr-2" />
              Увійти
            </template>
            <template v-else>
              <Icon name="mdi:loading" class="mr-2 animate-spin" />
              Вхід...
            </template>
          </UButton>

          <!-- Соціальні входи -->
          <div>
            <div class="relative">
              <div class="relative flex justify-center text-sm">
                <span class="px-2 rounded-xl">Або увійдіть через</span>
              </div>
            </div>

            <div class="mx-auto mt-4">
              <UButton
                variant="outline"
                class="w-full border-gray-300 hover:border-gray-400 py-3 rounded-xl"
              >
                <Icon name="mdi:google" class="text-red-500 mr-2" />
                Google
              </UButton>
            </div>
          </div>
        </form>

        <!-- Реєстрація -->
        <div class="text-center">
          <p class="text-gray-600">
            Ще не маєте облікового запису?
            <NuxtLink
              to="/register"
              class="text-emerald-600 hover:text-emerald-500 font-medium transition-colors"
            >
              Зареєструватися
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Додаткові стилі для анімацій */
.transform {
  transition: transform 0.2s ease;
}

/* Стилі для focus states */
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

/* Анімація для кнопок */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}
</style>
