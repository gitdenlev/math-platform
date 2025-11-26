<script setup lang="ts">
import HumanifyLogo from '~/components/HumanifyLogo.vue';
import SpaceItem from '~/components/sidebar/SpaceItem.vue';

const mainLinks = [
  { name: 'Math Solver', icon: 'ph:chat-circle-dots-duotone', to: '/lab' },
  { name: 'Math Tutor', icon: 'ph:student-duotone', to: '#' },
  { name: 'Quiz Me', icon: 'ph:question-duotone', to: '#' },
  { name: 'PDF Homework Helper', icon: 'ph:file-pdf-duotone', to: '#' },
  { name: 'AI Whiteboard', icon: 'ph:chalkboard-teacher-duotone', to: '#' },
];

const historyItems = [
  { name: 'cos(30 deg)', to: '#' },
  // Add more history items here
];
</script>

<template>
  <aside
    class="w-64 bg-[#F0F4F8] border-r border-gray-200 flex flex-col flex-shrink-0"
  >
    <!-- Logo -->
    <div class="h-20 flex items-center px-6 gap-3">
      <HumanifyLogo class="h-9 w-9" />
      <span class="text-2xl font-bold text-gray-800">Humanify</span>
    </div>

    <!-- Navigation -->
    <nav class="flex-grow px-4 pt-4">
      <ul class="space-y-2">
        <li v-for="link in mainLinks" :key="link.name">
          <SpaceItem :space="link" />
        </li>
      </ul>

      <!-- History -->
      <div class="mt-10">
        <h2
          class="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3"
        >
          History
        </h2>
        <ul class="space-y-2">
          <li v-for="item in historyItems" :key="item.name">
            <a
              :href="item.to"
              class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-white hover:text-gray-900 rounded-lg transition-colors"
            >
              <Icon name="ph:clock-counter-clockwise-duotone" class="text-lg" />
              <span class="truncate">{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Footer -->
    <div class="p-4">
       <button
        class="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all"
      >
        Log in here!
      </button>
      <div class="flex items-center justify-center gap-4 mt-4">
          <Icon name="mdi:apple" class="text-gray-400 text-xl" />
          <Icon name="mdi:android" class="text-gray-400 text-xl" />
          <Icon name="mdi:slack" class="text-gray-400 text-xl" />
          <Icon name="mdi:discord" class="text-gray-400 text-xl" />
      </div>
    </div>
  </aside>
</template>