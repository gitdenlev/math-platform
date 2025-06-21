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
const sidebarOpen = ref(false);

// Категорії довідника
const categories = [
  {
    id: "basic",
    name: "Основи",
    icon: "lucide:calculator",
    color: "emerald",
  },
  {
    id: "algebra",
    name: "Алгебра",
    icon: "lucide:function-square",
    color: "blue",
  },
  {
    id: "geometry",
    name: "Геометрія",
    icon: "lucide:shapes",
    color: "purple",
  },
  {
    id: "trigonometry",
    name: "Тригонометрія",
    icon: "lucide:waves",
    color: "orange",
  },
  {
    id: "calculus",
    name: "Мат. аналіз",
    icon: "lucide:trending-up",
    color: "red",
  },
  {
    id: "statistics",
    name: "Статистика",
    icon: "lucide:bar-chart-3",
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
        { expression: "2 + 3", description: "Додавання двох чисел" },
        { expression: "10 - 4", description: "Віднімання чисел" },
        { expression: "5 * 6", description: "Множення чисел" },
        { expression: "15 / 3", description: "Ділення чисел" },
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
        { expression: "log(10)", description: "Натуральний логарифм від 10" },
        { expression: "log10(100)", description: "Десятковий логарифм від 100" },
      ],
      mathjs: true,
    },
    {
      title: "Математичні константи",
      description: "Найважливіші математичні константи",
      formula: "π ≈ 3.14159, e ≈ 2.71828, φ ≈ 1.618",
      examples: [
        { expression: "pi", description: "Число π (пі)" },
        { expression: "e", description: "Число Ейлера" },
        { expression: "(1 + sqrt(5)) / 2", description: "Золота пропорція φ" },
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
          description: "Перший корінь для x² - 5x + 6 = 0",
        },
        {
          expression: "(-(-5) - sqrt((-5)^2 - 4*1*6)) / (2*1)",
          description: "Другий корінь для x² - 5x + 6 = 0",
        },
      ],
      theory:
        "Дискримінант D = b² - 4ac визначає кількість коренів: D > 0 - два корені, D = 0 - один корінь, D < 0 - немає дійсних коренів.",
      mathjs: true,
    },
    {
      title: "Арифметична прогресія",
      description: "Послідовність з постійною різницею між членами",
      formula: "aₙ = a₁ + (n-1)d",
      examples: [
        {
          expression: "2 + (10-1)*3",
          description: "10-й член прогресії: a₁=2, d=3",
        },
        {
          expression: "10 * (2 * 2 + (10-1) * 3) / 2",
          description: "Сума 10 членів прогресії: a₁=2, d=3",
        },
      ],
      theory:
        "Арифметична прогресія має постійну різницю d між сусідніми членами.",
      mathjs: true,
    },
  ],
  geometry: [
    {
      title: "Площі плоских фігур",
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
      description: "Синус, косинус, тангенс кута в радіанах",
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
      title: "Перетворення градусів у радіани",
      description: "Конвертація між градусами та радіанами",
      formula: "радіани = градуси × π/180",
      examples: [
        { expression: "90 * pi / 180", description: "90° в радіанах" },
        { expression: "cos(90 * pi / 180)", description: "cos(90°)" },
        { expression: "sin(45 * pi / 180)", description: "sin(45°)" },
      ],
      mathjs: true,
    },
  ],
  calculus: [
    {
      title: "Числове диференціювання",
      description: "Наближене обчислення похідних",
      formula: "f'(x) ≈ (f(x+h) - f(x))/h, h→0",
      examples: [
        {
          expression: "(sin(0.1) - sin(0)) / 0.1",
          description: "Наближення похідної sin(x) в точці 0",
        },
        {
          expression: "((1 + 0.001)^1000)",
          description: "Наближення числа e через границю",
        },
      ],
      theory:
        "Похідна показує швидкість зміни функції в даній точці.",
      mathjs: true,
    },
  ],
  statistics: [
    {
      title: "Середні значення",
      description: "Арифметичне та геометричне середнє",
      formula: "Арифм.: Σaᵢ/n, Геом.: ⁿ√(Πaᵢ)",
      examples: [
        {
          expression: "(2 + 4 + 6 + 8 + 10) / 5",
          description: "Арифметичне середнє чисел 2,4,6,8,10",
        },
        {
          expression: "nthRoot(2*4*6*8*10, 5)",
          description: "Геометричне середнє чисел 2,4,6,8,10",
        },
      ],
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
  sidebarOpen.value = false;
};

// Вибір теми
const selectTopic = (index: number) => {
  selectedTopic.value = index;
  sidebarOpen.value = false;
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

// Копіювання коду
const copyCode = async (code: string) => {
  try {
    await navigator.clipboard.writeText(code);
  } catch (err) {
    console.error('Помилка копіювання:', err);
  }
};
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex min-h-screen bg-gray-50">
      <!-- Мобільний overlay -->
      <div 
        v-if="sidebarOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        @click="sidebarOpen = false"
      ></div>

      <!-- Sidebar -->
      <div 
        :class="[
          'fixed lg:sticky top-0 left-0 h-screen w-80 bg-white border-r border-gray-200 z-50 transform transition-transform duration-200 lg:transform-none overflow-y-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        ]"
      >
       

        <!-- Пошук -->
        <div class="p-4 border-b border-gray-100">
          <div class="relative">
            <Icon
              name="lucide:search"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size="16"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Пошук..."
              class="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Категорії -->
        <div class="p-4">
          <div class="space-y-1">
            <div
              v-for="category in categories"
              :key="category.id"
              class="space-y-1"
            >
              <button
                @click="selectCategory(category.id)"
                :class="[
                  'w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  selectedCategory === category.id
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-700 hover:bg-gray-50'
                ]"
                class="cursor-pointer"
              >
                <Icon :name="category.icon" size="18" />
                {{ category.name }}
              </button>

              <!-- Підкатегорії -->
              <div 
                v-if="selectedCategory === category.id"
                class="ml-6 space-y-1 border-l-2 border-emerald-100 pl-4"
              >
                <button
                  v-for="(topic, index) in filteredContent"
                  :key="index"
                  @click="selectTopic(index)"
                  :class="[
                    'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                    selectedTopic === index
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'text-gray-600 hover:bg-gray-50'
                  ]"
                >
                  {{ topic.title }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Основний контент -->
      <div class="flex-1 lg:ml-0">
        <!-- Мобільна шапка -->
        <div class="lg:hidden bg-white border-b border-gray-200 p-4 sticky top-0 z-30">
          <div class="flex items-center gap-3">
            <button 
              @click="sidebarOpen = true"
              class="p-2 rounded-lg hover:bg-gray-100"
            >
              <Icon name="lucide:menu" size="20" />
            </button>
            <h1 class="font-semibold text-gray-900">Математичний довідник</h1>
          </div>
        </div>

        <!-- Контент -->
        <div class="p-6 lg:p-8 max-w-4xl">
          <div v-if="currentTopic" class="space-y-8">
            <!-- Заголовок -->
            <div class="space-y-4">
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <span>{{ categories.find(c => c.id === selectedCategory)?.name }}</span>
                <Icon name="lucide:chevron-right" size="16" />
                <span class="text-gray-900">{{ currentTopic.title }}</span>
              </div>
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">
                  {{ currentTopic.title }}
                </h1>
                <p class="text-xl text-gray-600">
                  {{ currentTopic.description }}
                </p>
              </div>
            </div>

            <!-- Формула -->
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                  <Icon name="lucide:function-square" size="18" />
                  Формула
                </h3>
              </div>
              <div class="p-6">
                <div class="bg-gray-900 text-white rounded-lg p-4 font-mono text-center text-lg">
                  {{ currentTopic.formula }}
                </div>
              </div>
            </div>

            <!-- Теорія -->
            <div 
              v-if="currentTopic.theory"
              class="bg-blue-50 border border-blue-200 rounded-xl p-6"
            >
              <h3 class="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Icon name="lucide:info" size="18" />
                Теоретичні відомості
              </h3>
              <p class="text-blue-800">{{ currentTopic.theory }}</p>
            </div>

            <!-- Приклади -->
            <div class="space-y-4">
              <h3 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Icon name="lucide:code" size="20" />
                Приклади використання
              </h3>
              
              <div class="grid gap-4">
                <div
                  v-for="(example, index) in currentTopic.examples"
                  :key="index"
                  class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <!-- Заголовок прикладу -->
                  <div class="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700">
                      {{ example.description }}
                    </span>
                    <div class="flex items-center gap-3">
                      <span class="text-sm text-gray-500">Результат:</span>
                      <span 
                        v-if="currentTopic.mathjs"
                        class="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-mono"
                      >
                        {{ calculateExample(example.expression) }}
                      </span>
                    </div>
                  </div>
                  
                  <!-- Код -->
                  <div class="relative">
                    <pre class="bg-gray-900 text-gray-100 p-6 overflow-x-auto"><code class="font-mono">{{ example.expression }}</code></pre>
                    <button
                      @click="copyCode(example.expression)"
                      class="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                      title="Копіювати код"
                    >
                      <Icon name="lucide:copy" class="text-gray-300" size="16" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Інтерактивний калькулятор -->
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                  <Icon name="lucide:calculator" size="18" />
                  Спробуйте самі
                </h3>
              </div>
              <div class="p-6 space-y-4">
                <div class="flex gap-3">
                  <input
                    v-model="calculatorExpression"
                    @keyup.enter="calculate"
                    type="text"
                    placeholder="Введіть математичний вираз..."
                    class="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono"
                  />
                  <button
                    @click="calculate"
                    class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Обчислити
                  </button>
                </div>
                <div 
                  v-if="calculatorResult"
                  class="p-4 bg-emerald-50 border border-emerald-200 rounded-lg"
                >
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:equal" class="text-emerald-600" size="16" />
                    <span class="font-mono text-emerald-800 font-semibold">
                      {{ calculatorResult }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Якщо нічого не знайдено -->
          <div v-else class="text-center py-12">
            <Icon name="lucide:search-x" class="text-gray-300 mx-auto mb-4" size="48" />
            <h3 class="text-xl font-semibold text-gray-500 mb-2">
              Нічого не знайдено
            </h3>
            <p class="text-gray-400">
              Спробуйте змінити пошуковий запит або оберіть іншу категорію
            </p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>