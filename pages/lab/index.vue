<template>
  <NuxtLayout name="default">
    <div class="max-w-7xl mx-auto">
      <div class="mb-6">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div
            class="bg-emerald-600 px-6 py-4 flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <div class="flex gap-2">
                <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div class="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
            <button
              @click="runCode"
              :disabled="isRunning || !code.trim()"
              class="cursor-pointer bg-white/20 hover:bg-white/30 rounded-lg px-4 py-2 text-white font-medium flex items-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon
                :name="isRunning ? 'lucide:loader' : 'lucide:play'"
                :class="isRunning ? 'animate-spin' : ''"
                class="w-4 h-4"
              />
              {{ isRunning ? "Обчислення..." : "Виконати" }}
            </button>
          </div>

          <div class="p-6">
            <textarea
              ref="textareaRef"
              v-model="code"
              class="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none resize-none text-lg text-gray-700 placeholder-gray-400"
              placeholder="Введіть математичний вираз, наприклад: 2 + sqrt(4)"
              spellcheck="false"
            />
            <div
              class="flex justify-end items-center mt-3 text-sm text-gray-500"
            >
              <span>{{ code.length }} символів</span>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="isConsoleVisible"
        class="bg-white rounded-2xl h-40 shadow-lg overflow-hidden"
      >
        <div class="bg-emerald-600 px-6 py-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Icon name="lucide:terminal" class="w-5 h-5 text-white" />
            <span class="text-white font-medium">
              {{ isRunning ? "Обчислення..." : "Консоль" }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <button
              v-if="lastResult && !lastResult.error && !isRunning"
              @click="copyResult"
              class="cursor-pointer flex items-center bg-white/20 hover:bg-white/30 rounded-lg p-2 text-white transition-all duration-200"
            >
              <Icon
                :name="copied ? 'lucide:check' : 'lucide:copy'"
                size="20"
              />
            </button>
            <button
              @click="clearConsole"
              class="cursor-pointer flex items-center bg-white/20 hover:bg-white/30 rounded-lg p-2 text-white transition-all duration-200"
            >
              <Icon name="mdi:broom" size="20" />
            </button>
          </div>
        </div>

        <div class="p-6 min-h-[10rem] overflow-y-auto bg-gray-50">
          <div
            v-if="isRunning"
            class="border-l-4 border-emerald-200 pl-4 animate-pulse"
          >
            <div class="text-sm text-gray-600 mb-1">
              <span class="text-emerald-600 font-bold">></span> {{ code }}
            </div>
            <div class="text-emerald-600 font-mono text-lg font-bold">
              Обчислення...
            </div>
          </div>
          <div
            v-else-if="lastResult"
            class="border-l-4 border-emerald-600 pl-4"
          >
            <div
              class="flex justify-between items-center text-sm text-gray-600 mb-1"
            >
              <span class="flex items-center gap-1">
                <span class="text-emerald-600 font-bold">></span>
                {{ lastResult.expression }}
              </span>
              <span class="text-xs text-gray-500">
                {{ formatExecutionTime(lastResult.timestamp) }}
                <span v-if="lastResult.durationMs !== undefined">
                  ({{ lastResult.durationMs }} мс)</span
                >
              </span>
            </div>
            <div
              :class="[
                'text-lg',
                lastResult.error ? 'text-red-400' : 'text-emerald-600',
              ]"
            >
              {{ lastResult.result }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: "Математична лабораторія",
  meta: [
    {
      name: "description",
      content:
        "Математична лабораторія - обчислюйте складні математичні вирази миттєво за допомогою Math.js API",
    },
  ],
});

const code = ref("");
const isRunning = ref(false);
const copied = ref(false);
const textareaRef = ref(null);
const isConsoleVisible = ref(false);

// Замість масиву тепер один об'єкт для останнього результату
const lastResult = ref(null);

const formatExecutionTime = (timestamp: Date) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

// Функція тепер оновлює один об'єкт, а не додає в масив
const updateConsole = (
  expression: string,
  result: string,
  error = false,
  durationMs?: number
) => {
  lastResult.value = {
    expression,
    result,
    error,
    timestamp: new Date(),
    durationMs,
  };
};

const runCode = async () => {
  isConsoleVisible.value = true;
  if (!code.value.trim()) return;

  isRunning.value = true;
  copied.value = false;

  const startTime = performance.now();

  try {
    const encodedExpression = encodeURIComponent(code.value.trim());
    const apiUrl = `https://api.mathjs.org/v4/?expr=${encodedExpression}`;
    const response = await fetch(apiUrl);
    const textResult = await response.text();
    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);

    if (response.ok) {
      updateConsole(code.value.trim(), textResult, false, duration);
    } else {
      const errorMsg = "Синтаксична помилка або невірний вираз";
      updateConsole(code.value.trim(), errorMsg, true, duration);
    }
  } catch (error) {
    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);
    const errorMsg = "Помилка підключення. Спробуйте пізніше.";
    updateConsole(code.value.trim(), errorMsg, true, duration);
  } finally {
    isRunning.value = false;
  }
};

const copyResult = async () => {
  // Логіка копіювання тепер працює з lastResult
  if (!lastResult.value || lastResult.value.error) return;

  try {
    await navigator.clipboard.writeText(lastResult.value.result);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch (e) {
    console.error("Не вдалося скопіювати", e);
  }
};

const clearConsole = () => {
  lastResult.value = null;
  isConsoleVisible.value = false;
};

async function focusTextarea() {
  if (textareaRef.value) {
    await nextTick();
    textareaRef.value.focus();
  }
  if (code.value.trim() === "") {
    clearConsole();
  }
}
onMounted(() => {
  focusTextarea();
});
</script>
