<script setup lang="ts">
import { useRoute } from 'vue-router';

const isDrawerOpen = ref(false);
const route = useRoute();

const navLinks = [
  { label: "Довідник", to: "/theory" },
  { label: "Задачі", to: "/tasks" },
  { label: "Лабораторія", to: "/lab" },
];

const isActive = (path: string) => route.path === path;
</script>

<template>
  <header class="sticky top-0 z-999 bg-emerald-600/90 backdrop-blur-md shadow-md">
    <nav class="w-full flex items-center justify-between p-6">
      <!-- Логотип -->
      <NuxtLink
        to="/"
        class="flex items-center gap-2 text-white text-lg font-bold"
      >
        <HumanifyLogo />
      </NuxtLink>

      <!-- Навігація для великих екранів -->
      <div class="hidden md:flex items-center gap-12 text-white text-lg font-medium">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link relative font-semibold transition-colors"
          :class="{ active: isActive(link.to) }"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <!-- Меню для мобільних -->
      <UButton
        icon="typcn:th-menu"
        class="md:hidden text-white bg-transparent hover:bg-emerald-500"
        @click="isDrawerOpen = true"
      />
    </nav>

    <!-- Drawer -->
    <UDrawer
      v-model="isDrawerOpen"
      side="right"
      class="custom-drawer"
      :ui="{
        width: 'w-[280px]',
        overlay: { background: 'bg-black/30' },
        content: 'bg-emerald-600 text-white p-6',
      }"
    >
      <template #content>
        <div class="flex flex-col gap-6 mt-10">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-lg font-medium transition-colors"
            @click="isDrawerOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </template>
    </UDrawer>
  </header>
</template>

<style scoped>
.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 3px;
  background-color: white;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
  border-radius: 2px;
}

/* При наведенні показує лінію */
.nav-link:hover::after {
  transform: scaleX(1);
}

/* Активне посилання — лінія завжди видима */
.nav-link.active::after {
  transform: scaleX(1);
}
</style>
