<template>
  <CommonGridBackground
    inner-class="flex items-center justify-center min-h-screen"
  >
    <div
      class="w-full h-auto mx-auto px-3 sm:px-6 py-4 flex flex-col relative justify-center z-10"
    >
      <div
        class="text-center w-full px-4 select-none transition-all duration-500 ease-in-out"
        :class="{
          'opacity-0 scale-90 blur-sm pointer-events-none mb-0':
            hasInput || isRunning || latestResult,
          'mb-2 sm:mb-20 translate-y-4': !(
            hasInput ||
            isRunning ||
            latestResult
          ),
        }"
      >
        <h1
          class="text-4xl sm:text-6xl font-semibold tracking-tighter bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent font-['Outfit']"
        >
          Humanify
        </h1>
      </div>

      <ClientOnly>
        <LabEditor
          class="w-full max-w-3xl mx-auto"
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
      </ClientOnly>
    </div>
  </CommonGridBackground>
</template>

<script setup>
import { ref, computed } from "vue";

definePageMeta({
  layout: "default",
});

useHead({
  title: "Humanify",
  meta: [
    {
      name: "description",
      content:
        "Інтерактивний математичний калькулятор для студентів та професіоналів.",
    },
  ],
});

const results = ref([]);
const isRunning = ref(false);
const hasInput = ref(false);

const humyExpression = ref("");
const humyExplanation = ref("");
const humyLoading = ref(false);

const latestResult = computed(() => results.value[0] || null);

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
      result: `Помилка: ${error.data?.message || error.message}`,
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
    const prompt = `Поясни що це за математичні операції у виразі: ${resultItem.expression}. Тільки назви операцій та їх призначення, БЕЗ обчислень.`;

    console.log("Asking Humy:", { resultItem, prompt });

    const response = await $fetch("/api/chat", {
      method: "POST",
      body: {
        message: prompt,
        history: [],
      },
    });

    if (response.success) {
      let explanation = response.message;

      // Обрізаємо після другого речення (крапки)
      const sentences = explanation.split(". ");
      if (sentences.length > 2) {
        explanation = sentences.slice(0, 2).join(". ") + ".";
      }

      // Видаляємо рядки з результатом обчислення (містять = та числа)
      explanation = explanation
        .split("\n")
        .filter((line) => !line.includes("=") || !line.match(/\d+\.\d+/))
        .join(" ")
        .trim();

      humyExplanation.value = explanation;
    }
  } catch (error) {
    console.error(error);
    humyExplanation.value = `Вибачте, я не зміг отримати пояснення. Помилка: ${
      error.data?.statusMessage || error.message || "Невідома помилка"
    }`;
  } finally {
    humyLoading.value = false;
  }
};
</script>
