<script setup lang="ts">
import type { VerticalNavigationLink } from '#ui/types'

const route = useRoute();
const isModalOpen = ref(false);

// Основні посилання для навігації
const mainLinks: VerticalNavigationLink[] = [
  {
    label: 'Довідник',
    icon: 'i-heroicons-book-open',
    to: '/theory'
  },
  {
    label: 'Лабораторія',
    icon: 'i-heroicons-beaker',
    to: '/lab'
  },
  {
    label: 'Асистент',
    icon: 'i-heroicons-sparkles',
    to: '/humy'
  }
];

// Додаткові посилання (користувацькі)
const userLinks: VerticalNavigationLink[] = [
  {
    label: 'Налаштування',
    icon: 'i-heroicons-cog-6-tooth',
    to: '/settings' // Приклад шляху
  },
  {
    label: 'Профіль',
    icon: 'i-heroicons-user-circle',
    to: '/profile' // Приклад шляху
  }
];

// Функція для закриття модального вікна
const closeModal = () => {
  isModalOpen.value = false;
};

// Примітка: Я замінив іконки MDI на Heroicons (стандарт для NuxtUI), 
// щоб не вимагати додаткових залежностей. Ви можете повернути свої, 
// якщо у вас налаштована бібліотека @iconify/vue.
// Наприклад: 'mdi:book-open-variant' -> 'i-mdi-book-open-variant'
</script>

<template>
  <header class="sticky top-0 z-50 bg-emerald-600 shadow-lg">
    <nav class="w-full flex items-center justify-between px-4 sm:px-6 py-3">
      <NuxtLink to="/" class="flex items-center gap-2 text-white text-lg font-bold">
        <Icon name="i-heroicons-academic-cap-solid" class="h-8 w-8 text-white" />
        <span class="hidden sm:inline">Humanify</span>
      </NuxtLink>

      <div class="hidden md:flex items-center gap-2 lg:gap-4">
        <UButton
          v-for="link in mainLinks"
          :key="link.to"
          :to="link.to"
          :variant="route.path === link.to ? 'soft' : 'ghost'"
          color="white"
          :icon="link.icon"
          size="lg"
        >
          {{ link.label }}
        </UButton>
      </div>

      <div class="flex items-center gap-3">
        <UButton
          icon="i-heroicons-bars-3"
          class="md:hidden"
          variant="ghost"
          color="white"
          size="xl"
          @click="isModalOpen = true"
        />
      </div>
    </nav>

    
  </header>
</template>

<style scoped>
/* Стилі для десктопного меню, якщо потрібно */
/* Більшість стилів тепер контролюється NuxtUI, тому цей блок може бути порожнім */
</style>