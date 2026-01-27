<template>
  <div
    class="flex flex-col h-full relative bg-white dark:bg-[#0c0c0c] overflow-hidden"
  >
    <ClientOnly>
      <template #fallback>
        <div class="flex items-center justify-center h-full">
          <Icon
            name="svg-spinners:ring-resize"
            size="40"
            class="text-zinc-300"
          />
        </div>
      </template>

      <!-- Top Header -->
      <header
        class="flex-none flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 z-20 relative bg-white dark:bg-[#0c0c0c]"
      >
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/"
            class="h-9 w-9 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-all"
          >
            <Icon name="ph:caret-left-bold" size="18" />
          </NuxtLink>
          <div>
            <h1 class="text-lg font-bold text-zinc-900 dark:text-white">
              {{ space?.title || "Завантаження..." }}
            </h1>
            <p class="text-xs text-zinc-500 dark:text-zinc-400">
              Редактор коду MathJS
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            @click="showToolsSidebar = !showToolsSidebar"
            :class="
              showToolsSidebar
                ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
            "
            class="h-9 px-3 rounded-md border text-sm font-medium flex items-center gap-2 transition-all hover:border-emerald-300 dark:hover:border-emerald-500/40"
            title="Інструменти"
          >
            <Icon name="ph:toolbox" size="16" />
          </button>
          <button
            @click="runCode"
            class="h-9 px-4 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium flex items-center gap-2 transition-all"
          >
            <Icon name="ph:play-fill" size="16" />
            Запустити
          </button>
        </div>
      </header>

      <!-- Main Content (Without Left Sidebar) -->
      <div class="flex-1 flex overflow-hidden">
        <div class="flex-1 flex flex-col overflow-hidden">
          <!-- Code Editor with relative positioning for hint button -->
          <div
            class="flex-1 relative overflow-hidden bg-white dark:bg-[#0c0c0c]"
          >
            <textarea
              ref="codeEditor"
              v-model="codeInput"
              @mouseup="handleTextSelection"
              @keyup="handleTextSelection"
              class="w-full h-full p-6 text-base text-zinc-900 dark:text-zinc-100 bg-transparent resize-none focus:outline-none"
              placeholder="Розпочніть розрахунки"
              spellcheck="false"
            ></textarea>

            <!-- Hints Button (Bottom Left) -->
            <button
              @click="showHintsMenu = true"
              class="absolute bottom-6 left-6 h-10 w-10 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg flex items-center justify-center transition-all hover:scale-105"
              title="Відкрити підказки"
            >
              <Icon name="ph:grid-four" size="20" />
            </button>
          </div>

          <!-- Results Panel -->
          <div
            class="h-64 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 overflow-y-auto p-6"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-bold text-zinc-900 dark:text-white">
                Результати виконання
              </h3>
              <button
                v-if="results.length > 0"
                @click="clearResults"
                class="text-xs text-zinc-500 hover:text-red-500 transition-colors"
              >
                Очистити
              </button>
            </div>

            <div v-if="results.length === 0" class="text-center py-8">
              <Icon
                name="ph:code-bold"
                size="32"
                class="text-zinc-300 dark:text-zinc-700 mb-2 mx-auto"
              />
              <p class="text-sm text-zinc-400">
                Запустіть код, щоб побачити результати
              </p>
            </div>

            <div v-else class="space-y-3">
              <div
                v-for="(result, idx) in results"
                :key="idx"
                class="p-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
              >
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <div class="text-xs text-zinc-500 mb-1 font-mono">
                      {{ result.expression }}
                    </div>
                    <div
                      class="text-base font-bold"
                      :class="
                        result.error
                          ? 'text-red-500'
                          : 'text-emerald-600 dark:text-emerald-400'
                      "
                    >
                      {{
                        result.error
                          ? "Помилка: " + result.error
                          : result.result
                      }}
                    </div>
                  </div>
                  <Icon
                    :name="
                      result.error ? 'ph:x-circle-fill' : 'ph:check-circle-fill'
                    "
                    size="20"
                    :class="result.error ? 'text-red-500' : 'text-emerald-500'"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tools Sidebar -->
        <Transition name="slide-left">
          <ToolsSidebar
            v-if="showToolsSidebar"
            @close="showToolsSidebar = false"
            @insert-formula="insertCode"
          />
        </Transition>
      </div>

      <!-- Code Hints Menu -->
      <CodeHintsMenu v-model="showHintsMenu" @insert-code="insertCode" />

      <!-- Selection Context Menu -->
      <CodeSelectionMenu
        :selected-text="selectedText"
        :position="selectionMenuPosition"
        :visible="showSelectionMenu"
        @copy="handleCopy"
        @analyze-with-ai="handleAnalyzeWithAI"
        @close="showSelectionMenu = false"
      />

      <!-- Code Analysis Modal -->
      <CodeAnalysisModal v-model="showAnalysisModal" :code="selectedText" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useSpacesStore } from "~/stores/spaces";
import { create, all } from "mathjs";

const route = useRoute();
const store = useSpacesStore();
const spaceId = route.params.id as string;

const space = computed(() => store.getSpaceById(spaceId));
const codeInput = ref("");
const codeEditor = ref<HTMLTextAreaElement | null>(null);
const results = ref<
  Array<{ expression: string; result?: string; error?: string }>
>([]);

const math = create(all);

// Hints Menu
const showHintsMenu = ref(false);
const showToolsSidebar = ref(false);

// Selection Menu
const showSelectionMenu = ref(false);
const selectedText = ref("");
const selectionMenuPosition = ref({ x: 0, y: 0 });

// Analysis Modal
const showAnalysisModal = ref(false);

function insertCode(code: string) {
  const textarea = codeEditor.value;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = codeInput.value;

  codeInput.value = text.substring(0, start) + code + text.substring(end);

  nextTick(() => {
    textarea.focus();
    const newPos = start + code.length;
    textarea.setSelectionRange(newPos, newPos);
  });
}

function handleTextSelection(event: MouseEvent | KeyboardEvent) {
  const textarea = codeEditor.value;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = codeInput.value.substring(start, end).trim();

  if (text.length > 0) {
    selectedText.value = text;

    // Calculate position for context menu
    if (event instanceof MouseEvent) {
      selectionMenuPosition.value = {
        x: event.clientX,
        y: event.clientY + 10,
      };
      showSelectionMenu.value = true;
    }
  } else {
    showSelectionMenu.value = false;
  }
}

function handleCopy() {
  // Copy handled by component
}

function handleAnalyzeWithAI() {
  showAnalysisModal.value = true;
}

function runCode() {
  if (!codeInput.value.trim()) return;

  const lines = codeInput.value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("//"));

  results.value = [];

  for (const line of lines) {
    try {
      const result = math.evaluate(line);
      results.value.push({
        expression: line,
        result: String(result),
      });

      store.addExpression(spaceId, line);
    } catch (error: any) {
      results.value.push({
        expression: line,
        error: error.message || "Невідома помилка",
      });
    }
  }
}

function clearResults() {
  results.value = [];
}
</script>

<style scoped>
textarea {
  tab-size: 2;
}

textarea::placeholder {
  color: rgb(161 161 170);
}

.dark textarea::placeholder {
  color: rgb(113 113 122);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
