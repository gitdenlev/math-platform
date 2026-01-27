<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  code: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const isAnalyzing = ref(false);
const analysis = ref("");
const error = ref("");

async function analyzeCode() {
  isAnalyzing.value = true;
  error.value = "";
  analysis.value = "";

  try {
    const response = await $fetch("/api/analyze-code", {
      method: "POST",
      body: { code: props.code },
    });

    analysis.value = response.analysis;
  } catch (err: any) {
    error.value = err.message || "Помилка аналізу коду";
  } finally {
    isAnalyzing.value = false;
  }
}

function close() {
  emit("update:modelValue", false);
  analysis.value = "";
  error.value = "";
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      analyzeCode();
    }
  }
);
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
        @click.self="close"
      >
        <!-- Modal -->
        <div
          class="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-2xl overflow-hidden"
          @click.stop
        >
          <!-- Header -->
          <div
            class="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800"
          >
            <div class="flex items-center gap-3">
              <Icon name="ph:sparkle" size="24" class="text-emerald-500" />
              <h2 class="text-lg font-bold text-zinc-900 dark:text-white">
                AI Аналіз Коду
              </h2>
            </div>
            <button
              @click="close"
              class="h-8 w-8 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <Icon name="ph:x" size="20" />
            </button>
          </div>

          <!-- Content -->
          <div class="p-6 max-h-[600px] overflow-y-auto">
            <!-- Code Preview -->
            <div class="mb-6">
              <h3
                class="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Код для аналізу:
              </h3>
              <div
                class="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-md border border-zinc-200 dark:border-zinc-800"
              >
                <pre
                  class="text-sm font-mono text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap"
                  >{{ code }}</pre
                >
              </div>
            </div>

            <!-- Loading State -->
            <div
              v-if="isAnalyzing"
              class="flex flex-col items-center justify-center py-12"
            >
              <Icon
                name="svg-spinners:ring-resize"
                size="48"
                class="text-emerald-500 mb-4"
              />
              <p class="text-sm text-zinc-500 dark:text-zinc-400">
                AI аналізує ваш код...
              </p>
            </div>

            <!-- Error State -->
            <div
              v-else-if="error"
              class="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-md"
            >
              <div class="flex items-start gap-3">
                <Icon
                  name="ph:warning-circle"
                  size="20"
                  class="text-red-500 mt-0.5"
                />
                <div>
                  <h4
                    class="text-sm font-semibold text-red-900 dark:text-red-400 mb-1"
                  >
                    Помилка
                  </h4>
                  <p class="text-sm text-red-700 dark:text-red-300">
                    {{ error }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Analysis Result -->
            <div v-else-if="analysis" class="space-y-4">
              <h3
                class="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Результат аналізу:
              </h3>
              <div class="prose prose-sm dark:prose-invert max-w-none">
                <div
                  class="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-md"
                >
                  <p
                    class="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap"
                  >
                    {{ analysis }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
          >
            <button
              @click="close"
              class="px-4 py-2 rounded-md text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              Закрити
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
