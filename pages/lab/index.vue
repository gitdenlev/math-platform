<script setup lang="ts">
useHead({
  title: "Лабораторія - Humanify",
  meta: [
    {
      name: "description",
      content: "Експериментальна лабораторія Humanify - досліджуйте математичні концепції через інтерактивне програмування та візуалізацію",
    },
  ],
});

// Реактивні дані для редактора коду
const code = ref(`# Обчисліть площу кола
import math

radius = 5
area = math.pi * radius ** 2
print(f"Площа кола з радіусом {radius} = {area:.2f}")

# Спробуйте змінити радіус!`);

const output = ref('');
const isRunning = ref(false);
const selectedCategory = ref('geometry');
const selectedExample = ref(0);

// Категорії задач
const categories = [
  { 
    id: 'geometry', 
    name: 'Геометрія', 
    icon: 'mdi:shape',
    color: 'emerald'
  },
  { 
    id: 'algebra', 
    name: 'Алгебра', 
    icon: 'mdi:function-variant',
    color: 'blue'
  },
  { 
    id: 'calculus', 
    name: 'Математичний аналіз', 
    icon: 'mdi:chart-bell-curve-cumulative',
    color: 'purple'
  },
  { 
    id: 'statistics', 
    name: 'Статистика', 
    icon: 'mdi:chart-bar',
    color: 'orange'
  }
];

// Приклади для кожної категорії
const examples = {
  geometry: [
    {
      title: "Площа кола",
      description: "Обчислення площі кола за радіусом",
      code: `import math

radius = 5
area = math.pi * radius ** 2
print(f"Площа кола з радіусом {radius} = {area:.2f}")

# Спробуйте змінити радіус!`
    },
    {
      title: "Теорема Піфагора",
      description: "Знаходження гіпотенузи прямокутного трикутника",
      code: `import math

a = 3  # перший катет
b = 4  # другий катет

c = math.sqrt(a**2 + b**2)
print(f"Гіпотенуза = {c}")

# Перевірка: 3² + 4² = 5²
print(f"Перевірка: {a}² + {b}² = {a**2} + {b**2} = {a**2 + b**2}")
print(f"c² = {c**2}")`
    }
  ],
  algebra: [
    {
      title: "Квадратне рівняння",
      description: "Розв'язання квадратного рівняння ax² + bx + c = 0",
      code: `import math

# Коефіцієнти квадратного рівняння ax² + bx + c = 0
a = 1
b = -5
c = 6

# Дискримінант
discriminant = b**2 - 4*a*c
print(f"Дискримінант: {discriminant}")

if discriminant > 0:
    x1 = (-b + math.sqrt(discriminant)) / (2*a)
    x2 = (-b - math.sqrt(discriminant)) / (2*a)
    print(f"Корені: x1 = {x1}, x2 = {x2}")
elif discriminant == 0:
    x = -b / (2*a)
    print(f"Єдиний корінь: x = {x}")
else:
    print("Рівняння не має дійсних коренів")`
    },
    {
      title: "Послідовність Фібоначчі",
      description: "Генерація чисел Фібоначчі",
      code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Виведемо перші 10 чисел Фібоначчі
print("Числа Фібоначчі:")
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")

# Більш ефективний спосіб
def fibonacci_iterative(n):
    a, b = 0, 1
    sequence = [a, b]
    for _ in range(2, n):
        a, b = b, a + b
        sequence.append(b)
    return sequence

print("\\nПерші 15 чисел (ефективно):")
print(fibonacci_iterative(15))`
    }
  ],
  calculus: [
    {
      title: "Похідна функції",
      description: "Числове обчислення похідної",
      code: `def derivative(f, x, h=1e-5):
    """Числове обчислення похідної функції f в точці x"""
    return (f(x + h) - f(x - h)) / (2 * h)

# Функція f(x) = x²
def f(x):
    return x**2

# Обчислимо похідну в точці x = 3
x = 3
df_dx = derivative(f, x)
analytical = 2 * x  # аналітична похідна 2x

print(f"f(x) = x²")
print(f"Числова похідна в x = {x}: {df_dx:.6f}")
print(f"Аналітична похідна в x = {x}: {analytical}")
print(f"Похибка: {abs(df_dx - analytical):.2e}")`
    }
  ],
  statistics: [
    {
      title: "Основні статистики",
      description: "Обчислення середнього, медіани та стандартного відхилення",
      code: `import math

data = [2, 4, 4, 4, 5, 5, 7, 9]

# Середнє арифметичне
mean = sum(data) / len(data)
print(f"Середнє: {mean}")

# Медіана
sorted_data = sorted(data)
n = len(sorted_data)
if n % 2 == 0:
    median = (sorted_data[n//2-1] + sorted_data[n//2]) / 2
else:
    median = sorted_data[n//2]
print(f"Медіана: {median}")

# Стандартне відхилення
variance = sum((x - mean)**2 for x in data) / len(data)
std_dev = math.sqrt(variance)
print(f"Стандартне відхилення: {std_dev:.2f}")

print(f"\\nДані: {data}")
print(f"Відсортовані: {sorted_data}")`
    }
  ]
};

// Вибір категорії
const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId;
  selectedExample.value = 0;
  loadExample(0);
};

// Завантаження прикладу
const loadExample = (index: number) => {
  selectedExample.value = index;
  const example = examples[selectedCategory.value][index];
  if (example) {
    code.value = example.code;
    output.value = '';
  }
};

// Імітація виконання коду
const runCode = async () => {
  isRunning.value = true;
  output.value = 'Виконується код...';
  
  // Імітація затримки виконання
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Імітація результату (в реальному додатку тут буде виклик інтерпретатора)
  try {
    if (code.value.includes('print')) {
      output.value = `Площа кола з радіусом 5 = 78.54
Гіпотенуза = 5.0
Перевірка: 3² + 4² = 9 + 16 = 25
c² = 25.0`;
    } else {
      output.value = 'Код виконано успішно!';
    }
  } catch (error) {
    output.value = 'Помилка виконання коду';
  }
  
  isRunning.value = false;
};

// Очищення редактора
const clearCode = () => {
  code.value = '# Напишіть свій код тут\n';
  output.value = '';
};

// Збереження коду
const saveCode = () => {
  // В реальному додатку тут буде збереження в базу даних
  alert('Код збережено у ваш профіль!');
};
</script>

<template>
  <NuxtLayout name="default">
    <!-- Заголовок сторінки -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
          <Icon name="mdi:flask-outline" class="text-2xl text-white" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-emerald-600">Математична лабораторія</h1>
          <p class="text-gray-600">Експериментуйте з математичними концепціями в безпечному середовищі</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Бічна панель з категоріями та прикладами -->
      <div class="lg:col-span-1">
        <!-- Категорії -->
        <div class="bg-white rounded-xl p-6 shadow-sm mb-6">
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
                  : 'hover:bg-gray-50 text-gray-700'
              ]"
            >
              <Icon :name="category.icon" class="text-xl" />
              <span class="font-medium">{{ category.name }}</span>
            </button>
          </div>
        </div>

        <!-- Приклади -->
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Icon name="mdi:lightbulb-outline" />
            Приклади
          </h3>
          <div class="space-y-2">
            <button 
              v-for="(example, index) in examples[selectedCategory]" 
              :key="index"
              @click="loadExample(index)"
              :class="[
                'w-full text-left p-3 rounded-lg transition-all duration-200',
                selectedExample === index 
                  ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-200' 
                  : 'hover:bg-gray-50 text-gray-700'
              ]"
            >
              <div class="font-medium text-sm">{{ example.title }}</div>
              <div class="text-xs text-gray-500 mt-1">{{ example.description }}</div>
            </button>
          </div>
        </div>
      </div>

      <!-- Основна область з редактором -->
      <div class="lg:col-span-3">
        <!-- Панель інструментів -->
        <div class="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <Icon name="mdi:code-braces" class="text-emerald-600 text-xl" />
              <span class="font-medium text-gray-700">JavaScript Playground</span>
            </div>
            <div class="flex items-center gap-2">
              <button 
                @click="runCode" 
                :disabled="isRunning"
                class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
              >
                <Icon :name="isRunning ? 'mdi:loading' : 'mdi:play'" :class="isRunning ? 'animate-spin' : ''" />
                {{ isRunning ? 'Виконується...' : 'Запустити' }}
              </button>
              <button 
                @click="clearCode"
                class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
              >
                <Icon name="mdi:delete-outline" />
                Очистити
              </button>
              <button 
                @click="saveCode"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
              >
                <Icon name="mdi:content-save" />
                Зберегти
              </button>
            </div>
          </div>
        </div>

        <!-- Редактор коду -->
        <div class="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div class="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
            <span class="text-sm font-medium">Редактор коду</span>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div class="relative">
            <textarea 
              v-model="code"
              class="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-white resize-none focus:outline-none"
              placeholder="# Напишіть свій код тут..."
              spellcheck="false"
            ></textarea>
          </div>
        </div>

        <!-- Область виводу -->
        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
          <div class="bg-gray-100 px-4 py-2 border-b">
            <span class="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Icon name="mdi:console" />
              Результат виконання
            </span>
          </div>
          <div class="p-4">
            <pre v-if="output" class="font-mono text-sm text-gray-800 whitespace-pre-wrap">{{ output }}</pre>
            <div v-else class="text-gray-500 italic">Натисніть "Запустити", щоб побачити результат</div>
          </div>
        </div>

        <!-- Підказки -->
        <div class="mt-6 bg-blue-50 rounded-xl p-6">
          <h3 class="font-bold text-blue-800 mb-3 flex items-center gap-2">
            <Icon name="mdi:information" />
            Підказки для роботи в лабораторії
          </h3>
          <ul class="space-y-2 text-blue-700">
            <li class="flex items-start gap-2">
              <Icon name="mdi:arrow-right" class="mt-1 flex-shrink-0" />
              <span>Оберіть категорію і приклад зліва, щоб почати експериментувати</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon name="mdi:arrow-right" class="mt-1 flex-shrink-0" />
              <span>Змінюйте значення змінних і дивіться, як це впливає на результат</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon name="mdi:arrow-right" class="mt-1 flex-shrink-0" />
              <span>Використовуйте функції print() для виведення проміжних результатів</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon name="mdi:arrow-right" class="mt-1 flex-shrink-0" />
              <span>Збережіть цікаві експерименти у свій профіль</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>