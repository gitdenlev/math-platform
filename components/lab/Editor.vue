<template>
  <div
    class="flex flex-col text-gray-900 dark:text-gray-100 font-sans selection:bg-emerald-400 text-emerald-900"
  >
    <!-- Main Content Area (Results) -->
    <LabEditorResult
      ref="resultRef"
      :result="result"
      :explanation="explanation"
      :is-explanation-loading="isExplanationLoading"
      @copy="$emit('copy', $event)"
      @ask-humy="$emit('ask-humy', $event)"
      @clear-explanation="$emit('clear-explanation')"
    />

    <!-- Input Area (Footer) -->
    <LabEditorInput
      ref="inputRef"
      v-model="code"
      :is-running="isRunning"
      @run="runCodeWithHistory"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import LabEditorResult from "~/components/lab/editor/LabEditorResult.vue";
import LabEditorInput from "~/components/lab/editor/LabEditorInput.vue";

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
  "run",
  "copy",
  "ask-humy",
  "download",
  "clear-explanation",
]);

const code = ref("");
const isRunning = ref(false);
const history = ref<{ code: string; result: any; timestamp: number }[]>([]);
const lastRunCode = ref("");

const resultRef = ref<InstanceType<typeof LabEditorResult> | null>(null);
const inputRef = ref<InstanceType<typeof LabEditorInput> | null>(null);

const addToHistory = (codeVal: string, resultVal: any) => {
  history.value.unshift({
    code: codeVal,
    result: resultVal,
    timestamp: Date.now(),
  });
  // Keep only last 50 items
  if (history.value.length > 50) {
    history.value.pop();
  }
};

const runCodeWithHistory = () => {
  if (isRunning.value || !code.value.trim()) return;
  isRunning.value = true;
  lastRunCode.value = code.value;
  emit("run", code.value);

  setTimeout(() => {
    isRunning.value = false;
    code.value = "";
  }, 500);
};

watch(
  () => props.result,
  (newResult) => {
    if (newResult && !newResult.error && lastRunCode.value) {
      addToHistory(lastRunCode.value, newResult);
      lastRunCode.value = ""; // Reset
    }
  }
);

watch(code, () => {
  if (props.explanation) {
    emit("clear-explanation");
  }
  if (resultRef.value) {
    resultRef.value.closeExplanation();
  }
});

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
});
</script>
