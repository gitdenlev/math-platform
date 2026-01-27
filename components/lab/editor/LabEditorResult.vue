<template>
  <div
    class="flex flex-col items-center p-4 min-h-full pb-32 pointer-events-none"
  >
    <div
      class="w-full max-w-3xl flex flex-col gap-4 mt-auto sm:mt-0 pointer-events-auto"
    >
      <!-- Result Display -->
      <Transition name="fade" mode="out-in">
        <div
          v-if="result"
          :key="resultKey"
          class="w-full group rounded-lg transition-all duration-200"
        >
          <!-- Edit Mode -->
          <div
            v-if="isEditing"
            class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4"
          >
            <input
              v-model="editValue"
              @keydown.enter="handleRecalculate"
              ref="editInputRef"
              type="text"
              class="w-full bg-transparent border-none outline-none text-base text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
              placeholder="..."
            />
            <div class="flex justify-end gap-2 mt-3">
              <button
                @click="isEditing = false"
                class="px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
              >
                Cancel
              </button>
              <button
                @click="handleRecalculate"
                class="px-3 py-1.5 text-xs bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded hover:opacity-90 transition-opacity"
              >
                Save
              </button>
            </div>
          </div>

          <!-- Main Result -->
          <div v-else-if="!result.error">
            <!-- Expression & Result Block -->
            <div class="px-2 py-2">
              <!-- Expression (Input) -->
              <div
                class="text-sm text-zinc-400 dark:text-zinc-500 mb-2 font-medium"
              >
                {{ result.expression }}
              </div>

              <!-- Result Value -->
              <div class="flex items-center gap-2">
                <div
                  class="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white break-all tabular-nums select-text"
                >
                  {{ displayedResult }}
                </div>
                <button
                  v-if="shouldShowFullValue"
                  @click="toggleFullValue"
                  class="relative group flex items-center justify-center w-6 h-6 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  title="Показати повне значення"
                >
                  <Icon
                    name="ph:dots-three-bold"
                    size="18"
                    class="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                  />
                  <!-- Tooltip -->
                  <div
                    class="absolute left-8 top-0 hidden group-hover:block z-50 px-3 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs rounded-md shadow-lg whitespace-nowrap pointer-events-none"
                  >
                    {{ fullResult }}
                    <div
                      class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-900 dark:bg-zinc-100 rotate-45"
                    ></div>
                  </div>
                </button>
              </div>
            </div>

            <!-- AI Explanation Section -->
            <Transition name="slide">
              <div
                v-if="showExplanation || isExplanationLoading"
                class="pt-4 px-2"
              >
                <!-- Loading State -->
                <div
                  v-if="isExplanationLoading"
                  class="flex items-center gap-3 py-2 text-zinc-500"
                >
                  <Icon
                    name="svg-spinners:90-ring-with-bg"
                    size="16"
                    class="text-zinc-900 dark:text-zinc-100 shrink-0"
                  />
                  <div class="h-5 relative overflow-hidden flex items-center">
                    <Transition name="msg" mode="out-in">
                      <span :key="currentLoadingMessage" class="text-sm block">
                        {{ currentLoadingMessage }}
                      </span>
                    </Transition>
                  </div>
                </div>

                <!-- Explanation Content -->
                <div
                  v-else-if="explanation"
                  class="prose prose-sm prose-zinc dark:prose-invert max-w-none"
                >
                  <div
                    class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed text-left whitespace-normal"
                    style="
                      word-break: normal;
                      overflow-wrap: break-word;
                      hyphens: none;
                    "
                    v-html="formattedExplanation"
                  />

                  <!-- Actions Row - показується тільки після AI відповіді -->
                  <div class="flex items-center gap-1 mt-4">
                    <button
                      @click="handleCopy"
                      class="flex items-center justify-center cursor-pointer p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                      title="Скопіювати"
                    >
                      <Icon
                        :name="isCopied ? 'ph:check' : 'ph:copy'"
                        size="16"
                      />
                    </button>

                    <button
                      @click="startEdit"
                      class="flex items-center justify-center cursor-pointer p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                      title="Редагувати"
                    >
                      <Icon name="ph:pencil-simple" size="16" />
                    </button>
                  </div>

                  <!-- Hints Section -->
                  <Transition name="fade-in">
                    <div
                      v-if="hints.length > 0"
                      class="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800"
                    >
                      <div class="flex flex-wrap gap-2">
                        <button
                          v-for="(hint, index) in hints"
                          :key="index"
                          @click="handleHintClick(hint)"
                          :disabled="loadingHintAnswer"
                          class="px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md transition-all hover:border-zinc-300 dark:hover:border-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {{ hint }}
                        </button>
                      </div>

                      <!-- Hint Answer -->
                      <Transition name="slide-down">
                        <div
                          v-if="hintAnswer"
                          class="mt-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800"
                        >
                          <div class="flex items-start gap-2">
                            <Icon
                              name="ph:lightbulb-fill"
                              size="16"
                              class="text-amber-500 mt-0.5 shrink-0"
                            />
                            <p
                              class="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed"
                            >
                              {{ hintAnswer }}
                            </p>
                          </div>
                        </div>
                      </Transition>

                      <!-- Loading Hint Answer -->
                      <Transition name="slide-down">
                        <div
                          v-if="loadingHintAnswer"
                          class="mt-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800"
                        >
                          <div class="flex items-center gap-2">
                            <Icon
                              name="svg-spinners:90-ring-with-bg"
                              size="14"
                              class="text-zinc-400"
                            />
                            <p class="text-xs text-zinc-500">Думаю...</p>
                          </div>
                        </div>
                      </Transition>
                    </div>
                  </Transition>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Error State -->
          <div
            v-else
            class="bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-4"
          >
            <div
              class="text-sm font-mono text-red-600 dark:text-red-400 break-all mb-2"
            >
              {{ result.result }}
            </div>
            <button
              @click="startEdit"
              class="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-300 underline underline-offset-2"
            >
              Fix expression
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onUnmounted } from "vue";
import DOMPurify from "isomorphic-dompurify";

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
});

const emit = defineEmits([
  "copy",
  "ask-humy",
  "clear-explanation",
  "recalculate",
]);

const showExplanation = ref(false);
const isEditing = ref(false);
const editValue = ref("");
const editInputRef = ref<HTMLInputElement | null>(null);
const isCopied = ref(false);
const resultKey = ref(0);
const showFullValue = ref(false);

// Hints state
const hints = ref<string[]>([]);
const hintAnswer = ref("");
const loadingHintAnswer = ref(false);
const loadingHints = ref(false);

// Обчислення для відображення результату
const displayedResult = computed(() => {
  if (!props.result || props.result.error) return "";

  const value = props.result.result;

  // Якщо користувач хоче побачити повне значення
  if (showFullValue.value) {
    return value;
  }

  // Перевіряємо, чи це число
  const numValue = parseFloat(value);
  if (!isNaN(numValue)) {
    // Округлюємо до 2 знаків після коми
    const rounded = Math.round(numValue * 100) / 100;
    return rounded.toString();
  }

  return value;
});

// Повне значення результату
const fullResult = computed(() => {
  if (!props.result || props.result.error) return "";
  return props.result.result;
});

// Чи потрібно показувати іконку для повного значення
const shouldShowFullValue = computed(() => {
  if (!props.result || props.result.error) return false;

  const value = props.result.result;
  const numValue = parseFloat(value);

  if (isNaN(numValue)) return false;

  // Показуємо іконку тільки якщо округлене значення відрізняється від повного
  const rounded = Math.round(numValue * 100) / 100;
  return rounded.toString() !== value;
});

// Функція для перемикання відображення повного значення
const toggleFullValue = () => {
  showFullValue.value = !showFullValue.value;
};

// Loading messages logic
const loadingMessages = [
  "Обробляю вираз",
  "Аналізую структуру",
  "Структурую дані",
  "Оптимізую розрахунок",
];
const currentLoadingMessage = ref(loadingMessages[0]);
let loadingInterval: NodeJS.Timeout | null = null;
let currentIndex = 0;

const startLoadingAnimation = () => {
  currentIndex = 0;
  currentLoadingMessage.value = loadingMessages[0];
  if (loadingInterval) clearInterval(loadingInterval);

  loadingInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % loadingMessages.length;
    currentLoadingMessage.value = loadingMessages[currentIndex];
  }, 2500);
};

const stopLoadingAnimation = () => {
  if (loadingInterval) clearInterval(loadingInterval);
  loadingInterval = null;
};

watch(
  () => props.isExplanationLoading,
  (isLoading) => {
    if (isLoading) {
      startLoadingAnimation();
    } else {
      stopLoadingAnimation();
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  stopLoadingAnimation();
});

// Generate a short, contextual description based on the expression
const resultDescription = computed(() => {
  if (!props.result || props.result.error) return "";

  const expr = (props.result.expression || "").toLowerCase();
  const result = props.result.result;

  // Detect expression type and generate description
  if (expr.includes(" to ") || expr.includes("->")) {
    return "Результат конвертації одиниць виміру";
  }
  if (/sin|cos|tan|asin|acos|atan/.test(expr)) {
    return "Тригонометричне обчислення";
  }
  if (/sqrt|root|pow|\^/.test(expr)) {
    return "Операція зі степенями та коренями";
  }
  if (/log|ln/.test(expr)) {
    return "Логарифмічне обчислення";
  }
  if (/pi|e\b|phi/.test(expr)) {
    return "Обчислення з математичними константами";
  }
  if (/\!/.test(expr)) {
    return "Факторіал числа";
  }
  if (/[+\-*/]/.test(expr) && /^\d/.test(expr)) {
    return "Арифметичний вираз";
  }
  if (/mean|median|std|sum/.test(expr)) {
    return "Статистичне обчислення";
  }

  return "Математичний результат";
});

const startEdit = async () => {
  if (props.result) {
    editValue.value = props.result.expression || "";
    isEditing.value = true;
    await nextTick();
    if (editInputRef.value) {
      editInputRef.value.focus();
    }
  }
};

const handleRecalculate = () => {
  if (editValue.value.trim()) {
    emit("recalculate", editValue.value);
    isEditing.value = false;
  }
};

// Функція для завантаження hints
const loadHints = async (expression: string) => {
  if (!expression || loadingHints.value) return;

  try {
    loadingHints.value = true;
    hints.value = [];
    hintAnswer.value = "";

    const response = await $fetch("/api/hints", {
      method: "POST",
      body: { expression },
    });

    if (response?.hints && Array.isArray(response.hints)) {
      hints.value = response.hints;
    }
  } catch (error) {
    console.error("Failed to load hints:", error);
    hints.value = [];
  } finally {
    loadingHints.value = false;
  }
};

// Функція для обробки кліку на hint
const handleHintClick = async (question: string) => {
  if (loadingHintAnswer.value) return;

  try {
    loadingHintAnswer.value = true;
    hintAnswer.value = "";

    const response = await $fetch("/api/hint-answer", {
      method: "POST",
      body: { question },
    });

    if (response?.answer) {
      hintAnswer.value = response.answer;
    }
  } catch (error) {
    console.error("Failed to get hint answer:", error);
    hintAnswer.value = "Вибачте, не вдалося отримати відповідь 😔";
  } finally {
    loadingHintAnswer.value = false;
  }
};

const handleCopy = () => {
  emit("copy", props.result);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 2000);
};

watch(
  () => props.result,
  (newResult) => {
    resultKey.value++;
    isEditing.value = false;
    showFullValue.value = false; // Скидаємо до округленого значення при новому результаті

    // Автоматично запитуємо Humy, якщо результат успішний
    if (newResult && !newResult.error) {
      showExplanation.value = true;
      console.log("LabEditorResult: Auto-asking humy with result", newResult);
      emit("ask-humy", { ...newResult });

      // Завантажуємо hints
      const expression = newResult.expression || "";
      if (expression) {
        loadHints(expression);
      }
    } else {
      showExplanation.value = false;
      hints.value = [];
      hintAnswer.value = "";
    }
  },
  { deep: true, immediate: true },
);

const formattedExplanation = computed(() => {
  if (!props.explanation) return "";
  let text = props.explanation;

  // Minimal formatting
  text = text.replace(
    /^### (.*$)/gim,
    '<h3 class="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-3 mb-1">$1</h3>',
  );
  text = text.replace(
    /\*\*(.*?)\*\*/g, // bold
    "<strong class='font-semibold text-zinc-900 dark:text-zinc-100'>$1</strong>",
  );
  text = text.replace(
    /`(.*?)`/g, // code
    '<code class="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-xs border border-zinc-200 dark:border-zinc-700">$1</code>',
  );

  text = text.replace(/\n/g, "<br />");

  // КРИТИЧНО: Санітизуємо HTML перед рендерингом для захисту від XSS
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: ["h3", "strong", "code", "br", "em", "p"],
    ALLOWED_ATTR: ["class"],
  });
});

defineExpose({
  closeExplanation: () => {
    showExplanation.value = false;
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 500px;
}

/* Loading Message Animation */
.msg-enter-active,
.msg-leave-active {
  transition: all 0.3s ease;
}

.msg-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.msg-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Hints Animations */
.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 0.4s ease;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  max-height: 200px;
  margin-top: 0.75rem;
}
</style>
