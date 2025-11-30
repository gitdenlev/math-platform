<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:20px_20px]"
  >
    <div
      class="w-full mx-auto px-3 sm:px-6 py-8 sm:py-12 flex flex-col relative"
    >
      <!-- Header Actions -->
      <div
        class="fixed top-0 right-3 sm:right-6 mt-3 sm:mt-4 z-30 flex items-center gap-2"
      >
        <button
          @click="toggleTheme"
          class="flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-500 transition-all text-gray-600 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 group cursor-pointer shadow-lg"
          :title="
            colorMode.value === 'dark'
              ? 'Switch to Light Mode'
              : 'Switch to Dark Mode'
          "
        >
          <Icon
            :name="colorMode.value === 'dark' ? 'ph:sun-bold' : 'ph:moon-bold'"
            size="18"
          />
        </button>

        <button
          @click="showDocs = true"
          class="hidden sm:flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-500 transition-all text-gray-600 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 group cursor-pointer shadow-lg"
        >
          <Icon
            name="ph:book-open-text"
            size="18"
            class="transition-transform"
          />
          <span class="text-sm font-medium">Docs</span>
        </button>

        <button
          @click="showDocs = true"
          class="flex sm:hidden items-center justify-center w-10 h-10 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-500 transition-all text-gray-600 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 group cursor-pointer shadow-lg"
          title="Documentation"
        >
          <Icon name="ph:book-open-text" size="18" />
        </button>
      </div>

      <LabEditor
        @run="runCode"
        :is-running="isRunning"
        :result="latestResult"
        :explanation="humyExplanation"
        :is-explanation-loading="humyLoading"
        @copy="copyResult"
        @ask-humy="askHumy"
        @download="downloadResult"
        @clear-explanation="humyExplanation = ''"
      />

      <LabDocs v-if="showDocs" @close="showDocs = false" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

useHead({
  title: "Humanify",
  meta: [
    {
      name: "description",
      content:
        "Interactive mathematical calculator for students and professionals.",
    },
  ],
});

const results = ref([]);
const isRunning = ref(false);
const showDocs = ref(false);
const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const humyExpression = ref("");
const humyExplanation = ref("");
const humyLoading = ref(false);

const latestResult = computed(() => results.value[0] || null);

const runCode = async (code) => {
  isRunning.value = true;
  humyExplanation.value = ""; // Clear explanation on new run
  const startTime = performance.now();

  try {
    const response = await $fetch("/api/calculate", {
      method: "POST",
      body: { expression: code },
    });

    const endTime = performance.now();

    const newResult = {
      id: Date.now(),
      expression: code,
      result: response.result,
      error: false,
      timestamp: new Date(),
      durationMs: Math.round(endTime - startTime),
    };

    results.value = [newResult, ...results.value];
  } catch (error) {
    const endTime = performance.now();

    const errorResult = {
      id: Date.now(),
      expression: code,
      result: `Error: ${error.data?.message || error.message}`,
      error: true,
      timestamp: new Date(),
      durationMs: Math.round(endTime - startTime),
    };

    results.value = [errorResult, ...results.value];
  } finally {
    isRunning.value = false;
  }
};

const copyResult = async (result) => {
  if (!result || result.error) return;
  try {
    await navigator.clipboard.writeText(result.result);
    // Optional: Show toast notification
  } catch (e) {
    console.error("Failed to copy", e);
  }
};

const downloadResult = (result) => {
  if (!result || result.error) return;
  const blob = new Blob(
    [`Expression: ${result.expression}\nResult: ${result.result}`],
    { type: "text/plain" }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mathlab-result.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const askHumy = async (resultItem) => {
  humyExpression.value = resultItem.expression;
  humyExplanation.value = "";
  humyLoading.value = true;

  try {
    const prompt = `Explain this mathematical expression step by step: ${resultItem.expression} = ${resultItem.result}. Keep it clear and concise.`;

    const response = await $fetch("/api/chat", {
      method: "POST",
      body: {
        message: prompt,
        history: [],
      },
    });

    if (response.success) {
      humyExplanation.value = response.message;
    }
  } catch (error) {
    console.error(error);
    humyExplanation.value = `Sorry, I couldn't get an explanation. Error: ${
      error.data?.statusMessage || error.message || "Unknown error"
    }`;
  } finally {
    humyLoading.value = false;
  }
};
</script>
