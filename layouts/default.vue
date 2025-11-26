<template>
  <div class="relative min-h-screen">
    <!-- Sidebar Trigger Area -->
    <div
      class="fixed top-0 left-0 h-full w-6 z-50"
      @mouseenter="isSidebarOpen = true"
    ></div>

    <Sidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

    <div
      class="transition-transform duration-300 ease-in-out"
      :class="{ 'pl-72': isSidebarOpen }"
    >
      <HumanifyHeader />
      <main class="p-4 sm:p-6 lg:p-8">
        <slot />
      </main>
      <HumanifyFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "~/components/sidebar/Sidebar.vue";
import HumanifyHeader from "~/components/HumanifyHeader.vue";
import HumanifyFooter from "~/components/HumanifyFooter.vue";

const isSidebarOpen = ref(false);
</script>