<template>
  <div class="flex flex-col items-center p-3 sm:p-6">
    <div class="w-full max-w-3xl flex flex-col gap-4">
      <!-- Result Display -->
      <div
        v-if="result"
        class="w-full animate-slide-up bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 sm:p-6"
      >
        <div class="flex flex-col gap-4">
          <!-- Main Result -->
          <div
            v-if="!result.error"
            class="text-2xl sm:text-3xl font-mono font-medium leading-relaxed text-gray-900 dark:text-gray-100 break-all"
          >
            {{ result.result }}
          </div>

          <!-- Error State -->
          <div v-else class="flex items-start">
            <div>
              <h3 class="text-sm font-bold text-red-900">Calculation Error</h3>
              <p class="text-sm text-red-600 mt-1 font-medium">
                {{ result.result.replace("Error: ", "") }}
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div
            v-if="!result.error"
            class="flex items-center gap-3 sm:gap-4 pt-2 flex-wrap"
          >
            <button
              @click="handleCopy"
              class="text-gray-400 hover:text-emerald-600 transition-colors flex items-center gap-1"
              :class="{ 'text-emerald-600': isCopied }"
              title="Copy"
            >
              <Icon
                :name="isCopied ? 'ph:check-bold' : 'ph:copy-simple'"
                size="18"
                class="transition-all duration-300"
              />
            </button>

            <button
              @click="toggleExplanation"
              class="text-gray-400 hover:text-emerald-600 transition-colors"
              :class="{ 'text-emerald-600': showExplanation }"
              title="Explain logic"
            >
              <Icon name="streamline-flex:ai-scanner-robot-remix" size="18" />
            </button>
          </div>

          <!-- Explanation Container -->
          <div
            v-if="showExplanation"
            class="w-full relative overflow-hidden group min-h-[150px]"
          >
            <div class="relative z-10">
              <!-- Loading State (Skeleton) -->
              <div
                v-if="isExplanationLoading"
                class="w-full space-y-3 py-4 animate-pulse"
              >
                <div class="h-4 bg-emerald-300 rounded w-3/4"></div>
                <div class="h-4 bg-emerald-300 rounded w-1/2"></div>
                <div class="h-4 bg-emerald-300 rounded w-5/6"></div>
              </div>

              <!-- Content -->
              <div v-else-if="explanation" class="prose prose-sm max-w-none">
                <div
                  class="flex items-center gap-2 mb-4 text-emerald-700 font-medium text-sm"
                >
                  <span class="gradient-text">Explanation</span>
                </div>
                <div
                  class="text-gray-700 dark:text-white leading-relaxed text-[15px]"
                  v-html="formattedExplanation"
                ></div>
              </div>

              <!-- Empty/Initial State -->
              <div
                v-else
                class="flex flex-col items-center justify-center py-8 gap-2 text-gray-400"
              >
                <Icon
                  name="streamline-flex:ai-scanner-robot-remix"
                  size="24"
                  class="opacity-50"
                />
                <span class="text-xs">Explanation will appear here</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps({
  result: {
    type: Object,
    default: null,
  },
  explanation: {
    type: String,
    default: "",
  },
  isExplanationLoading: {
    type: Boolean,
    default: false,
  },
  // We need to know if we should clear explanation when result changes
  // But actually the parent handles clearing explanation on run.
  // The parent also handles clearing explanation on input change.
  // Here we just display it.
});

const emit = defineEmits(["copy", "ask-humy", "clear-explanation"]);

const showExplanation = ref(false);
const isCopied = ref(false);

const handleCopy = () => {
  emit("copy", props.result);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 2000);
};

const formattedExplanation = computed(() => {
  if (!props.explanation) return "";
  let text = props.explanation;

  // Headers
  text = text.replace(
    /^### (.*$)/gim,
    '<h3 class="text-md font-bold text-gray-900 mt-4 mb-2">$1</h3>'
  );
  text = text.replace(
    /^## (.*$)/gim,
    '<h2 class="text-lg font-bold text-gray-900 mt-5 mb-3">$1</h2>'
  );

  // Bold
  text = text.replace(
    /\*\*(.*?)\*\*/g,
    "<strong class='text-gray-900 font-semibold'>$1</strong>"
  );

  // Italic
  text = text.replace(/\*(.*?)\*/g, "<em class='text-emerald-600'>$1</em>");

  // Code
  text = text.replace(
    /`(.*?)`/g,
    '<code class="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200">$1</code>'
  );

  // Lists - Bullet points
  text = text.replace(
    /^\s*[-•] (.*$)/gim,
    '<div class="flex gap-2 mb-2 ml-1"><span class="text-emerald-500 mt-1.5 text-[6px]">●</span><span class="flex-1">$1</span></div>'
  );

  // Lists - Numbered
  text = text.replace(
    /^\s*(\d+)\. (.*$)/gim,
    '<div class="flex gap-2 mb-2 ml-1"><span class="text-emerald-600 font-bold text-xs mt-0.5">$1.</span><span class="flex-1">$2</span></div>'
  );

  // Newlines to breaks
  text = text.replace(/\n/g, "<br />");
  text = text.replace(/(<br \/>){3,}/g, "<br /><br />");

  return text;
});

const toggleExplanation = () => {
  showExplanation.value = !showExplanation.value;
  if (
    showExplanation.value &&
    !props.explanation &&
    !props.isExplanationLoading
  ) {
    emit("ask-humy", props.result);
  }
};

// Watch for external clearing of explanation (e.g. when user types)
// If explanation becomes empty, we might want to hide the box or keep it open in "empty" state.
// In the original code:
// watch(code, () => {
//   if (props.explanation) emit("clear-explanation");
//   if (showExplanation.value) showExplanation.value = false;
// });
// This logic was in the parent (Editor.vue).
// We need to expose a way to close the explanation box from parent, OR
// watch props.explanation.
// If props.explanation becomes empty string, and we are showing it...
// The original code set showExplanation = false when code changed.
// So we should probably watch props.explanation? No, that's for the content.
// We can expose `showExplanation` via defineExpose or use a prop `showExplanationBox`.
// But simpler: The parent emits "clear-explanation" which clears the prop.
// If the prop is cleared, we show the empty state if showExplanation is true.
// But the original code ALSO set showExplanation = false.
// So we should probably listen to an event or watch a prop.
// Let's add a watcher on props.explanation to see if it's cleared?
// No, that doesn't tell us if we should close the box.
// Let's add `closeExplanation` to defineExpose.

defineExpose({
  closeExplanation: () => {
    showExplanation.value = false;
  },
});
</script>

<style scoped>
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Gradient Text Animation - One Time Only */
.gradient-text {
  background: linear-gradient(
    90deg,
    #10b981,
    #34d399,
    #6ee7b7,
    #a7f3d0,
    #10b981
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 3s ease-in-out forwards;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
