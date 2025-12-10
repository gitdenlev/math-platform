<template>
  <div
    class="flex flex-col items-center p-3 sm:p-6 min-h-full pb-28 sm:pb-6 pointer-events-none"
  >
    <div
      class="w-full max-w-3xl flex flex-col gap-4 mt-auto sm:mt-0 pointer-events-auto"
    >
      <!-- Result Display -->
      <Transition name="apple-spring" mode="out-in">
        <div
          v-if="result"
          :key="resultKey"
          class="w-full relative overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-[2rem] shadow-2xl shadow-emerald-900/10 p-5 sm:p-8 transform transition-all duration-300 hover:shadow-emerald-900/15"
        >
          <div class="flex flex-col gap-5">
            <!-- Edit Mode -->
            <div v-if="isEditing" class="flex flex-col gap-3 py-1">
              <div class="flex items-center justify-between">
                <div
                  class="text-xs font-semibold uppercase tracking-wider text-emerald-600/80 dark:text-emerald-400/80"
                >
                  Recalculate
                </div>
              </div>
              <div class="relative group">
                <input
                  v-model="editValue"
                  @keydown.enter="handleRecalculate"
                  ref="editInputRef"
                  type="text"
                  class="w-full bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl pl-4 pr-12 py-3 text-lg font-sans font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder-gray-400"
                  placeholder="Enter expression..."
                />
               
              </div>
              <div class="flex justify-start">
                <button
                  @click="isEditing = false"
                  class="text-xs font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center gap-1 px-1"
                >
                  <Icon name="ph:x" size="12" />
                  Cancel
                </button>
              </div>
            </div>

            <!-- Main Result -->
            <div v-else-if="!result.error" class="flex flex-col gap-1">
              <div
                class="text-xs font-semibold uppercase tracking-wider text-emerald-600/80 dark:text-emerald-400/80 mb-1"
              >
                Result
              </div>
              <div
                class="text-3xl sm:text-5xl font-sans font-semibold tracking-tight text-gray-900 dark:text-gray-50 break-all tabular-nums"
              >
                {{ result.result }}
              </div>
            </div>

            <!-- Error State -->
            <div v-else class="flex items-start gap-4">
              <div
                class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0"
              >
                <Icon
                  name="ph:warning-duotone"
                  class="text-red-500"
                  size="24"
                />
              </div>
              <div>
                <h3 class="text-base font-bold text-red-600 dark:text-red-400">
                  Calculation Error
                </h3>
                <p
                  class="text-sm text-red-600/80 dark:text-red-400/80 mt-1 font-medium leading-relaxed"
                >
                  {{ result.result.replace("Error: ", "") }}
                </p>
              </div>
            </div>

            <!-- Actions and Divider -->
            <div v-if="!result.error" class="pt-2">
              <div class="w-full h-px bg-gray-100 dark:bg-gray-800 mb-4"></div>
              <div class="flex items-center gap-2">
                <button
                  @click="handleCopy"
                  class="group relative h-10 px-4 flex items-center gap-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 active:scale-95"
                  :class="{
                    'dark:bg-emerald-600/50 dark:text-emerald-100': isCopied,
                  }"
                >
                  <Icon
                    :name="isCopied ? 'ph:check-bold' : 'ph:copy-simple'"
                    size="15"
                    class="transition-transform duration-300"
                    :class="{ 'scale-110': isCopied }"
                  />
                  <span class="text-sm font-medium">{{
                    isCopied ? "Copied" : "Copy"
                  }}</span>
                </button>

                <button
                  @click="toggleExplanation"
                  class="group h-10 px-4 flex items-center gap-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 active:scale-95"
                  :class="{
                    'dark:bg-emerald-600/50 dark:text-emerald-100':
                      showExplanation,
                  }"
                >
                  <Icon
                    name="streamline-flex:ai-scanner-robot-remix"
                    size="15"
                    class="transition-transform duration-300"
                  />
                  <span class="text-sm font-medium">Explain</span>
                </button>

                <div class="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>

                <button
                  @click="startEdit"
                  class="group h-10 px-4 flex items-center gap-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 active:scale-95"
                >
                  <Icon
                    name="ph:pencil-simple-bold"
                    size="15"
                    class="transition-transform duration-300 group-hover:-rotate-12"
                  />
                  <span class="text-sm font-medium">Edit</span>
                </button>
              </div>
            </div>

            <!-- Explanation Container -->
            <div
              v-if="showExplanation"
              class="w-full relative overflow-hidden group mt-2"
            >
              <div
                class="relative z-10 bg-gray-50/50 dark:bg-gray-800/20 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-800"
              >
                <!-- Loading State (Skeleton) -->
                <div
                  v-if="isExplanationLoading"
                  class="w-full space-y-3 animate-pulse"
                >
                  <div
                    class="h-4 bg-emerald-200/50 dark:bg-emerald-900/30 rounded w-3/4"
                  ></div>
                  <div
                    class="h-4 bg-emerald-200/50 dark:bg-emerald-900/30 rounded w-1/2"
                  ></div>
                  <div
                    class="h-4 bg-emerald-200/50 dark:bg-emerald-900/30 rounded w-5/6"
                  ></div>
                </div>

                <!-- Content -->
                <div
                  v-else-if="explanation"
                  :key="explanationKey"
                  class="prose prose-sm max-w-none prose-emerald"
                >
                  <div
                    class="flex items-center gap-2 mb-4 text-emerald-700 dark:text-emerald-400 font-medium text-sm"
                  >
                    <Icon
                      name="ph:sparkle-fill"
                      size="16"
                      class="text-emerald-500"
                    />
                    <span>AI Explanation</span>
                  </div>
                  <div
                    class="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px] font-sans"
                    v-html="formattedExplanation"
                  ></div>
                </div>

                <!-- Empty/Initial State -->
                <div
                  v-else
                  class="flex flex-col items-center justify-center py-6 gap-3 text-gray-400"
                >
                  <div
                    class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
                  >
                    <Icon
                      name="streamline-flex:ai-scanner-robot-remix"
                      size="24"
                      class="opacity-40"
                    />
                  </div>
                  <span class="text-sm font-medium opacity-60"
                    >Asking AI to explain this...</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";

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
const explanationKey = ref(0);

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

watch(
  () => props.result,
  () => {
    resultKey.value++;
  },
  { deep: true }
);

watch(
  () => props.explanation,
  () => {
    explanationKey.value++;
  }
);

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

  // Enhance typography in regex replacements for Apple-style readability
  text = text.replace(
    /^### (.*$)/gim,
    '<h3 class="text-base font-bold text-gray-900 dark:text-gray-100 mt-4 mb-2 tracking-tight">$1</h3>'
  );
  text = text.replace(
    /^## (.*$)/gim,
    '<h2 class="text-lg font-bold text-gray-900 dark:text-gray-100 mt-5 mb-3 tracking-tight">$1</h2>'
  );

  text = text.replace(
    /\*\*(.*?)\*\*/g,
    "<strong class='text-gray-900 dark:text-gray-100 font-semibold'>$1</strong>"
  );

  text = text.replace(
    /\*(.*?)\*/g,
    "<em class='text-emerald-600 dark:text-emerald-400 not-italic'>$1</em>"
  );

  text = text.replace(
    /`(.*?)`/g,
    '<code class="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 font-mono text-sm border border-gray-200 dark:border-gray-700/50">$1</code>'
  );

  text = text.replace(
    /^\s*[-•] (.*$)/gim,
    '<div class="flex gap-3 mb-2 ml-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span><span class="flex-1">$1</span></div>'
  );

  text = text.replace(
    /^\s*(\d+)\. (.*$)/gim,
    '<div class="flex gap-3 mb-2 ml-1"><span class="text-emerald-600 dark:text-emerald-400 font-bold text-sm mt-0.5">$1.</span><span class="flex-1">$2</span></div>'
  );

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

defineExpose({
  closeExplanation: () => {
    showExplanation.value = false;
  },
});
</script>

<style scoped>
.apple-spring-enter-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.apple-spring-leave-active {
  transition: all 0.3s ease-in;
}

.apple-spring-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  filter: blur(10px);
}

.apple-spring-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
  filter: blur(10px);
}
</style>
