<script setup lang="ts">
const isDrawerOpen = ref(false);
const route = useRoute();

const navLinks = [
  { label: "Довідник", to: "/theory", icon: "mdi:book-open-variant" },
  { label: "Задачі", to: "/tasks", icon: "mdi:lightbulb-on-outline" },
  { label: "Лабораторія", to: "/lab", icon: "mdi:flask-outline" },
  {
    label: "Асистент",
    to: "/humy",
    icon: "streamline-flex:ai-scanner-robot-remix",
  },
];

const isActive = (path: string) => route.path === path;
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-emerald-600 backdrop-blur-lg shadow-lg border-b border-emerald-300/30"
  >
    <nav class="w-full flex items-center justify-between px-4 sm:px-6 py-4">
      <!-- Логотип -->
      <NuxtLink
        to="/"
        class="flex items-center gap-2 text-white text-lg font-bold hover:scale-105 transition-all duration-300 group"
      >
        <div class="relative">
          <HumanifyLogo
            class="drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300"
          />
          <div
            class="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          ></div>
        </div>
      </NuxtLink>

      <!-- Навігація для десктопу -->
      <div class="hidden md:flex items-center gap-2 lg:gap-4">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="group relative px-3 lg:px-4 py-2 font-semibold transition-all duration-300 flex items-center gap-2 rounded-xl text-white/90 hover:text-white"
          :class="[
            isActive(link.to)
              ? 'bg-white/15 shadow-lg scale-105 text-white backdrop-blur-sm'
              : 'hover:bg-white/10 hover:shadow-md hover:scale-105 hover:backdrop-blur-sm',
          ]"
        >
          <Icon
            v-if="link.icon"
            :name="link.icon"
            class="text-base lg:text-lg transition-all duration-300"
          />
          <span class="relative z-10 text-sm lg:text-base">{{
            link.label
          }}</span>
        </NuxtLink>
      </div>

      <!-- Права частина -->
      <div class="flex items-center gap-3">
        <!-- Мобільне меню -->
        <UButton
          icon="typcn:th-menu"
          class="md:hidden text-white bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-300 backdrop-blur-sm shadow-md border border-white/20"
          variant="ghost"
          size="sm"
          @click="isDrawerOpen = true"
        />

        <!-- Аватар -->
        <div class="relative group">
          <UAvatar
            src="https://github.com/benjamincanac.png"
            class="cursor-pointer ring-2 ring-white/40 hover:ring-white/60 hover:scale-110 transition-all duration-300 shadow-lg"
            size="sm"
          />
          <!-- Свіжіння навколо аватара -->
          <div
            class="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-150"
          ></div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.shimmer {
  animation: shimmer 1s ease-in-out;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-12deg);
  }
  100% {
    transform: translateX(200%) skewX(-12deg);
  }
}

/* Додаткові стилі для кращого вигляду */
@media (max-width: 768px) {
  nav {
    padding: 0.75rem 1rem;
  }
}
</style>
