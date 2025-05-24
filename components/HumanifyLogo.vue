<template>
  <NuxtLink to="/">
    <div class="flex items-center group">
      <Icon name="mdi:brain-freeze" :class="`text-3xl ${logoColor} mb-1`" />
      <span :class="`${logoColor} text-2xl font-semibold tracking-tight`">Humanify</span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
  logoColor: {
    type: String,
    default: 'text-white', // Колір за замовчуванням: клас Tailwind CSS, наприклад 'text-white', 'text-emerald-600'
  },
});
</script>