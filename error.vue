<template>
  <div
    class="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white text-gray-800 p-8 gap-12"
  >
    <NuxtImg
      loading="lazy"
      src="/not-found-page-humanify.svg"
      alt="Креативна команда Humanify працює над вирішенням проблем, символізуючи пошук рішення на сторінці 404."
      width="500"
    />

    <!-- Права частина (опис + кнопка) -->
    <div class="text-center md:text-left max-w-md">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 text-emerald-600">
        Error {{ error.statusCode }}
      </h1>
      <p class="text-xl mb-6 text-gray-700">
        {{ error.message || 'Сторінка, яку ви шукаєте, не існує або була видалена.' }}
      </p>
      <NuxtLink
        to="/"
        class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
      >
        На головну
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  error: Object,
});
</script>
