<script setup lang="ts">
useHead({
  title: "Довідник",
  meta: [
    {
      name: "description",
      content:
        "Повний математичний довідник Humanify з формулами, теоремами та інтерактивними прикладами",
    },
  ],
});

// Реактивні дані
const selectedCategory = ref("basic");
const selectedTopic = ref(0);
const searchQuery = ref("");
const calculatorExpression = ref("");
const calculatorResult = ref("");

// Категорії довідника
const categories = [
  {
    id: "basic",
    name: "Основи",
    icon: "mdi:calculator",
    color: "emerald",
  },
  {
    id: "algebra",
    name: "Алгебра",
    icon: "mdi:function-variant",
    color: "blue",
  },
  {
    id: "geometry",
    name: "Геометрія",
    icon: "mdi:shape",
    color: "purple",
  },
  {
    id: "trigonometry",
    name: "Тригонометрія",
    icon: "mdi:sine-wave",
    color: "orange",
  },
  {
    id: "calculus",
    name: "Мат. аналіз",
    icon: "mdi:chart-bell-curve-cumulative",
    color: "red",
  },
  {
    id: "statistics",
    name: "Статистика",
    icon: "mdi:chart-bar",
    color: "indigo",
  },
];

// Контент довідника
const referenceContent = {
  basic: [
    {
      title: "Основні арифметичні операції",
      description:
        "Додавання, віднімання, множення, ділення та піднесення до степеня",
      formula: "a + b, a - b, a × b, a ÷ b, a^b",
      examples: [
        { expression: "2 + 3", description: "Додавання" },
        { expression: "10 - 4", description: "Віднімання" },
        { expression: "5 * 6", description: "Множення" },
        { expression: "15 / 3", description: "Ділення" },
        { expression: "2^3", description: "Піднесення до степеня" },
      ],
      mathjs: true,
    },
    {
      title: "Корені та логарифми",
      description:
        "Квадратний корінь, корінь n-го степеня, натуральний та десятковий логарифми",
      formula: "√a, ∛a, ln(a), log₁₀(a)",
      examples: [
        { expression: "sqrt(16)", description: "Квадратний корінь з 16" },
        { expression: "nthRoot(27, 3)", description: "Кубічний корінь з 27" },
        { expression: "log(10)", description: "Натуральний логарифм" },
        { expression: "log10(100)", description: "Десятковий логарифм" },
      ],
      mathjs: true,
    },
    {
      title: "Константи",
      description: "Математичні константи: число π, число e, золота пропорція",
      formula: "π ≈ 3.14159, e ≈ 2.71828, φ ≈ 1.618",
      examples: [
        { expression: "pi", description: "Число π (пі)" },
        { expression: "e", description: "Число Ейлера" },
        { expression: "(1 + sqrt(5)) / 2", description: "Золота пропорція" },
      ],
      mathjs: true,
    },
  ],
  algebra: [
    {
      title: "Квадратне рівняння",
      description: "Розв'язання рівняння виду ax² + bx + c = 0",
      formula: "x = (-b ± √(b² - 4ac)) / 2a",
      examples: [
        {
          expression: "(-(-5) + sqrt((-5)^2 - 4*1*6)) / (2*1)",
          description: "x₁ для x² - 5x + 6 = 0",
        },
        {
          expression: "(-(-5) - sqrt((-5)^2 - 4*1*6)) / (2*1)",
          description: "x₂ для x² - 5x + 6 = 0",
        },
      ],
      theory:
        "Дискримінант D = b² - 4ac визначає кількість коренів: D > 0 - два корені, D = 0 - один корінь, D < 0 - немає дійсних коренів.",
      mathjs: true,
    },
    {
      title: "Прогресії",
      description: "Арифметична та геометрична прогресії",
      formula: "Арифм.: aₙ = a₁ + (n-1)d, Геом.: aₙ = a₁ × r^(n-1)",
      examples: [
        {
          expression: "2 + (10-1)*3",
          description: "10-й член арифм. прогресії: a₁=2, d=3",
        },
        {
          expression: "5 * 2^(6-1)",
          description: "6-й член геом. прогресії: a₁=5, r=2",
        },
      ],
      theory:
        "Арифметична прогресія має постійну різницю між сусідніми членами, геометрична - постійне відношення.",
      mathjs: true,
    },
  ],
  geometry: [
    {
      title: "Площі фігур",
      description: "Формули для обчислення площ основних геометричних фігур",
      formula: "Коло: S = πr², Квадрат: S = a², Трикутник: S = ½ah",
      examples: [
        { expression: "pi * 5^2", description: "Площа кола з радіусом 5" },
        { expression: "10^2", description: "Площа квадрата зі стороною 10" },
        {
          expression: "0.5 * 8 * 6",
          description: "Площа трикутника: основа 8, висота 6",
        },
      ],
      mathjs: true,
    },
    {
      title: "Об'єми тіл",
      description: "Формули для обчислення об'ємів тривимірних тіл",
      formula: "Куб: V = a³, Сфера: V = 4/3πr³, Циліндр: V = πr²h",
      examples: [
        { expression: "7^3", description: "Об'єм куба з ребром 7" },
        {
          expression: "(4/3) * pi * 3^3",
          description: "Об'єм сфери з радіусом 3",
        },
        {
          expression: "pi * 4^2 * 10",
          description: "Об'єм циліндра: r=4, h=10",
        },
      ],
      mathjs: true,
    },
    {
      title: "Теорема Піфагора",
      description: "Співвідношення між сторонами прямокутного трикутника",
      formula: "c² = a² + b²",
      examples: [
        {
          expression: "sqrt(3^2 + 4^2)",
          description: "Гіпотенуза при катетах 3 і 4",
        },
        {
          expression: "sqrt(13^2 - 5^2)",
          description: "Катет при гіпотенузі 13 і катеті 5",
        },
      ],
      theory:
        "У прямокутному трикутнику квадрат гіпотенузи дорівнює сумі квадратів катетів.",
      mathjs: true,
    },
  ],
  trigonometry: [
    {
      title: "Основні тригонометричні функції",
      description: "Синус, косинус, тангенс та їх значення",
      formula: "sin(α), cos(α), tan(α) = sin(α)/cos(α)",
      examples: [
        { expression: "sin(pi/6)", description: "sin(30°) = sin(π/6)" },
        { expression: "cos(pi/4)", description: "cos(45°) = cos(π/4)" },
        { expression: "tan(pi/3)", description: "tan(60°) = tan(π/3)" },
      ],
      theory:
        "Тригонометричні функції описують співвідношення між сторонами і кутами у прямокутному трикутнику.",
      mathjs: true,
    },
    {
      title: "Обернені тригонометричні функції",
      description: "Арксинус, арккосинус, арктангенс",
      formula: "arcsin(x), arccos(x), arctan(x)",
      examples: [
        { expression: "asin(0.5)", description: "arcsin(0.5) в радіанах" },
        {
          expression: "acos(sqrt(2)/2)",
          description: "arccos(√2/2) в радіанах",
        },
        { expression: "atan(1)", description: "arctan(1) в радіанах" },
      ],
      mathjs: true,
    },
  ],
  calculus: [
    {
      title: "Границі",
      description: "Основні границі та їх обчислення",
      formula: "lim(x→a) f(x)",
      examples: [
        {
          expression: "(sin(0.1) - sin(0)) / 0.1",
          description: "Наближення похідної sin(x) в точці 0",
        },
        {
          expression: "((1 + 1/1000)^1000)",
          description: "Наближення числа e",
        },
      ],
      theory:
        "Границя описує поведінку функції при наближенні аргументу до певного значення.",
      mathjs: true,
    },
    {
      title: "Похідні основних функцій",
      description: "Формули диференціювання",
      formula: "d/dx[xⁿ] = n·xⁿ⁻¹, d/dx[sin(x)] = cos(x)",
      examples: [
        { expression: "3 * 5^2", description: "Похідна x³ в точці x=5: 3x²" },
        { expression: "cos(pi/4)", description: "Похідна sin(x) в точці π/4" },
      ],
      theory: "Похідна показує швидкість зміни функції в даній точці.",
      mathjs: true,
    },
  ],
  statistics: [
    {
      title: "Середні значення",
      description: "Арифметичне, геометричне та гармонічне середнє",
      formula: "Арифм.: (a₁+a₂+...+aₙ)/n, Геом.: ⁿ√(a₁×a₂×...×aₙ)",
      examples: [
        {
          expression: "(2 + 4 + 6 + 8 + 10) / 5",
          description: "Арифметичне середнє",
        },
        {
          expression: "nthRoot(2*4*6*8*10, 5)",
          description: "Геометричне середнє",
        },
      ],
      mathjs: true,
    },
    {
      title: "Ймовірність",
      description: "Основні формули теорії ймовірностей",
      formula:
        "P(A) = m/n, де m - кількість сприятливих подій, n - загальна кількість",
      examples: [
        {
          expression: "6 / 36",
          description: "Ймовірність суми 7 при киданні двох кубиків",
        },
        {
          expression: "combinations(52, 5)",
          description: "Кількість способів вибрати 5 карт з 52",
        },
      ],
      theory:
        "Ймовірність події - це міра можливості її настання, значення від 0 до 1.",
      mathjs: true,
    },
  ],
};

// Обчислення виразу з Math.js
const calculate = () => {
  try {
    if (calculatorExpression.value.trim()) {
      const result = math.evaluate(calculatorExpression.value);
      calculatorResult.value = math.format(result, { precision: 10 });
    }
  } catch (error) {
    calculatorResult.value = "Помилка: " + error.message;
  }
};

// Вибір категорії
const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId;
  selectedTopic.value = 0;
};

// Вибір теми
const selectTopic = (index: number) => {
  selectedTopic.value = index;
};

// Обчислення прикладу
const calculateExample = (expression: string) => {
  try {
    const result = math.evaluate(expression);
    return math.format(result, { precision: 6 });
  } catch (error) {
    return "Помилка";
  }
};

// Фільтрація контенту за пошуковим запитом
const filteredContent = computed(() => {
  if (!searchQuery.value.trim()) {
    return referenceContent[selectedCategory.value];
  }

  const query = searchQuery.value.toLowerCase();
  return referenceContent[selectedCategory.value].filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.formula.toLowerCase().includes(query)
  );
});

// Поточна тема
const currentTopic = computed(() => {
  return filteredContent.value[selectedTopic.value] || filteredContent.value[0];
});
</script>

<template>
  <NuxtLayout name="default">
    <!-- Заголовок сторінки -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-6">
        <div
          class="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center"
        >
          <Icon name="mdi:book-open-page-variant" class="text-2xl text-white" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-emerald-600">
            Математичний довідник
          </h1>
          <p class="text-gray-600">
            Повний збірник формул, теорем та інтерактивних прикладів
          </p>
        </div>
      </div>

      <!-- Пошук -->
      <div class="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div class="relative">
          <Icon
            name="mdi:magnify"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Пошук формул, теорем або понять..."
            class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Бічна панель з категоріями -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl p-6 shadow-sm sticky top-30">
          <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Icon name="mdi:folder-outline" />
            Категорії
          </h3>
          <div class="space-y-2">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="selectCategory(category.id)"
              :class="[
                'w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3',
                selectedCategory === category.id
                  ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-200'
                  : 'hover:bg-gray-50 text-gray-700',
              ]"
            >
              <Icon :name="category.icon" class="text-xl" />
              <span class="font-medium">{{ category.name }}</span>
            </button>
          </div>

          <!-- Список тем в категорії -->
          <div class="mt-6 pt-6 border-t">
            <h4 class="font-medium text-gray-600 mb-3">Теми в категорії:</h4>
            <div class="space-y-1">
              <button
                v-for="(topic, index) in filteredContent"
                :key="index"
                @click="selectTopic(index)"
                :class="[
                  'w-full text-left p-2 rounded text-sm transition-all duration-200',
                  selectedTopic === index
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'hover:bg-gray-50 text-gray-600',
                ]"
              >
                {{ topic.title }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Основний контент -->
      <div class="lg:col-span-3">
        <div
          v-if="currentTopic"
          class="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <!-- Заголовок теми -->
          <div class="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-b">
            <h2 class="text-2xl font-bold text-emerald-700 mb-2">
              {{ currentTopic.title }}
            </h2>
            <p class="text-gray-600">{{ currentTopic.description }}</p>
          </div>

          <div class="p-6">
            <!-- Формула -->
            <div class="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 class="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Icon name="mdi:function" />
                Формула
              </h3>
              <div
                class="font-mono text-lg text-center p-4 bg-white rounded-lg border-2 border-emerald-200"
              >
                {{ currentTopic.formula }}
              </div>
            </div>

            <!-- Теорія (якщо є) -->
            <div
              v-if="currentTopic.theory"
              class="bg-blue-50 rounded-xl p-6 mb-6"
            >
              <h3 class="font-bold text-blue-800 mb-3 flex items-center gap-2">
                <Icon name="mdi:information" />
                Теоретичні відомості
              </h3>
              <p class="text-blue-700">{{ currentTopic.theory }}</p>
            </div>

            <!-- Приклади -->
            <div class="mb-6">
              <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon name="mdi:lightbulb-outline" />
                Інтерактивні приклади
              </h3>
              <div class="grid gap-4">
                <div
                  v-for="(example, index) in currentTopic.examples"
                  :key="index"
                  class="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-600">{{
                      example.description
                    }}</span>
                    <div class="flex items-center gap-2">
                      <Icon name="mdi:equal" class="text-emerald-600" />
                      <span
                        v-if="currentTopic.mathjs"
                        class="font-mono font-bold text-emerald-700"
                      >
                        {{ calculateExample(example.expression) }}
                      </span>
                    </div>
                  </div>
                  <div class="font-mono bg-gray-100 rounded-lg p-3 text-center">
                    {{ example.expression }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Якщо нічого не знайдено -->
        <div v-else class="p-12 text-center">
          <Icon name="mdi:magnify" class="text-6xl text-gray-300 mb-4" />
          <h3 class="text-xl font-bold text-gray-500 mb-2">
            Нічого не знайдено
          </h3>
          <p class="text-gray-400">
            Спробуйте змінити пошуковий запит або оберіть іншу категорію
          </p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
