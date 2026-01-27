<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="handleClose"
      >
        <div
          class="relative w-full max-w-3xl bg-[#0f1115] border border-gray-800 rounded-3xl shadow-2xl transform transition-all animate-modal-enter flex flex-col max-h-[90vh] overflow-hidden"
          @click.stop
        >
          <!-- Header -->
          <div
            class="flex-none flex items-center justify-between px-8 py-5 border-b border-gray-800 bg-[#13161c]"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20"
              >
                <Icon name="ph:sparkle-fill" size="20" />
              </div>
              <div>
                <h3
                  class="text-lg font-bold text-white uppercase tracking-tight"
                >
                  AI Space Analysis
                </h3>
                <p
                  class="text-[10px] uppercase tracking-widest text-gray-500 font-bold"
                >
                  Powered by Gemini 2.0
                </p>
              </div>
            </div>
            <button
              @click="handleClose"
              class="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
              <Icon name="ph:x" size="20" />
            </button>
          </div>

          <!-- Body (Scrollable) -->
          <div
            class="flex-1 overflow-y-auto custom-scrollbar bg-[#0f1115] p-6 space-y-6"
          >
            <!-- Loading State -->
            <div
              v-if="loading"
              class="flex flex-col items-center justify-center py-24 space-y-6"
            >
              <div class="relative w-20 h-20">
                <Icon
                  name="svg-spinners:90-ring-with-bg"
                  size="80"
                  class="text-emerald-500 opacity-80"
                />
                <div class="absolute inset-0 flex items-center justify-center">
                  <Icon
                    name="ph:brain-bold"
                    size="32"
                    class="text-emerald-500 animate-pulse"
                  />
                </div>
              </div>
              <p
                class="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 animate-pulse"
              >
                Analyzing Patterns...
              </p>
            </div>

            <!-- Error State -->
            <div
              v-else-if="error"
              class="flex flex-col items-center justify-center py-24 text-center space-y-6"
            >
              <div
                class="w-20 h-20 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500"
              >
                <Icon name="ph:warning-circle-bold" size="40" />
              </div>
              <div class="space-y-2">
                <h3 class="text-white font-bold">Analysis Failed</h3>
                <p class="text-gray-500 text-sm max-w-xs">
                  {{ error }}
                </p>
              </div>
              <button
                @click="fetchExplanation"
                class="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 text-sm font-bold transition-all"
              >
                Try Again
              </button>
            </div>

            <div v-else-if="analysisData" class="space-y-6">
              <!-- 1. Progress Summary Card -->
              <div
                class="bg-[#161920] border border-gray-800 rounded-2xl p-6 relative overflow-hidden group"
              >
                <div
                  class="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"
                ></div>

                <div class="flex items-center justify-between mb-8">
                  <h4
                    class="text-sm font-bold text-gray-400 uppercase tracking-widest"
                  >
                    Progress Summary
                  </h4>
                  <div
                    class="px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20"
                  >
                    <span
                      class="text-[10px] font-bold text-emerald-500 uppercase tracking-wider"
                      >{{ analysisData.progress_summary.title }}</span
                    >
                  </div>
                </div>

                <!-- Metrics Row -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div
                    class="bg-[#0f1115] border border-gray-800 rounded-xl p-4 flex flex-col group/metric hover:border-emerald-500/30 transition-colors"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <span
                        class="text-2xl font-black text-white leading-none"
                        >{{ analysisData.stats.total_equations || 0 }}</span
                      >
                      <Icon
                        name="ph:function-bold"
                        class="text-gray-700 group-hover/metric:text-emerald-500/50 transition-colors"
                        size="18"
                      />
                    </div>
                    <span
                      class="text-[9px] uppercase tracking-widest text-gray-500 font-bold"
                      >Equations</span
                    >
                  </div>

                  <div
                    class="bg-[#0f1115] border border-gray-800 rounded-xl p-4 flex flex-col group/metric hover:border-emerald-500/30 transition-colors"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <span
                        class="text-2xl font-black text-white leading-none"
                        >{{ analysisData.stats.sessions || 1 }}</span
                      >
                      <Icon
                        name="ph:layout-bold"
                        class="text-gray-700 group-hover/metric:text-emerald-500/50 transition-colors"
                        size="18"
                      />
                    </div>
                    <span
                      class="text-[9px] uppercase tracking-widest text-gray-500 font-bold"
                      >Sessions</span
                    >
                  </div>

                  <div
                    class="col-span-2 bg-[#0f1115] border border-gray-800 rounded-xl p-4 flex flex-col group/metric hover:border-emerald-500/30 transition-colors"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center gap-3">
                        <span
                          class="text-2xl font-black text-white leading-none"
                          >{{
                            analysisData.stats.average_difficulty || 0
                          }}</span
                        >
                        <div class="flex gap-0.5">
                          <Icon
                            v-for="i in 5"
                            :key="i"
                            name="ph:star-fill"
                            :class="
                              i <=
                              Math.round(
                                analysisData.stats.average_difficulty || 0,
                              )
                                ? 'text-amber-400'
                                : 'text-gray-800'
                            "
                            size="12"
                          />
                        </div>
                      </div>
                      <Icon
                        name="ph:chart-bar-bold"
                        class="text-gray-700 group-hover/metric:text-emerald-500/50 transition-colors"
                        size="18"
                      />
                    </div>
                    <span
                      class="text-[9px] uppercase tracking-widest text-gray-500 font-bold"
                      >Average Difficulty</span
                    >
                  </div>
                </div>

                <p class="text-gray-300 text-sm leading-relaxed font-medium">
                  {{ analysisData.progress_summary.text }}
                </p>
              </div>

              <!-- 2. AI Error Patterns & Visuals -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Topic Distribution Card -->
                <div
                  class="bg-[#161920] border border-gray-800 rounded-2xl p-6 flex flex-col items-center"
                >
                  <h4
                    class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 w-full"
                  >
                    Topic Distribution
                  </h4>
                  <div
                    class="w-full aspect-square relative flex items-center justify-center"
                  >
                    <ClientOnly>
                      <VueUiDonut :dataset="chartData" :config="donutConfig" />
                      <template #placeholder>
                        <div
                          class="w-32 h-32 rounded-full border-4 border-gray-800 border-t-emerald-500 animate-spin"
                        ></div>
                      </template>
                    </ClientOnly>
                  </div>
                </div>

                <!-- Analysis Card -->
                <div
                  class="lg:col-span-2 bg-[#161920] border border-gray-800 rounded-2xl p-6"
                >
                  <h4
                    class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6"
                  >
                    Error Pattern Analysis
                  </h4>

                  <div
                    class="flex items-start gap-4 p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 mb-4"
                    v-if="analysisData.error_patterns.has_errors"
                  >
                    <div
                      class="p-2 bg-rose-500/20 rounded-lg text-rose-400 shrink-0"
                    >
                      <Icon name="ph:warning-circle-bold" size="20" />
                    </div>
                    <div>
                      <h5 class="text-sm font-bold text-white mb-1">
                        {{ analysisData.error_patterns.title }}
                      </h5>
                      <p class="text-gray-400 text-xs leading-relaxed">
                        {{ analysisData.error_patterns.description }}
                      </p>
                    </div>
                  </div>

                  <div
                    class="flex items-start gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 mb-4"
                    v-else
                  >
                    <div
                      class="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 shrink-0"
                    >
                      <Icon name="ph:check-circle-bold" size="20" />
                    </div>
                    <div>
                      <h5 class="text-sm font-bold text-white mb-1">
                        {{ analysisData.error_patterns.title }}
                      </h5>
                      <p class="text-gray-400 text-xs leading-relaxed">
                        {{ analysisData.error_patterns.description }}
                      </p>
                    </div>
                  </div>

                  <p class="text-gray-500 text-[11px] leading-relaxed italic">
                    AI detected your most frequent topics are
                    {{ frequentTopics }}. Keep focusing on consistent practice.
                  </p>
                </div>
              </div>

              <!-- 3. Recommendations Card -->
              <div class="bg-[#161920] border border-gray-800 rounded-2xl p-6">
                <h4
                  class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6"
                >
                  Targeted Recommendations
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    v-for="(rec, idx) in analysisData.recommendations"
                    :key="idx"
                    class="group p-5 rounded-xl bg-[#0f1115] border border-gray-800 hover:border-emerald-500/30 transition-all duration-300"
                  >
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="flex items-center justify-center w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-500 font-mono text-xs font-bold border border-emerald-500/20"
                      >
                        {{ idx + 1 }}
                      </span>
                      <h5
                        class="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors truncate"
                      >
                        {{ rec.title }}
                      </h5>
                    </div>
                    <p
                      class="text-gray-400 text-[11px] leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors"
                    >
                      {{ rec.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineAsyncComponent } from "vue";
import type { Space } from "~/stores/spaces";

const VueUiDonut = defineAsyncComponent(() =>
  import("vue-data-ui").then((m) => m.VueUiDonut),
);
import "vue-data-ui/style.css";

const props = defineProps<{
  modelValue: boolean;
  space: Space | undefined;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  close: [];
}>();

const loading = ref(false);
const error = ref<string | null>(null);

interface AnalysisData {
  progress_summary: { title: string; text: string; score: number };
  stats: {
    total_equations: number;
    sessions: number;
    average_difficulty: number;
    topics_distribution: { name: string; value: number; color: string }[];
  };
  error_patterns: { has_errors: boolean; title: string; description: string };
  recommendations: { title: string; description: string }[];
}

const analysisData = ref<AnalysisData | null>(null);

const chartData = computed(() => {
  if (!analysisData.value?.stats?.topics_distribution) return [];
  return analysisData.value.stats.topics_distribution.map((item) => ({
    ...item,
    values: [item.value],
  }));
});

const frequentTopics = computed(() => {
  if (!chartData.value.length) return "algebra";
  return chartData.value
    .slice()
    .sort((a, b) => b.value - a.value)
    .slice(0, 2)
    .map((t) => t.name)
    .join(" and ");
});

const donutConfig = ref({
  responsive: true,
  style: {
    chart: {
      backgroundColor: "transparent",
      color: "#CCCCCC",
      layout: {
        labels: {
          dataLabels: {
            show: true,
            useLabelSlots: false,
            hideUnderValue: 3,
            color: "#888888",
            fontSize: 10,
          },
          value: {
            show: false,
          },
          percentage: {
            show: true,
            color: "#FFFFFF",
            bold: true,
            fontSize: 11,
          },
        },
        donut: {
          strokeWidth: 46,
          borderWidth: 0,
          useCurve: true,
          spacing: 2,
        },
      },
      legend: {
        show: false,
      },
    },
  },
});

async function fetchExplanation() {
  if (!props.space) return;

  loading.value = true;
  error.value = null;
  analysisData.value = null;

  try {
    const result: any = await $fetch("/api/explain", {
      method: "POST",
      body: {
        title: props.space.title,
        description: props.space.description,
        expressions: props.space.expressions,
      },
    });

    if (result.success && result.data) {
      analysisData.value = result.data;
    } else {
      error.value = result.message || "Failed to analyze space data.";
    }
  } catch (err: any) {
    console.error("Failed to fetch analysis", err);
    error.value =
      err.data?.message || err.message || "An unexpected error occurred.";
  } finally {
    loading.value = false;
  }
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen && props.space) {
      fetchExplanation();
    }
  },
);

function handleClose() {
  emit("close");
  emit("update:modelValue", false);
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(60, 60, 60, 0.4);
  border-radius: 99px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition:
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.3s ease;
}

.modal-enter-from > div {
  transform: scale(0.95) translateY(20px);
  opacity: 0;
}

.modal-leave-to > div {
  transform: scale(0.95) translateY(20px);
  opacity: 0;
}
</style>
