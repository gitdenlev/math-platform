<script setup lang="ts">
defineProps({
  space: {
    type: Object,
    required: true,
    default: () => ({ name: 'Link', icon: 'mdi:link', to: '#' }),
  },
});
</script>

<template>
  <NuxtLink
    :to="space.to"
    class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-white hover:text-gray-900 transition-colors"
    active-class="bg-blue-100 text-blue-600 font-semibold"
  >
    <Icon :name="space.icon" class="text-xl flex-shrink-0" />
    <span class="font-medium text-sm">{{ space.name }}</span>
  </NuxtLink>
</template>