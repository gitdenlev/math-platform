<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0c0c0c] px-4"
  >
    <div
      class="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[480px]"
    >
      <!-- Header -->
      <div class="flex flex-col space-y-3">
        <h1
          class="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Ласкаво просимо до Humanify
        </h1>
        <p class="text-base text-zinc-500 dark:text-zinc-400">
          Увійдіть або створіть аккаунт використовуючи
          <span class="text-zinc-900 dark:text-zinc-200 font-medium"
            >Magic Link</span
          >
          або Google
        </p>
      </div>

      <!-- Auth Form -->
      <div
        v-if="successMessage"
        class="p-5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-md text-base text-center"
      >
        {{ successMessage }}
      </div>

      <div v-else class="grid gap-8">
        <form @submit.prevent="handleMagicLink">
          <div class="grid gap-5">
            <div class="grid gap-2">
              <label class="sr-only" for="email">Email </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="name@example.com"
                autocomplete="email"
                required
                class="flex h-12 w-full rounded-md border border-zinc-200 bg-transparent px-4 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 dark:text-zinc-50"
              />
            </div>

            <button
              :disabled="loading"
              type="submit"
              class="cursor-pointer flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-12 px-5 w-full"
            >
              <Icon
                v-if="loading"
                name="svg-spinners:180-ring"
                size="20"
                class="mr-2"
              />
              <Icon v-else name="ph:magic-wand-fill" size="20" class="mr-2" />
              <span>Надіслати Magic Link</span>
            </button>
          </div>
        </form>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <span
              class="w-full border-t border-zinc-200 dark:border-zinc-800"
            />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-white dark:bg-[#0c0c0c] px-3 text-zinc-500">
              Або продовжити через
            </span>
          </div>
        </div>

        <div class="flex items-center justify-center">
          <button
            @click="handleGoogleLogin"
            :disabled="loading"
            class="cursor-pointer flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 bg-transparent shadow-sm hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:text-zinc-50 h-12 px-5 w-full gap-2"
          >
            <Icon v-if="loading" name="svg-spinners:180-ring" size="16" />
            <Icon v-else name="logos:google-icon" size="16" />
            Google
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

definePageMeta({
  layout: "blank",
});

useHead({
  title: "Вхід - Humanify",
  meta: [
    {
      name: "description",
      content: "Увійдіть у ваш обліковий запис Humanify",
    },
  ],
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const loading = ref(false);
const successMessage = ref("");

const form = reactive({
  email: "",
});

watch(
  user,
  (currentUser) => {
    if (currentUser) {
      return navigateTo("/");
    }
  },
  { immediate: true },
);

const handleMagicLink = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
      email: form.email,
      options: {
        emailRedirectTo: `${window.location.origin}/confirm`,
      },
    });

    if (error) throw error;
    successMessage.value = "Перевірте вашу пошту для посилання на вхід!";
  } catch (error: any) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
};

const handleGoogleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/confirm`,
      },
    });
    if (error) throw error;
  } catch (error: any) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Scoped styles are minimal, mostly using Tailwind classes */
</style>
