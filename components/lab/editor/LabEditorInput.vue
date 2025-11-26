<template>
  <!-- Input Area (Footer) -->
  <div class="w-full px-3 sm:px-6 pb-6 sm:pb-8 pt-4 flex justify-center z-20">
    <div class="w-full max-w-3xl relative">
      <!-- Input Bar -->
      <div
        class="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-500 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 rounded-[24px] sm:rounded-[32px] shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 transition-all duration-300 flex items-center p-2 pl-3 sm:pl-4 gap-2"
        :class="{
          'border-emerald-500 ring-4 ring-emerald-500/10': isRunning,
        }"
      >
        <!-- Input Field -->
        <input
          ref="inputRef"
          :value="modelValue"
          @input="
            $emit(
              'update:modelValue',
              ($event.target as HTMLInputElement).value
            )
          "
          @keydown.enter.prevent="handleRun"
          type="text"
          class="flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm sm:text-base focus:outline-none font-sans h-10 min-w-0"
          spellcheck="false"
          placeholder="Enter expression..."
        />

        <!-- Right Actions -->
        <div class="flex items-center gap-1 pr-1">
          <!-- Units Converter -->
          <div class="relative">
            <button
              @click="toggleDropdown('units')"
              class="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
              title="Units Converter"
            >
              <Icon name="ph:ruler-bold" size="18" />
            </button>

            <div
              v-if="activeDropdown === 'units'"
              class="absolute bottom-full right-0 mb-5 w-[90vw] sm:w-64 max-w-xs bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 animate-fade-in origin-bottom-right"
            >
              <div class="p-2 bg-gray-50 border-b border-gray-100">
                <span class="text-xs font-semibold text-gray-500 tracking-wider"
                  >Units Converter</span
                >
              </div>
              <div class="max-h-60 overflow-y-auto custom-scrollbar p-1">
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
                    class="w-full text-left px-3 py-1.5 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-lg transition-colors flex items-center justify-between group"
                  >
                    <span class="text-sm">{{ item.name }}</span>
                    <Icon
                      name="ph:arrow-right-bold"
                      class="opacity-0 group-hover:opacity-100 text-emerald-400 text-xs"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div
              v-if="activeDropdown === 'units'"
              @click="activeDropdown = null"
              class="fixed inset-0 z-40"
            ></div>
          </div>

          <!-- Constants Library -->
          <div class="relative">
            <button
              @click="toggleDropdown('constants')"
              class="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
              title="Constants"
            >
              <Icon name="ph:pi-bold" size="18" />
            </button>

            <div
              v-if="activeDropdown === 'constants'"
              class="absolute bottom-full right-0 mb-5 w-[90vw] sm:w-64 max-w-xs bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 animate-fade-in origin-bottom-right"
            >
              <div class="p-2 bg-gray-50 border-b border-gray-100">
                <span
                  class="text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >Constants</span
                >
              </div>
              <div class="max-h-60 overflow-y-auto custom-scrollbar">
                <button
                  v-for="constant in constants"
                  :key="constant.name"
                  @click="insertText(constant.value)"
                  class="w-full text-left px-4 py-2.5 hover:bg-emerald-50 transition-colors flex items-center justify-between group"
                >
                  <div class="flex flex-col">
                    <span
                      class="text-sm font-medium text-gray-700 group-hover:text-emerald-700"
                      >{{ constant.name }}</span
                    >
                    <span
                      class="text-xs font-mono text-gray-400 group-hover:text-emerald-600"
                      >{{ constant.value }}</span
                    >
                  </div>
                  <span
                    class="text-lg font-serif text-gray-300 group-hover:text-emerald-400"
                    >{{ constant.symbol }}</span
                  >
                </button>
              </div>
            </div>

            <div
              v-if="activeDropdown === 'constants'"
              @click="activeDropdown = null"
              class="fixed inset-0 z-40"
            ></div>
          </div>

          <!-- Functions Library -->
          <div class="relative">
            <button
              @click="toggleDropdown('functions')"
              class="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
              title="Functions"
            >
              <Icon name="ph:function-bold" size="18" />
            </button>

            <div
              v-if="activeDropdown === 'functions'"
              class="absolute bottom-full right-0 mb-5 w-[90vw] sm:w-64 max-w-xs bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 animate-fade-in origin-bottom-right"
            >
              <div class="p-2 bg-gray-50 border-b border-gray-100">
                <span
                  class="text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >Functions</span
                >
              </div>
              <div class="max-h-60 overflow-y-auto custom-scrollbar p-1">
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
                      class="text-left px-3 py-1.5 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-lg transition-colors text-sm"
                    >
                      {{ item.name }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="activeDropdown === 'functions'"
              @click="activeDropdown = null"
              class="fixed inset-0 z-40"
            ></div>
          </div>

          <!-- Formulas Dropdown Trigger -->
          <div class="relative">
            <button
              @click="toggleDropdown('formulas')"
              class="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
              title="Insert Formula"
            >
              <Icon name="pajamas:formula" size="18" />
            </button>

            <!-- Formulas Dropdown Menu -->
            <div
              v-if="activeDropdown === 'formulas'"
              class="absolute bottom-full right-0 mb-5 w-[90vw] sm:w-64 max-w-xs bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 animate-fade-in origin-bottom-right"
            >
              <div class="p-2 bg-gray-50 border-b border-gray-100">
                <span
                  class="text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >Formulas</span
                >
              </div>
              <div class="max-h-60 overflow-y-auto custom-scrollbar">
                <button
                  v-for="formula in formulas"
                  :key="formula.name"
                  @click="insertText(formula.value)"
                  class="w-full text-left px-4 py-2.5 hover:bg-emerald-50 transition-colors flex flex-col gap-1 group"
                >
                  <span
                    class="text-sm font-medium text-gray-700 group-hover:text-emerald-700"
                    >{{ formula.name }}</span
                  >
                  <span
                    class="text-xs font-mono text-gray-400 group-hover:text-emerald-600"
                    >{{ formula.value }}</span
                  >
                </button>
              </div>
            </div>

            <!-- Backdrop -->
            <div
              v-if="activeDropdown === 'formulas'"
              @click="activeDropdown = null"
              class="fixed inset-0 z-40"
            ></div>
          </div>

          <!-- Settings (Formats & Precision) -->
          <div class="relative">
            <button
              @click="toggleDropdown('settings')"
              class="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
              title="Settings"
            >
              <Icon name="ph:sliders-horizontal-bold" size="18" />
            </button>

            <div
              v-if="activeDropdown === 'settings'"
              class="absolute bottom-full right-0 mb-5 w-[90vw] sm:w-64 max-w-xs bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 animate-fade-in origin-bottom-right"
            >
              <!-- Number Format -->
              <div class="p-3 border-b border-gray-100">
                <span
                  class="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2"
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
                        : 'hover:bg-gray-50 text-gray-600'
                    "
                  >
                    {{ option.label }}
                  </button>
                </div>
              </div>

              <!-- Precision -->
              <div class="p-3">
                <span
                  class="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2"
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
                        : 'hover:bg-gray-50 text-gray-600'
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

          <!-- Voice / Send -->
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
const selectedPrecision = ref("full");

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

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
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
