<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0c0c0c] px-4"
  >
    <div class="text-center space-y-4">
      <div class="w-16 h-16 mx-auto flex items-center justify-center">
        <Icon
          v-if="!error"
          name="svg-spinners:180-ring"
          size="32"
          class="text-emerald-600 dark:text-emerald-400"
        />
        <Icon v-else name="ph:x-circle" size="32" class="text-red-500" />
      </div>

      <h1 class="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        {{ error ? "Помилка автентифікації" : "Підтвердження входу..." }}
      </h1>

      <p class="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
        {{
          error
            ? error
            : "Будь ласка, зачекайте, поки ми перевіримо ваші облікові дані."
        }}
      </p>

      <NuxtLink
        v-if="error"
        to="/login"
        class="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-md bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        <Icon name="ph:arrow-left" size="16" />
        Назад до входу
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

useHead({
  title: "Підтвердження входу - Humanify",
});

const user = useSupabaseUser();

const error = ref<string | null>(null);

watch(
  user,
  (currentUser) => {
    if (currentUser) {
      return navigateTo("/");
    }
  },
  { immediate: true },
);

onMounted(async () => {
  // Give Supabase time to process the auth callback
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!user.value) {
    error.value =
      "Не вдалося перевірити ваш вхід. Будь ласка, спробуйте ще раз.";
  }
});
</script>
