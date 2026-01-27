<template>
  <aside
    class="w-80 border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0c] overflow-y-auto"
  >
    <div class="p-4">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white">
          Інструменти
        </h3>
        <button
          @click="$emit('close')"
          class="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
        >
          <Icon
            name="ph:x"
            size="16"
            class="text-zinc-500 dark:text-zinc-400"
          />
        </button>
      </div>

      <!-- Tool Type Selector -->
      <div class="space-y-2 mb-6">
        <button
          v-for="tool in availableTools"
          :key="tool.id"
          @click="selectedTool = tool.id"
          :class="
            selectedTool === tool.id
              ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-900 dark:text-emerald-400'
              : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
          "
          class="w-full flex items-center gap-3 p-3 border rounded-md transition-all"
        >
          <div
            :class="
              selectedTool === tool.id
                ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
            "
            class="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
          >
            <Icon :name="tool.icon" size="16" />
          </div>
          <div class="text-left flex-1">
            <div class="text-sm font-medium">{{ tool.label }}</div>
            <div class="text-xs opacity-60">{{ tool.description }}</div>
          </div>
        </button>
      </div>

      <!-- Converter Interface -->
      <div v-if="selectedTool === 'converter'" class="space-y-4">
        <!-- Conversion Type -->
        <div>
          <label
            class="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 block"
          >
            Тип конвертації
          </label>
          <select
            v-model="conversionType"
            class="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="length">Довжина</option>
            <option value="weight">Вага</option>
            <option value="temperature">Температура</option>
            <option value="time">Час</option>
            <option value="data">Дані</option>
          </select>
        </div>

        <!-- From Unit -->
        <div>
          <label
            class="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 block"
          >
            З
          </label>
          <div class="flex gap-2">
            <input
              v-model.number="inputValue"
              type="number"
              placeholder="100"
              class="flex-1 px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <select
              v-model="fromUnit"
              class="px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option
                v-for="unit in availableUnits"
                :key="unit.value"
                :value="unit.value"
              >
                {{ unit.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Conversion Arrow -->
        <div class="flex justify-center">
          <div class="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-md">
            <Icon name="ph:arrow-down" size="16" class="text-zinc-400" />
          </div>
        </div>

        <!-- To Unit -->
        <div>
          <label
            class="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 block"
          >
            До
          </label>
          <div class="flex gap-2">
            <div
              class="flex-1 px-3 py-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-md text-sm font-mono text-emerald-700 dark:text-emerald-400"
            >
              {{ convertedValue }}
            </div>
            <select
              v-model="toUnit"
              class="px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option
                v-for="unit in availableUnits"
                :key="unit.value"
                :value="unit.value"
              >
                {{ unit.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <button
            @click="copyResult"
            class="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Icon :name="copied ? 'ph:check' : 'ph:copy'" size="16" />
            {{ copied ? "Скопійовано!" : "Копіювати результат" }}
          </button>
        </div>
      </div>

      <!-- Geometry Calculator -->
      <div v-else-if="selectedTool === 'geometry'" class="space-y-4">
        <!-- Shape Selector -->
        <div>
          <label
            class="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 block"
          >
            Фігура
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="shape in geometryShapes"
              :key="shape.id"
              @click="selectedShape = shape.id"
              :class="
                selectedShape === shape.id
                  ? 'bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-400'
                  : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
              "
              class="aspect-square flex flex-col items-center justify-center border rounded-md transition-all"
            >
              <Icon :name="shape.icon" size="20" />
              <span class="text-xs mt-1">{{ shape.label }}</span>
            </button>
          </div>
        </div>

        <!-- Circle -->
        <div v-if="selectedShape === 'circle'" class="space-y-3">
          <div>
            <label
              class="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 block"
            >
              Радіус (r)
            </label>
            <input
              v-model.number="circleRadius"
              type="number"
              placeholder="5"
              class="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div
              class="p-3 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 rounded-md"
            >
              <div class="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                Площа
              </div>
              <div
                class="text-lg font-bold text-purple-700 dark:text-purple-400"
              >
                {{ circleArea.toFixed(2) }}
              </div>
            </div>
            <div
              class="p-3 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 rounded-md"
            >
              <div class="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                Довжина
              </div>
              <div
                class="text-lg font-bold text-purple-700 dark:text-purple-400"
              >
                {{ circleCircumference.toFixed(2) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Rectangle -->
        <div v-else-if="selectedShape === 'rectangle'" class="space-y-3">
          <div>
            <label
              class="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 block"
            >
              Ширина
            </label>
            <input
              v-model.number="rectangleWidth"
              type="number"
              placeholder="10"
              class="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <div>
            <label
              class="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 block"
            >
              Висота
            </label>
            <input
              v-model.number="rectangleHeight"
              type="number"
              placeholder="20"
              class="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <div
            class="p-3 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 rounded-md"
          >
            <div class="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
              Площа
            </div>
            <div
              class="text-2xl font-bold text-purple-700 dark:text-purple-400"
            >
              {{ rectangleArea.toFixed(2) }}
            </div>
          </div>
        </div>

        <!-- Triangle -->
        <div v-else class="space-y-3">
          <div>
            <label
              class="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 block"
            >
              Основа
            </label>
            <input
              v-model.number="triangleBase"
              type="number"
              placeholder="10"
              class="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <div>
            <label
              class="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 block"
            >
              Висота
            </label>
            <input
              v-model.number="triangleHeight"
              type="number"
              placeholder="5"
              class="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <div
            class="p-3 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 rounded-md"
          >
            <div class="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
              Площа
            </div>
            <div
              class="text-2xl font-bold text-purple-700 dark:text-purple-400"
            >
              {{ triangleArea.toFixed(2) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Formulas Quick Access -->
      <div v-else-if="selectedTool === 'formulas'" class="space-y-2">
        <div
          v-for="formula in quickFormulas"
          :key="formula.label"
          class="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer group"
          @click="$emit('insert-formula', formula.code)"
        >
          <div class="text-sm font-medium text-zinc-900 dark:text-white mb-1">
            {{ formula.label }}
          </div>
          <code
            class="text-xs text-zinc-500 dark:text-zinc-400 font-mono group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
          >
            {{ formula.code }}
          </code>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { create, all } from "mathjs";

const emit = defineEmits(["close", "insert-formula"]);

const math = create(all);

// Available Tools
const availableTools = [
  {
    id: "converter",
    label: "Конвертер",
    description: "Одиниці виміру",
    icon: "ph:arrows-left-right",
  },
  {
    id: "geometry",
    label: "Геометрія",
    description: "Площа та периметр",
    icon: "ph:shapes",
  },
  {
    id: "formulas",
    label: "Формули",
    description: "Швидкий доступ",
    icon: "ph:function",
  },
];

const selectedTool = ref("converter");

// Converter
const conversionType = ref("length");
const inputValue = ref(100);
const fromUnit = ref("m");
const toUnit = ref("km");
const copied = ref(false);

const unitsByType = {
  length: [
    { value: "m", label: "м" },
    { value: "km", label: "км" },
    { value: "cm", label: "см" },
    { value: "mm", label: "мм" },
    { value: "ft", label: "фут" },
    { value: "mi", label: "миля" },
  ],
  weight: [
    { value: "kg", label: "кг" },
    { value: "g", label: "г" },
    { value: "mg", label: "мг" },
    { value: "lbs", label: "фунт" },
    { value: "oz", label: "унція" },
  ],
  temperature: [
    { value: "degC", label: "°C" },
    { value: "degF", label: "°F" },
    { value: "K", label: "K" },
  ],
  time: [
    { value: "s", label: "сек" },
    { value: "min", label: "хв" },
    { value: "h", label: "год" },
    { value: "day", label: "день" },
  ],
  data: [
    { value: "byte", label: "Б" },
    { value: "KB", label: "КБ" },
    { value: "MB", label: "МБ" },
    { value: "GB", label: "ГБ" },
    { value: "TB", label: "ТБ" },
  ],
};

const availableUnits = computed(() => {
  return unitsByType[conversionType.value as keyof typeof unitsByType] || [];
});

const convertedValue = computed(() => {
  try {
    if (!inputValue.value) return "0";
    const result = math.evaluate(
      `${inputValue.value} ${fromUnit.value} to ${toUnit.value}`,
    );
    return typeof result === "number" ? result.toFixed(2) : String(result);
  } catch {
    return "—";
  }
});

watch(conversionType, (newType) => {
  const units = unitsByType[newType as keyof typeof unitsByType];
  if (units.length >= 2) {
    fromUnit.value = units[0].value;
    toUnit.value = units[1].value;
  }
});

function copyResult() {
  navigator.clipboard.writeText(convertedValue.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

// Geometry
const selectedShape = ref("circle");
const circleRadius = ref(5);
const rectangleWidth = ref(10);
const rectangleHeight = ref(20);
const triangleBase = ref(10);
const triangleHeight = ref(5);

const geometryShapes = [
  { id: "circle", label: "Коло", icon: "ph:circle" },
  { id: "rectangle", label: "Прямокутник", icon: "ph:square" },
  { id: "triangle", label: "Трикутник", icon: "ph:triangle" },
];

const circleArea = computed(() => Math.PI * Math.pow(circleRadius.value, 2));
const circleCircumference = computed(() => 2 * Math.PI * circleRadius.value);
const rectangleArea = computed(
  () => rectangleWidth.value * rectangleHeight.value,
);
const triangleArea = computed(
  () => 0.5 * triangleBase.value * triangleHeight.value,
);

// Quick Formulas
const quickFormulas = [
  { label: "Площа кола", code: "pi * r^2" },
  { label: "Теорема Піфагора", code: "sqrt(a^2 + b^2)" },
  { label: "Квадратне рівняння", code: "(-b + sqrt(b^2 - 4*a*c)) / (2*a)" },
  { label: "Факторіал", code: "5!" },
  { label: "Середнє значення", code: "mean(1, 2, 3, 4, 5)" },
];
</script>
