<script setup lang="ts">
const isDrawerOpen = ref(false);
const route = useRoute();

const navLinks = [
  { label: "Довідник", to: "/theory", icon: "mdi:book-open-variant" },
  { label: "Задачі", to: "/tasks", icon: "mdi:lightbulb-on-outline" },
  { label: "Лабораторія", to: "/lab", icon: "mdi:flask-outline" },
  {
    label: "AI",
    to: "/humy",
    icon: "streamline-flex:ai-scanner-robot-remix",
  },
];

const isActive = (path: string) => route.path === path;
</script>

<template>
  <header
    class="sticky top-0 z-999 bg-emerald-600/90 backdrop-blur-md shadow-md border-b border-emerald-400/20"
  >
    <nav class="w-full flex items-center justify-between p-6">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 text-white text-lg font-bold hover:scale-105 transition-all duration-300"
      >
        <HumanifyLogo class="drop-shadow-sm" />
      </NuxtLink>

      <div
        class="hidden md:flex items-center gap-8 text-white text-lg font-medium"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="group relative px-4 py-2 font-semibold transition-all duration-300 flex items-center gap-2 rounded-xl"
          :class="[
            'group relative px-4 py-2 font-semibold transition-all duration-300 flex items-center gap-2 rounded-xl',
            isActive(link.to)
              ? 'bg-white/10 shadow-md scale-105'
              : 'hover:bg-white/10 hover:shadow-md hover:scale-105',
          ]"
        >
          <Icon
            v-if="link.icon"
            :name="link.icon"
            :class="{ 'text-emerald-100': isActive(link.to) }"
          />
          <span class="relative z-10">{{ link.label }}</span>

          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden"
          >
            <div
              class="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            />
          </div>
        </NuxtLink>
      </div>

      <div class="flex items-center gap-4">
        <UButton
          icon="typcn:th-menu"
          class="md:hidden text-white bg-transparent hover:bg-emerald-500 hover:scale-110 transition-all duration-300"
          @click="isDrawerOpen = true"
        />

        <UAvatar
          src="https://github.com/benjamincanac.png"
          class="cursor-pointer ring-2 ring-white/30 hover:ring-white/50 hover:scale-110 transition-all duration-300 shadow-lg"
        />
      </div>
    </nav>
  </header>
</template>
