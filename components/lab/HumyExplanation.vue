<template>
  <div
    class="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    @click.self="$emit('close')"
  >
    <div
      class="relative w-full max-w-[580px] bg-[#fbfbfd] dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-800 flex flex-col max-h-[80vh]"
    >
      <!-- Minimal Header -->
      <div
        class="px-5 py-3.5 flex items-center justify-between border-b border-gray-200/50 dark:border-gray-800"
      >
        <button
          @click="$emit('close')"
          class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
        >
          <Icon name="ph:x" size="16" />
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto px-5 py-5">
        <!-- Loading -->
        <div
          v-if="isLoading"
          class="flex flex-col items-center justify-center py-12"
        >
          <div
            class="w-8 h-8 border-2 border-gray-300 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-400 rounded-full animate-spin mb-4"
          ></div>
        </div>

        <!-- AI Response -->
        <div v-else-if="result" class="response-content">
          {{ result }}
        </div>

        <!-- Empty -->
        <div v-else class="text-center py-12 text-gray-400 text-sm">
          No explanation available
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";

const props = defineProps({
  expression: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    default: "",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["close"]);
</script>

<style scoped>
.response-content {
  /* System fonts priority - San Francisco on Mac */
  font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto,
    sans-serif;

  /* Larger, more readable size */
  font-size: 19px;
  font-weight: 400;

  /* Ultra-tight line height */
  line-height: 1.35;

  /* Tight letter spacing - words almost touching */
  letter-spacing: -0.04em;

  /* Make words closer together */
  word-spacing: -0.05em;

  /* Apple's classic dark gray */
  color: #1d1d1f;

  /* Text alignment */
  text-align: left;

  /* Smooth font rendering */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Spacing */
  margin: 0;
  padding: 0;

  /* Better text rendering */
  text-rendering: optimizeLegibility;
}

:global(.dark) .response-content {
  color: #ffffff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
