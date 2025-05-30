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

// Переваги платформи для відображення (не використовуються в цьому шаблоні, але залишені)
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
  <div class="min-h-screen flex p-6">
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <div
            class="mx-auto h-16 w-16 text-white bg-emerald-600 rounded-xl flex items-center justify-center mb-6"
          >
            <Icon name="mdi:brain-freeze" size="200" />
          </div>

          <h2 class="text-3xl font-semibold mb-2">Ласкаво просимо!</h2>
          <p class="text-gray-600">
            Увійдіть до свого облікового запису Humanify
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="space-y-4">
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
                  class="w-full pl-10 p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

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
                  class="w-full pl-10 p-2 border border-gray-300 rounded-xl focus:border-emerald-600 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <UCheckbox
                :ui="{
                  root: 'text-red-600 focus:ring-emerald-600',
                }"
                icon="lucide:check"
                default-value
                label="Запамʼятати мене"
              />
            </div>

            <NuxtLink
              to="/forgot-password"
              class="text-sm text-emerald-600 hover:text-emerald-500 transition-colors"
            >
              Забули пароль?
            </NuxtLink>
          </div>

          <UButton
            type="submit"
            :loading="isLoading"
            :disabled="isLoading"
            class="w-full text-xl flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl font-medium transition-all duration-200 transform"
          >
            <template v-if="!isLoading">
              <Icon name="mdi:login" class="mr-2" />
              Увійти
            </template>
            <template v-else> Вхід... </template>
          </UButton>

          <div>
            <div class="relative my-4">
              <div class="relative flex justify-center text-sm">
                <span class="px-2 text-gray-500"> Або увійдіть через </span>
              </div>
            </div>

            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <UButton
                  variant="outline"
                  class="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl w-full"
                >
                  <Icon name="devicon:google" />
                  Увіти через Google
                </UButton>
              </div>
              <UModal close-icon="ri:close-circle-line">
                <UButton
                  variant="outline"
                  class="bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl w-full flex items-center justify-center"
                >
                  <Icon name="solar:incognito-bold" />
                  Анонімно
                </UButton>

                <template #header>
                  <div class="flex items-center space-x-3">
                    <Icon
                      name="solar:shield-keyhole-line-duotone"
                      class="text-3xl"
                    />
                    <span class="text-xl font-semibold text-white">
                      Анонімний режим
                    </span>
                  </div>
                </template>

                <template #body>
                  <div>
                    <p>
                      В анонімному режимі ваша активність на платформі
                      <br /><strong>не буде зберігатися</strong>.
                    </p>
                    <p>
                      Це чудовий спосіб ознайомитися з Humanify, не створюючи
                      обліковий запис та не впливаючи на ваші персональні дані.
                    </p>
                  </div>
                </template>

                <template #footer>
                  <div class="flex justify-end space-x-3">
                    <UButton @click="navigateTo('/')"> Продовжити </UButton>
                  </div>
                </template>
              </UModal>
            </div>
          </div>
        </form>

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
