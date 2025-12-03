<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-gray-900/20 backdrop-blur-sm animate-fade-in"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white dark:bg-gray-900 rounded-none sm:rounded-xl shadow-2xl w-full max-w-3xl h-full sm:h-auto sm:max-h-[85vh] flex flex-col overflow-hidden animate-scale-in border-0 sm:border border-gray-100 dark:border-gray-800"
    >
      <!-- Header -->
      <div
        class="px-4 sm:px-8 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900 sticky top-0 z-10"
      >
        <h2
          class="text-xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight"
        >
          Syntax Guide
        </h2>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <Icon name="ph:x" size="20" />
        </button>
      </div>

      <!-- Content -->
      <div
        class="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-gray-900"
      >
        <div class="p-4 sm:p-8 space-y-12">
          <div v-for="section in sections" :key="section.title">
            <h3
              class="text-sm font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider mb-6"
            >
              {{ section.title }}
            </h3>

            <div class="w-full overflow-x-auto">
              <div class="min-w-[500px]">
                <!-- Table Header -->
                <div
                  class="grid grid-cols-[1fr_1.5fr_1fr] gap-4 pb-3 border-b border-gray-100 dark:border-gray-800 text-xs font-medium text-gray-400 tracking-wider mb-2"
                >
                  <div>Feature</div>
                  <div>Syntax</div>
                  <div>Example</div>
                </div>

                <!-- Table Body -->
                <div
                  v-for="item in section.items"
                  :key="item.label"
                  class="grid grid-cols-[1fr_1.5fr_1fr] gap-4 py-3 border-b border-gray-50 dark:border-gray-800/50 last:border-0 items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors -mx-3 px-3 rounded-lg group"
                >
                  <div
                    class="text-sm text-gray-700 dark:text-gray-300 font-medium"
                  >
                    {{ item.label }}
                  </div>
                  <div class="font-mono text-sm">
                    <span
                      class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-emerald-700 dark:text-emerald-400 border border-gray-200 dark:border-gray-700 group-hover:border-emerald-200 dark:group-hover:border-emerald-500/30 transition-colors"
                    >
                      {{ item.syntax }}
                    </span>
                  </div>
                  <div
                    class="font-mono text-sm text-gray-500 dark:text-gray-500"
                  >
                    {{ item.example }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(["close"]);

const sections = [
  {
    title: "Basic Arithmetic",
    items: [
      { label: "Addition", syntax: "+", example: "10 + 5" },
      { label: "Subtraction", syntax: "-", example: "10 - 5" },
      { label: "Multiplication", syntax: "*", example: "10 * 5" },
      { label: "Division", syntax: "/", example: "10 / 5" },
      { label: "Exponentiation", syntax: "^", example: "2^3" },
      { label: "Modulus", syntax: "%", example: "10 % 3" },
    ],
  },
  {
    title: "Functions",
    items: [
      { label: "Square Root", syntax: "sqrt(x)", example: "sqrt(16)" },
      { label: "Sine", syntax: "sin(x)", example: "sin(pi/2)" },
      { label: "Cosine", syntax: "cos(x deg)", example: "cos(90 deg)" },
      { label: "Logarithm", syntax: "log(x)", example: "log(100)" },
      { label: "Natural Log", syntax: "ln(x)", example: "ln(e)" },
      { label: "Absolute", syntax: "abs(x)", example: "abs(-5)" },
    ],
  },
  {
    title: "Constants",
    items: [
      { label: "Pi", syntax: "pi", example: "2 * pi * r" },
      { label: "Euler's Number", syntax: "e", example: "e^x" },
      { label: "Golden Ratio", syntax: "phi", example: "phi" },
    ],
  },
  {
    title: "Unit Conversion",
    items: [
      { label: "Length", syntax: "X unit to unit", example: "10 m to km" },
      { label: "Weight", syntax: "X unit to unit", example: "5 kg to lb" },
      {
        label: "Temperature",
        syntax: "X unit to unit",
        example: "20 degC to degF",
      },
    ],
  },
];
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 3px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #374151;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}
</style>
