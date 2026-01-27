<template>
  <div class="w-full pb-6 px-4">
    <div class="max-w-3xl mx-auto relative group">
      <!-- Suggestions (Floating above) -->
      <!-- Suggestions (Minimal & Optimized) -->
      <!-- Main Input Container -->
      <div
        class="relative flex items-center bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 dark:hover:border-zinc-600 rounded-md transition-all duration-200 ease-out"
      >
        <!-- Icon -->
        <div class="pl-4 pr-2 flex items-center">
          <Icon name="lucide:pencil-line" size="18" />
        </div>

        <!-- Input Field -->
        <input
          ref="inputRef"
          :value="modelValue"
          @input="handleInput"
          @keydown="handleKeydown"
          @focus="isFocused = true"
          @blur="checkBlur"
          type="text"
          class="flex-1 bg-transparent border-none outline-none ring-0 text-base sm:text-lg text-zinc-900 dark:text-white placeholder-zinc-400 h-14 min-w-0 font-medium"
          placeholder="Виконуй обчислення"
          autocomplete="off"
          spellcheck="false"
        />

        <!-- Actions (Right Side) -->
        <div class="pr-2 flex items-center gap-1">
          <!-- Loading Indicator -->
          <div v-if="isRunning" class="mr-2">
            <Icon
              name="svg-spinners:ring-resize"
              size="20"
              class="text-zinc-400"
            />
          </div>

          <!-- Run Button -->
          <button
            @click="handleRun"
            :disabled="!modelValue.trim() || isRunning"
            class="h-10 w-10 rounded-md flex items-center justify-center transition-all duration-200"
            :class="
              modelValue.trim()
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-110 shadow-md'
                : 'bg-transparent text-zinc-300 dark:text-zinc-600 cursor-not-allowed'
            "
            title="Запустити обчислення (Enter)"
          >
            <Icon name="ph:arrow-up-bold" size="20" />
          </button>
        </div>
      </div>

      <!-- Footer Hint -->
      <div
        class="text-center mt-3 transition-opacity duration-300"
        :class="isFocused ? 'opacity-100' : 'opacity-0'"
      >
        <p class="text-xs text-zinc-400 dark:text-zinc-500">
          Натисніть <kbd class="font-sans font-semibold">Enter</kbd> для
          обчислення
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
  isRunning: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "run"]);

const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);
const isBlinking = ref(false);

function handleInput(e: Event) {
  const val = (e.target as HTMLInputElement).value;
  emit("update:modelValue", val);
}

function checkBlur() {
  setTimeout(() => {
    isFocused.value = false;
  }, 200);
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Enter" && !e.shiftKey) {
    handleRun();
  }
  if (e.key === "Escape") {
    if (inputRef.value) inputRef.value.blur();
  }
}

function handleRun() {
  if (props.isRunning || !props.modelValue.trim()) return;
  emit("run", props.modelValue);
}

function focus() {
  if (inputRef.value) {
    inputRef.value.focus();
  }
}

defineExpose({
  focus,
});

watch(
  () => props.isRunning,
  (newVal, oldVal) => {
    if (oldVal === true && newVal === false) {
      // Calculation finished
      isBlinking.value = true;
      setTimeout(() => {
        isBlinking.value = false;
      }, 300);
    }
  },
);

onMounted(() => {
  if (inputRef.value) inputRef.value.focus();
});
</script>

<style scoped>
/* No specific styles needed, using Tailwind */
</style>
