<script setup lang="ts">
import { ref } from 'vue';

// Стан для полів форми
const fullName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// Стан для UI (завантаження, помилки)
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);

// Функція для обробки реєстрації
const handleRegister = async () => {
  errorMessage.value = null;
  successMessage.value = null;
  isLoading.value = true;

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Паролі не співпадають.";
    isLoading.value = false;
    return;
  }

  // Тут буде логіка реєстрації з Firebase Authentication або твоїм бекендом
  // Наприклад:
  // try {
  //   const auth = useFirebaseAuth(); // або інший спосіб отримання Firebase Auth
  //   await createUserWithEmailAndPassword(auth, email.value, password.value);
  //   successMessage.value = "Реєстрація успішна! Тепер ви можете увійти.";
  //   // Очистити поля форми
  //   fullName.value = '';
  //   email.value = '';
  //   password.value = '';
  //   confirmPassword.value = '';
  //   // Перенаправити користувача, наприклад, на сторінку входу
  //   // await navigateTo('/login');
  // } catch (error: any) {
  //   errorMessage.value = error.message || "Помилка реєстрації. Спробуйте ще раз.";
  //   console.error("Registration error:", error);
  // } finally {
  //   isLoading.value = false;
  // }

  // Імітація запиту для демонстрації UI
  await new Promise(resolve => setTimeout(resolve, 1500)); // Затримка 1.5 секунди
  if (email.value === 'test@example.com') { // Приклад помилки
    errorMessage.value = "Користувач з таким email вже існує.";
  } else {
    successMessage.value = "Реєстрація успішна! Перевірте свою пошту для підтвердження.";
    // Очистити поля форми після успішної реєстрації
    fullName.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
  }
  isLoading.value = false;
};

// Заголовок сторінки
useHead({
  title: "Humanify - Реєстрація",
  meta: [
    {
      name: "description",
      content:
        "Приєднуйтесь до Humanify та розширюйте свої математичні здібності.",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden
                border border-gray-100 dark:border-gray-700
                transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl
                relative">

      <div class="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 opacity-20 blur-xl"></div>
      <div class="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 opacity-20 blur-xl"></div>


      <div class="p-8 md:p-10 z-10 relative">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 mb-3
                     bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
            Реєстрація
          </h1>
          <p class="text-gray-600 dark:text-gray-300">Створіть свій обліковий запис Humanify</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <UFormGroup label="Повне ім'я" name="fullName">
            <UInput
              v-model="fullName"
              icon="i-heroicons-user"
              placeholder="Ваше ім'я"
              size="lg"
              color="emerald"
              variant="outline"
              required
            />
          </UFormGroup>

          <UFormGroup label="Email" name="email">
            <UInput
              v-model="email"
              icon="i-heroicons-envelope"
              placeholder="ваша@пошта.com"
              type="email"
              size="lg"
              color="emerald"
              variant="outline"
              required
            />
          </UFormGroup>

          <UFormGroup label="Пароль" name="password">
            <UInput
              v-model="password"
              icon="i-heroicons-lock-closed"
              placeholder="Мінімум 8 символів"
              type="password"
              size="lg"
              color="emerald"
              variant="outline"
              required
            />
          </UFormGroup>

          <UFormGroup label="Підтвердіть пароль" name="confirmPassword">
            <UInput
              v-model="confirmPassword"
              icon="i-heroicons-lock-closed"
              placeholder="Повторіть пароль"
              type="password"
              size="lg"
              color="emerald"
              variant="outline"
              required
            />
          </UFormGroup>

          <UButton
            type="submit"
            size="xl"
            block
            color="emerald"
            variant="solid"
            :loading="isLoading"
            class="transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                   flex justify-center items-center gap-2"
          >
            <Icon name="i-heroicons-user-plus" class="w-5 h-5" />
            <span>Зареєструватись</span>
          </UButton>
        </form>

        <div v-if="errorMessage" class="mt-6 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-center border border-red-200 dark:border-red-700">
          <Icon name="i-heroicons-exclamation-circle" class="w-5 h-5 inline-block align-middle mr-2" />
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="mt-6 p-4 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-center border border-emerald-200 dark:border-emerald-700">
          <Icon name="i-heroicons-check-circle" class="w-5 h-5 inline-block align-middle mr-2" />
          {{ successMessage }}
        </div>

        <p class="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Вже маєте обліковий запис?
          <NuxtLink to="/login" class="font-semibold text-emerald-600 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200">
            Увійти
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Забезпечуємо, щоб градієнтний текст працював у Firefox */
@-moz-document url-prefix() {
  .bg-gradient-to-r.bg-clip-text.text-transparent {
    color: #047857; /* emerald-700 */
  }
}

/* Додаткові анімації або стилі, якщо потрібно */
/* .fade-in {
  animation: fadeIn 0.8s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
} */
</style>