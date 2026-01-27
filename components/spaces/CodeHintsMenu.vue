<script setup lang="ts">
type HintCategory = "units" | "const" | "func" | "formulas";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "insert-code": [code: string];
}>();

const activeCategory = ref<HintCategory>("units");

const categories = [
  { id: "units", label: "Units", icon: "mingcute:ruler-line" },
  { id: "const", label: "Const", icon: "ph:pi" },
  { id: "func", label: "Func", icon: "ph:function" },
  { id: "formulas", label: "Formulas", icon: "ph:math-operations" },
] as const;

const hints = {
  units: [
    {
      label: "Length",
      items: [
        { label: "m → km", value: " to km" },
        { label: "m → cm", value: " to cm" },
        { label: "m → mm", value: " to mm" },
        { label: "km → miles", value: " to miles" },
        { label: "feet → m", value: " to m" },
        { label: "inches → cm", value: " to cm" },
      ],
    },
    {
      label: "Weight",
      items: [
        { label: "kg → lbs", value: " to lbs" },
        { label: "lbs → kg", value: " to kg" },
        { label: "g → oz", value: " to oz" },
      ],
    },
    {
      label: "Temperature",
      items: [
        { label: "degC → degF", value: " to degF" },
        { label: "degF → degC", value: " to degC" },
      ],
    },
  ],
  const: [
    {
      label: "Mathematical",
      items: [
        { label: "pi (π)", value: "pi" },
        { label: "e (Euler)", value: "e" },
        { label: "phi (φ)", value: "phi" },
        { label: "tau (τ)", value: "tau" },
      ],
    },
  ],
  func: [
    {
      label: "Basic",
      items: [
        { label: "sqrt()", value: "sqrt(" },
        { label: "abs()", value: "abs(" },
        { label: "round()", value: "round(" },
        { label: "floor()", value: "floor(" },
        { label: "ceil()", value: "ceil(" },
      ],
    },
    {
      label: "Trigonometry",
      items: [
        { label: "sin()", value: "sin(" },
        { label: "cos()", value: "cos(" },
        { label: "tan()", value: "tan(" },
        { label: "asin()", value: "asin(" },
        { label: "acos()", value: "acos(" },
        { label: "atan()", value: "atan(" },
      ],
    },
    {
      label: "Logarithmic",
      items: [
        { label: "log()", value: "log(" },
        { label: "ln()", value: "ln(" },
        { label: "log10()", value: "log10(" },
      ],
    },
  ],
  formulas: [
    {
      label: "Geometry",
      items: [
        { label: "Площа кола", value: "pi * r^2" },
        { label: "Довжина кола", value: "2 * pi * r" },
        { label: "Площа прямокутника", value: "width * height" },
        { label: "Площа трикутника", value: "0.5 * base * height" },
        { label: "Об'єм сфери", value: "4/3 * pi * r^3" },
      ],
    },
    {
      label: "Algebra",
      items: [
        { label: "Теорема Піфагора", value: "sqrt(a^2 + b^2)" },
        {
          label: "Квадратне рівняння",
          value: "(-b + sqrt(b^2 - 4*a*c)) / (2*a)",
        },
      ],
    },
  ],
};

const currentHints = computed(() => hints[activeCategory.value] || []);

// Favorites state
const favoritesStore = useLocalStorage<string[]>("math-favorites", []);

const isFavorite = (value: string) => favoritesStore.value.includes(value);

const toggleFavorite = (value: string) => {
  const index = favoritesStore.value.indexOf(value);
  if (index > -1) {
    favoritesStore.value.splice(index, 1);
  } else {
    favoritesStore.value.push(value);
  }
};

const favoriteHints = computed(() => {
  const allHints = Object.values(hints).flatMap((categories) =>
    categories.flatMap((cat) => cat.items)
  );
  return allHints.filter((hint) => isFavorite(hint.value));
});

function handleInsert(code: string) {
  emit("insert-code", code);
  emit("update:modelValue", false);
}

function close() {
  emit("update:modelValue", false);
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-end justify-start p-6"
        @click.self="close"
      >
        <!-- Menu Panel -->
        <div
          class="w-[500px] max-h-[600px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-2xl flex flex-col overflow-hidden"
          @click.stop
        >
          <!-- Header with Tabs -->
          <div
            class="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
          >
            <div class="flex items-center gap-2 p-4">
              <button
                v-for="cat in categories"
                :key="cat.id"
                @click="activeCategory = cat.id as HintCategory"
                class="flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2"
                :class="
                  activeCategory === cat.id
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                "
              >
                <Icon :name="cat.icon" size="18" />
                <span>{{ cat.label }}</span>
              </button>
            </div>
          </div>

          <!-- Favorites Section -->
          <div
            v-if="favoriteHints.length > 0"
            class="border-b border-zinc-200 dark:border-zinc-800 p-4 bg-amber-50/50 dark:bg-amber-500/5"
          >
            <div class="flex items-center gap-2 mb-3">
              <Icon name="ph:star-fill" size="16" class="text-amber-500" />
              <span class="text-sm font-semibold text-zinc-900 dark:text-white"
                >Обрані</span
              >
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="hint in favoriteHints"
                :key="hint.value"
                @click="handleInsert(hint.value)"
                class="px-3 py-1.5 rounded-md text-xs font-mono bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all border border-amber-200 dark:border-amber-500/20"
              >
                {{ hint.label }}
              </button>
            </div>
          </div>

          <!-- Hints Content -->
          <div class="flex-1 overflow-y-auto p-4">
            <div class="space-y-6">
              <div v-for="group in currentHints" :key="group.label">
                <div class="flex items-center gap-2 mb-3">
                  <Icon
                    name="mingcute:arrow-right-line"
                    size="14"
                    class="text-zinc-400"
                  />
                  <h4
                    class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                  >
                    {{ group.label }}
                  </h4>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="item in group.items"
                    :key="item.value"
                    @click="handleInsert(item.value)"
                    class="group relative px-3 py-2 rounded-md text-left text-sm font-mono bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all border border-transparent hover:border-emerald-200 dark:hover:border-emerald-500/30"
                  >
                    <div class="flex items-center justify-between gap-2">
                      <span>{{ item.label }}</span>
                      <button
                        @click.stop="toggleFavorite(item.value)"
                        class="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Icon
                          :name="
                            isFavorite(item.value) ? 'ph:star-fill' : 'ph:star'
                          "
                          size="14"
                          :class="
                            isFavorite(item.value)
                              ? 'text-amber-500'
                              : 'text-zinc-400 hover:text-amber-500'
                          "
                        />
                      </button>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="border-t border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900/50"
          >
            <div
              class="flex items-center justify-between text-xs text-zinc-500"
            >
              <span>Натисніть на елемент, щоб вставити</span>
              <button
                @click="close"
                class="px-3 py-1.5 rounded-md bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
