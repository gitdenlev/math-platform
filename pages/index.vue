<template>
  <CommonGridBackground inner-class="sm:items-center sm:justify-center">
    <div
      class="w-full h-full sm:h-auto flex-1 sm:flex-none mx-auto px-3 sm:px-6 py-4 sm:py-12 flex flex-col relative"
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

      <!-- Greeting / User Profile -->
      <div class="fixed bottom-6 left-6 z-30">
        <button
          class="group relative px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
        >
          <span
            ref="greetingTarget"
            class="text-lg font-medium text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors bg-clip-text"
          ></span>
        </button>
      </div>

      <!-- Humanify Animated Title -->
      <div
        class="text-center absolute top-1/2 left-0 w-full transform -translate-y-1/2 sm:static sm:transform-none sm:w-auto px-4 select-none transition-all duration-500 ease-in-out z-10"
        :class="{
          'opacity-0 scale-95 blur-sm pointer-events-none':
            hasInput || isRunning || latestResult,
        }"
      >
        <h1
          class="text-4xl sm:text-6xl font-semibold tracking-tighter bg-gradient-to-br from-emerald-800 to-emerald-600 dark:from-emerald-600 dark:to-emerald-400 bg-clip-text text-transparent font-['Outfit']"
        >
          <span ref="typeItTarget"></span>
        </h1>
      </div>

      <LabEditor
        class="flex-1 flex flex-col"
        @run="runCode"
        :is-running="isRunning"
        :result="latestResult"
        :explanation="humyExplanation"
        :is-explanation-loading="humyLoading"
        @copy="copyResult"
        @ask-humy="askHumy"
        @clear-explanation="humyExplanation = ''"
        @input="hasInput = !!$event"
      />
      <LabDocs v-if="showDocs" @close="showDocs = false" />
    </div>
  </CommonGridBackground>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import TypeIt from "typeit";

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
const hasInput = ref(false);
const colorMode = useColorMode();
const typeItTarget = ref(null);

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const humyExpression = ref("");
const humyExplanation = ref("");
const humyLoading = ref(false);

const latestResult = computed(() => results.value[0] || null);

onMounted(() => {
  new TypeIt(typeItTarget.value, {
    speed: 100,
    cursor: false, // Cleaner look for a title
  })
    .type("Humanify")
    .go();
});

const runCode = async (code) => {
  isRunning.value = true;
  humyExplanation.value = ""; // Clear explan`ation on new run
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
  } catch (e) {
    console.error("Failed to copy", e);
  }
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
