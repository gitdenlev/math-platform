<template>
  <!-- Input Area (Footer) -->
  <div
    class="w-full px-3 sm:px-6 pb-4 sm:pb-8 pt-4 flex justify-center z-20 sm:relative fixed bottom-0 left-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sm:bg-transparent sm:dark:bg-transparent sm:backdrop-blur-none border-t border-gray-200 dark:border-gray-800 sm:border-t-0"
  >
    <div class="w-full max-w-3xl relative">
      <!-- Input Bar -->
      <div
        class="w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 rounded-[2rem] shadow-xl shadow-emerald-900/5 transition-all duration-300 flex items-center p-2 pl-4 gap-3"
        :class="{
          'border-emerald-500 ring-4 ring-emerald-500/10': isRunning,
        }"
      >
        <!-- Leading Icon -->
        <div
          class="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
        >
          <Icon name="mynaui:math" size="18" />
        </div>
        <!-- Suggestions Dropdown -->
        <div
          v-if="suggestions.length > 0"
          class="absolute bottom-full left-0 w-full mb-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden z-30 animate-slide-up hidden sm:block"
        >
          <div
            class="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center"
          >
            <span
              class="text-xs font-semibold text-gray-500 tracking-wider flex items-center gap-2"
            >
              <Icon name="ph:sparkle-fill" class="text-emerald-500" />
              Suggestions
            </span>
            <span
              v-if="isSuggesting"
              class="text-xs text-emerald-500 animate-pulse"
              >Thinking...</span
            >
          </div>
          <div class="max-h-60 overflow-y-auto custom-scrollbar p-1">
            <button
              v-for="(suggestion, index) in suggestions"
              :key="index"
              @click="selectSuggestion(suggestion)"
              class="w-full text-left px-4 py-3 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200 flex items-center justify-between group rounded-lg"
              :class="{
                'bg-emerald-50 dark:bg-emerald-900/20':
                  index === suggestionIndex,
              }"
            >
              <span
                class="text-sm font-medium text-gray-700 dark:text-gray-200 font-mono group-hover:text-emerald-700 dark:group-hover:text-emerald-400"
              >
                {{ suggestion }}
              </span>
              <span
                class="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Tab to select
              </span>
            </button>
          </div>
        </div>

        <!-- Mobile Suggestions Dropdown (Fixed) -->
        <div
          v-if="suggestions.length > 0"
          class="fixed bottom-[80px] left-2 right-2 mx-auto max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden z-50 animate-slide-up sm:hidden border border-gray-100 dark:border-gray-700"
        >
          <div
            class="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center"
          >
            <span
              class="text-xs font-semibold text-gray-500 tracking-wider flex items-center gap-2"
            >
              <Icon name="ph:sparkle-fill" class="text-emerald-500" />
              Suggestions
            </span>
            <span
              v-if="isSuggesting"
              class="text-xs text-emerald-500 animate-pulse"
              >Thinking...</span
            >
          </div>
          <div class="max-h-60 overflow-y-auto custom-scrollbar p-1">
            <button
              v-for="(suggestion, index) in suggestions"
              :key="index"
              @click="selectSuggestion(suggestion)"
              class="w-full text-left px-4 py-3 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200 flex items-center justify-between group rounded-lg"
              :class="{
                'bg-emerald-50 dark:bg-emerald-900/20':
                  index === suggestionIndex,
              }"
            >
              <span
                class="text-sm font-medium text-gray-700 dark:text-gray-200 font-mono group-hover:text-emerald-700 dark:group-hover:text-emerald-400"
              >
                {{ suggestion }}
              </span>
              <span
                class="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Tap to select
              </span>
            </button>
          </div>
        </div>

        <!-- Input Field -->
        <input
          ref="inputRef"
          :value="modelValue"
          @input="handleInput"
          @keydown="handleKeydown"
          type="text"
          class="flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400/80 text-base sm:text-lg focus:outline-none font-sans font-medium tracking-tight h-10 min-w-0"
          spellcheck="false"
          placeholder="Calculate..."
        />

        <!-- Right Actions -->
        <div class="flex items-center gap-1 pr-1">
          <!-- Unified Tools Button -->
          <div class="relative">
            <button
              @click="toggleDropdown('mobile-tools')"
              :class="[
                'cursor-pointer flex items-center justify-center w-8 h-8 rounded-lg transition-colors',
                activeDropdown === 'mobile-tools'
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50',
              ]"
              title="Tools"
            >
              <Icon name="ph:squares-four-bold" size="18" />
            </button>

            <!-- Unified Tools Dropdown -->
            <div
              v-if="activeDropdown === 'mobile-tools'"
              class="fixed bottom-[80px] left-2 right-2 mx-auto max-w-3xl sm:absolute sm:bottom-full sm:right-0 sm:left-auto sm:mb-5 sm:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 animate-fade-in origin-bottom sm:origin-bottom-right"
            >
              <!-- Tabs -->
              <div
                class="flex border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-1 gap-1 overflow-x-auto"
              >
                <button
                  v-for="tab in mobileTabs"
                  :key="tab.id"
                  @click="currentMobileTab = tab.id"
                  class="flex-1 py-2 px-1 text-[10px] font-medium rounded-lg transition-colors flex flex-col items-center gap-1"
                  :class="
                    currentMobileTab === tab.id
                      ? 'bg-white dark:bg-emerald-100 text-emerald-600 shadow-sm'
                      : 'text-gray-500 hover:bg-emerald-100 hover:text-emerald-600'
                  "
                >
                  <Icon :name="tab.icon" size="16" />
                  {{ tab.label }}
                </button>
              </div>

              <!-- Content Area -->
              <div class="max-h-60 overflow-y-auto custom-scrollbar">
                <!-- Units Content -->
                <div v-if="currentMobileTab === 'units'" class="p-1">
                  <div
                    v-for="category in unitCategories"
                    :key="category.name"
                    class="mb-2 last:mb-0"
                  >
                    <div
                      class="px-3 py-1.5 flex items-center gap-2 text-xs font-medium text-gray-400"
                    >
                      <Icon :name="category.icon" size="12" />
                      {{ category.name }}
                    </div>
                    <button
                      v-for="item in category.items"
                      :key="item.name"
                      @click="insertText(item.value)"
                      class="w-full text-left px-3 py-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-gray-700 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-lg transition-colors flex items-center justify-between group"
                    >
                      <span class="text-sm">{{ item.name }}</span>
                    </button>
                  </div>
                </div>

                <!-- Constants Content -->
                <div v-if="currentMobileTab === 'constants'">
                  <button
                    v-for="constant in constants"
                    :key="constant.name"
                    @click="insertText(constant.value)"
                    class="w-full text-left px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors flex items-center justify-between group"
                  >
                    <div class="flex flex-col">
                      <span
                        class="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400"
                        >{{ constant.name }}</span
                      >
                      <span
                        class="text-xs font-mono text-gray-400 dark:text-gray-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                        >{{ constant.value }}</span
                      >
                    </div>
                    <span
                      class="text-lg font-serif text-gray-300 dark:text-gray-600 group-hover:text-emerald-400"
                      >{{ constant.symbol }}</span
                    >
                  </button>
                </div>

                <!-- Functions Content -->
                <div v-if="currentMobileTab === 'functions'" class="p-1">
                  <div
                    v-for="category in functionCategories"
                    :key="category.name"
                    class="mb-2 last:mb-0"
                  >
                    <div
                      class="px-3 py-1.5 flex items-center gap-2 text-xs font-medium text-gray-400"
                    >
                      <Icon :name="category.icon" size="12" />
                      {{ category.name }}
                    </div>
                    <div class="grid grid-cols-2 gap-1 px-1">
                      <button
                        v-for="item in category.items"
                        :key="item.name"
                        @click="insertText(item.value)"
                        class="text-left px-3 py-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-gray-700 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-lg transition-colors text-sm"
                      >
                        {{ item.name }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Formulas Content -->
                <div v-if="currentMobileTab === 'formulas'">
                  <button
                    v-for="formula in formulas"
                    :key="formula.name"
                    @click="insertText(formula.value)"
                    class="w-full text-left px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors flex flex-col gap-1 group"
                  >
                    <span
                      class="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400"
                      >{{ formula.name }}</span
                    >
                    <span
                      class="text-xs font-mono text-gray-400 dark:text-gray-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                      >{{ formula.value }}</span
                    >
                  </button>
                </div>
              </div>
            </div>

            <div
              v-if="activeDropdown === 'mobile-tools'"
              @click="activeDropdown = null"
              class="fixed inset-0 z-40"
            ></div>
          </div>

          <!-- Settings (Formats & Precision) -->
          <div class="relative">
            <button
              @click="toggleDropdown('settings')"
              class="flex items-center justify-center w-8 h-8 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              title="Settings"
              :class="[
                'cursor-pointer flex items-center justify-center w-8 h-8 rounded-lg transition-colors',
                activeDropdown === 'settings'
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50',
              ]"
            >
              <Icon name="ph:sliders-horizontal-bold" size="18" />
            </button>

            <div
              v-if="activeDropdown === 'settings'"
              class="fixed bottom-[80px] left-2 right-2 mx-auto max-w-3xl sm:absolute sm:bottom-full sm:right-0 sm:left-auto sm:mb-5 sm:w-64 sm:max-w-xs bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 animate-fade-in origin-bottom sm:origin-bottom-right"
            >
              <!-- Suggestion Mode -->
              <div
                class="w-full p-3 border-b border-gray-100 dark:border-gray-700"
              >
                <div class="flex items-center justify-between">
                  <span
                    class="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider"
                    >Suggestion Mode</span
                  >
                  <button
                    @click="isSuggestionsEnabled = !isSuggestionsEnabled"
                    class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-offset-2 cursor-pointer"
                    :class="
                      isSuggestionsEnabled
                        ? 'bg-emerald-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    "
                  >
                    <span
                      class="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform"
                      :class="
                        isSuggestionsEnabled
                          ? 'translate-x-4.5'
                          : 'translate-x-1'
                      "
                    />
                  </button>
                </div>
              </div>

              <!-- Number Format -->
              <div class="p-3 border-b border-gray-100 dark:border-gray-700">
                <span
                  class="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider block mb-2"
                  >Number Format</span
                >
                <div class="grid grid-cols-2 gap-1">
                  <button
                    v-for="option in formatOptions"
                    :key="option.value"
                    @click="selectedFormat = option.value"
                    class="px-2 py-1.5 rounded-lg text-xs font-medium transition-colors text-left"
                    :class="
                      selectedFormat === option.value
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                    "
                  >
                    {{ option.label }}
                  </button>
                </div>
              </div>

              <!-- Precision -->
              <div class="p-3">
                <span
                  class="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider block mb-2"
                  >Precision</span
                >
                <div class="grid grid-cols-2 gap-1">
                  <button
                    v-for="option in precisionOptions"
                    :key="option.value"
                    @click="selectedPrecision = option.value"
                    class="px-2 py-1.5 rounded-lg text-xs font-medium transition-colors text-left"
                    :class="
                      selectedPrecision === option.value
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                    "
                  >
                    {{ option.label }}
                  </button>
                </div>
              </div>
            </div>

            <div
              v-if="activeDropdown === 'settings'"
              @click="activeDropdown = null"
              class="fixed inset-0 z-40"
            ></div>
          </div>

          <button
            @click="handleRun"
            :disabled="isRunning || !modelValue.trim()"
            class="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200"
            :class="
              modelValue.trim()
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
            "
          >
            <Icon v-if="!isRunning" name="ph:arrow-up-bold" size="20" />
            <Icon v-else name="svg-spinners:ring-resize" size="20" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  formulas,
  functionCategories,
  unitCategories,
  constants,
  formatOptions,
  precisionOptions,
} from "~/constants/lab/editorData";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  isRunning: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "run"]);

const inputRef = ref<HTMLInputElement | null>(null);
const activeDropdown = ref<string | null>(null);
const selectedFormat = ref("decimal");
const selectedPrecision = ref<string | number>("full");
const isSuggestionsEnabled = ref(false);

// Mobile Tools State
const mobileTabs = [
  { id: "units", label: "Units", icon: "ph:ruler-bold" },
  { id: "constants", label: "Const", icon: "ph:pi-bold" },
  { id: "functions", label: "Func", icon: "ph:function-bold" },
  { id: "formulas", label: "Formulas", icon: "pajamas:formula" },
];
const currentMobileTab = ref("units");

// Suggestions State
const suggestions = ref<string[]>([]);
const isSuggesting = ref(false);
const suggestionIndex = ref(0);
let debounceTimer: NodeJS.Timeout;

const handleInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;
  emit("update:modelValue", val);

  // Reset suggestions if input is empty
  if (!val.trim()) {
    suggestions.value = [];
    return;
  }

  // Debounce API call
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    // Don't fetch if input is very short (unless it's a known function start)
    if (val.trim().length < 2 || !isSuggestionsEnabled.value) return;

    isSuggesting.value = true;
    try {
      const { suggestions: newSuggestions } = await $fetch("/api/suggest", {
        method: "POST",
        body: { input: val },
      });
      suggestions.value = newSuggestions || [];
      suggestionIndex.value = 0;
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    } finally {
      isSuggesting.value = false;
    }
  }, 400);
};

const selectSuggestion = (suggestion: string) => {
  emit("update:modelValue", suggestion);
  suggestions.value = [];
  if (inputRef.value) {
    inputRef.value.focus();
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  // Navigation for suggestions
  if (suggestions.value.length > 0) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      suggestionIndex.value =
        (suggestionIndex.value - 1 + suggestions.value.length) %
        suggestions.value.length;
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      suggestionIndex.value =
        (suggestionIndex.value + 1) % suggestions.value.length;
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      selectSuggestion(suggestions.value[suggestionIndex.value]);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      selectSuggestion(suggestions.value[suggestionIndex.value]);
      return;
    }
    if (e.key === "Escape") {
      suggestions.value = [];
      return;
    }
  }

  // Default Enter behavior (Run)
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleRun();
  }
};

const toggleDropdown = (name: string) => {
  if (activeDropdown.value === name) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = name;
  }
};

const insertText = (text: string) => {
  emit("update:modelValue", props.modelValue + text);
  activeDropdown.value = null;
  if (inputRef.value) {
    inputRef.value.focus();
  }
};

const handleRun = () => {
  if (props.isRunning || !props.modelValue.trim()) return;
  suggestions.value = []; // Clear suggestions on run
  emit("run", props.modelValue);
};

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
});

defineExpose({
  focus: () => inputRef.value?.focus(),
});
</script>

<style scoped>
/* Smooth transitions */
button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

input::placeholder {
  color: #9ca3af;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
