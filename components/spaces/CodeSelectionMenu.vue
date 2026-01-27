<script setup lang="ts">
const props = defineProps<{
  selectedText: string;
  position: { x: number; y: number };
  visible: boolean;
}>();

const emit = defineEmits<{
  copy: [];
  analyzeWithAI: [];
  close: [];
}>();

const menuRef = ref<HTMLElement | null>(null);

// Adjust menu position to stay within viewport
const adjustedPosition = computed(() => {
  if (!menuRef.value) return props.position;

  const rect = menuRef.value.getBoundingClientRect();
  const x = Math.min(props.position.x, window.innerWidth - rect.width - 10);
  const y = Math.min(props.position.y, window.innerHeight - rect.height - 10);

  return { x: Math.max(10, x), y: Math.max(10, y) };
});

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(props.selectedText);
    // TODO: можна додати toast notification
    emit("copy");
    emit("close");
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}

function handleAnalyze() {
  emit("analyzeWithAI");
  emit("close");
}

// Close on click outside
onClickOutside(menuRef, () => {
  emit("close");
});
</script>

<template>
  <Teleport to="body">
    <Transition name="fade-scale">
      <div
        v-if="visible && selectedText"
        ref="menuRef"
        class="fixed z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-xl overflow-hidden min-w-[200px]"
        :style="{
          left: `${adjustedPosition.x}px`,
          top: `${adjustedPosition.y}px`,
        }"
      >
        <!-- Menu Items -->
        <div class="py-1">
          <button
            @click="handleCopy"
            class="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Icon name="ph:copy" size="18" class="text-zinc-500" />
            <span>Скопіювати</span>
            <span class="ml-auto text-xs text-zinc-400">⌘C</span>
          </button>

          <div class="h-px bg-zinc-200 dark:bg-zinc-800 my-1"></div>

          <button
            @click="handleAnalyze"
            class="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Icon name="ph:sparkle" size="18" class="text-emerald-500" />
            <span>Проаналізувати з AI</span>
          </button>

          <button
            class="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            @click="emit('close')"
          >
            <Icon name="ph:magnifying-glass" size="18" class="text-zinc-500" />
            <span>Пошук в документації</span>
          </button>
        </div>

        <!-- Selected Text Preview -->
        <div
          class="border-t border-zinc-200 dark:border-zinc-800 px-4 py-2 bg-zinc-50 dark:bg-zinc-900/50"
        >
          <p
            class="text-xs text-zinc-500 dark:text-zinc-400 font-mono truncate"
          >
            "{{ selectedText }}"
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.15s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-5px);
}
</style>
