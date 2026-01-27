<template>
  <div
    class="relative min-h-screen w-full flex flex-col bg-zinc-50 dark:bg-[#0c0c0c] overflow-hidden transition-colors duration-300"
  >
    <!-- Subtle Gradient Overlay -->
    <div
      class="absolute inset-0 z-0 bg-gradient-to-b from-white via-zinc-50 to-zinc-100 dark:from-[#0c0c0c] dark:via-[#0c0c0c] dark:to-[#0c0c0c]"
    ></div>

    <!-- Content Slot -->
    <div
      class="relative z-10 w-full h-full flex flex-col flex-1"
      :class="innerClass"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  innerClass: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
/* Clean minimal background */
</style>
