<template>
  <div
    v-if="results.length > 0"
    class="rounded-2xl bg-white shadow-xl shadow-gray-200/50 overflow-hidden flex flex-col"
  >
    <!-- Header -->
    <div
      class="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between transition-all duration-300"
    >
      <div class="flex items-center gap-3 text-sm">
        <div class="flex items-center gap-2 text-gray-700 font-medium">
          <Icon name="ph:calculator-duotone" class="text-lg text-emerald-600" />
          <span>Результати</span>
        </div>
        <span
          class="px-2.5 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-xs font-semibold"
        >
          {{ results.length }}
        </span>
      </div>
   
    </div>

    <!-- Results List -->
    <div class="bg-white max-h-[32rem] overflow-y-auto">
      <TransitionGroup name="list" tag="div">
        <div
          v-for="(result, index) in results"
          :key="result.id"
          :class="[
            'px-6 py-5 transition-colors hover:bg-gray-50/50',
            index !== results.length - 1 ? 'border-b border-gray-100' : '',
          ]"
        >
          <div class="flex flex-col gap-4">
            <!-- Result Content -->
            <div class="flex-1 min-w-0">
              <div
                :class="[
                  'text-xl font-mono font-semibold mb-2',
                  result.error
                    ? 'text-red-600'
                    : 'bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent',
                ]"
              >
                {{ result.result }}
              </div>

              <!-- Expression if available -->
              <div
                v-if="result.expression && !result.error"
                class="text-sm text-gray-500 font-mono mb-3 bg-gray-50 px-3 py-2 rounded-lg inline-block"
              >
                {{ result.expression }}
              </div>

              <!-- Metadata -->
              <div class="flex items-center gap-4 text-xs text-gray-400">
                <span
                  class="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-gray-100"
                >
                  <Icon name="ph:clock" class="w-3.5 h-3.5" />
                  {{ formatExecutionTime(result.timestamp) }}
                </span>
                <span
                  class="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-gray-100"
                >
                  <Icon name="ph:lightning" class="w-3.5 h-3.5" />
                  {{ result.durationMs }} ms
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center justify-center gap-2">
              <button
                v-if="!result.error"
                @click="copyResult(result)"
                class="group relative flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-300 border"
                :class="[
                  copied === result.id
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-gray-200 hover:border-gray-300',
                ]"
              >
                <div class="relative flex items-center justify-center">
                  <Transition
                    enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="opacity-0 rotate-90 scale-0"
                    enter-to-class="opacity-100 rotate-0 scale-100"
                    leave-active-class="transition-all duration-300 ease-in absolute"
                    leave-from-class="opacity-100 rotate-0 scale-100"
                    leave-to-class="opacity-0 -rotate-90 scale-0"
                  >
                    <Icon
                      v-if="copied === result.id"
                      key="check"
                      name="ph:check-bold"
                      class="text-emerald-600"
                    />
                    <Icon v-else key="copy" name="ph:copy" />
                  </Transition>
                </div>
                <span
                  class="transition-all duration-300 min-w-[60px] text-center"
                >
                  {{ copied === result.id ? "Скопійовано" : "Копіювати" }}
                </span>

                <!-- Tooltip -->
                <span
                  class="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/90 backdrop-blur-sm text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:-translate-y-1 whitespace-nowrap pointer-events-none shadow-xl z-10"
                >
                  Копіювати результат
                </span>
              </button>

              <button
                @click="askHumy(result)"
                class="group relative flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-lg transition-all shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300"
              >
                <Icon name="humy-ai-chatbot-humanify" />
                <span>Humy</span>
              </button>

              <button
                @click="downloadResult(result)"
                class="group relative flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-lg transition-all"
              >
                <Icon name="ph:download-simple" class="w-4 h-4" />

                <span
                  class="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/90 backdrop-blur-sm text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:-translate-y-1 whitespace-nowrap pointer-events-none shadow-xl z-10"
                >
                  Завантажити як .txt
                </span>
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  results: {
    type: Array as () => any[],
    required: true,
  },
});

const copied = ref<number | false>(false);

const emit = defineEmits(["clear", "ask-humy"]);

const formatExecutionTime = (timestamp: Date) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const copyResult = async (result: any) => {
  if (!result || result.error) return;

  try {
    await navigator.clipboard.writeText(result.result);
    copied.value = result.id;
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch (e) {
    console.error("Failed to copy", e);
  }
};

const copyExpressionAndResult = async (result: any) => {
  if (!result || result.error) return;

  try {
    await navigator.clipboard.writeText(
      `${result.expression} = ${result.result}`
    );
    copied.value = result.id;
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch (e) {
    console.error("Failed to copy", e);
  }
};


const askHumy = (result: any) => {
  emit("ask-humy", result);
};

const clearResults = () => {
  emit("clear");
};
</script>

<style scoped>
/* Custom scrollbar */
div::-webkit-scrollbar {
  width: 8px;
}

div::-webkit-scrollbar-track {
  background: transparent;
}

div::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #10b981, #14b8a6);
  border-radius: 4px;
}

div::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #059669, #0d9488);
}

/* Button animations */
button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

button:active {
  transform: scale(0.98);
}

/* List Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
