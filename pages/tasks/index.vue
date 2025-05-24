<script setup lang="ts">
import type { CategoryTask, ProblemDifficulty } from "~/types";
import { ref, computed } from "vue";

// Типи для категорій та складності задач
interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  difficulty: ProblemDifficulty;
  completionRate: number;
  solvedCount: number;
  timeEstimate: number;
}

const categories = ref([
  { id: "arithmetic", name: "Арифметика", icon: "mdi:calculator" },
  { id: "algebra", name: "Алгебра", icon: "mdi:function" },
  { id: "geometry", name: "Геометрія", icon: "mdi:shape" },
  { id: "calculus", name: "Математичний аналіз", icon: "mdi:chart-bell-curve" },
  { id: "statistics", name: "Статистика", icon: "mdi:chart-box" },
  { id: "discrete", name: "Дискретна математика", icon: "mdi:graph" },
]);

const difficultyLevels = ref([
  { value: "easy", label: "Легкий", color: "primary" },
  { value: "medium", label: "Середній", color: "warning" },
  { value: "hard", label: "Складний", color: "error" },
]);

// Задачі
const tasks = ref<Task[]>([
  {
    id: 1,
    title: "Порахувати суму чисел",
    description:
      "Напишіть функцію для розв'язання лінійних рівнянь виду ax + b = c",
    category: "algebra",
    tags: ["арифметика"],
    difficulty: "easy",
    completionRate: 0,
    solvedCount: 2345,
    timeEstimate: 10,
  },
  {
    id: 2,
    title: "Обчислення площі трикутника",
    description:
      "Реалізуйте функцію для обчислення площі трикутника за координатами його вершин",
    category: "geometry",
    tags: ["трикутник", "площа", "координати"],
    difficulty: "medium",
    completionRate: 65,
    solvedCount: 1852,
    timeEstimate: 15,
  },
  {
    id: 3,
    title: "Знаходження НСД і НСК",
    description:
      "Створіть алгоритм для знаходження найбільшого спільного дільника та найменшого спільного кратного двох чисел",
    category: "arithmetic",
    tags: ["НСД", "НСК", "алгоритм Евкліда"],
    difficulty: "easy",
    completionRate: 82,
    solvedCount: 3102,
    timeEstimate: 12,
  },
  {
    id: 4,
    title: "Обчислення визначеного інтеграла",
    description:
      "Розробіть функцію для наближеного обчислення визначеного інтеграла за методом трапецій",
    category: "calculus",
    tags: ["інтеграл", "метод трапецій", "числові методи"],
    difficulty: "hard",
    completionRate: 43,
    solvedCount: 876,
    timeEstimate: 25,
  },
  {
    id: 5,
    title: "Знаходження медіани і моди набору даних",
    description:
      "Напишіть програму для обчислення медіани та моди для заданого набору числових даних",
    category: "statistics",
    tags: ["медіана", "мода", "статистика"],
    difficulty: "medium",
    completionRate: 59,
    solvedCount: 1423,
    timeEstimate: 18,
  },
  {
    id: 6,
    title: "Алгоритм пошуку в графі",
    description:
      "Реалізуйте алгоритм пошуку в ширину для знаходження найкоротшого шляху в графі",
    category: "discrete",
    tags: ["граф", "BFS", "шлях", "алгоритми"],
    difficulty: "hard",
    completionRate: 37,
    solvedCount: 645,
    timeEstimate: 30,
  },
  {
    id: 7,
    title: "Розв'язання системи лінійних рівнянь",
    description:
      "Створіть програму для розв'язання системи лінійних рівнянь методом Гаусса",
    category: "algebra",
    tags: ["системи рівнянь", "метод Гаусса", "матриці"],
    difficulty: "hard",
    completionRate: 41,
    solvedCount: 728,
    timeEstimate: 28,
  },
  {
    id: 8,
    title: "Обчислення скалярного добутку векторів",
    description:
      "Реалізуйте функцію для обчислення скалярного добутку двох векторів у n-вимірному просторі",
    category: "geometry",
    tags: ["вектори", "скалярний добуток", "лінійна алгебра"],
    difficulty: "medium",
    completionRate: 68,
    solvedCount: 1562,
    timeEstimate: 15,
  },
  {
    id: 9,
    title: "Перевірка числа на простоту",
    description:
      "Розробіть ефективний алгоритм для перевірки, чи є задане число простим",
    category: "arithmetic",
    tags: ["прості числа", "алгоритми", "теорія чисел"],
    difficulty: "medium",
    completionRate: 74,
    solvedCount: 2018,
    timeEstimate: 20,
  },
]);

// Стан фільтрів
const searchQuery = ref("");
const selectedCategories = ref<string[]>([]);
const selectedDifficulty = ref<string[]>([]);

// Сортування
const sortBy = ref("popularity"); // popularity, difficulty, newest
const sortOrder = ref("desc"); // asc, desc

// Фільтрація задач
const filteredTasks = computed(() => {
  return tasks.value.filter((task) => {
    // Фільтр за пошуковим запитом
    const matchesSearch =
      searchQuery.value === "" ||
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      task.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      task.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.value.toLowerCase())
      );

    // Фільтр за категоріями
    const matchesCategory =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.includes(task.category);

    // Фільтр за складністю
    const matchesDifficulty =
      selectedDifficulty.value.length === 0 ||
      selectedDifficulty.value.includes(task.difficulty);

    return matchesSearch && matchesCategory && matchesDifficulty;
  });
});

// Відсортовані задачі
const sortedTasks = computed(() => {
  return [...filteredTasks.value].sort((a, b) => {
    let comparison = 0;

    if (sortBy.value === "popularity") {
      comparison = b.solvedCount - a.solvedCount;
    } else if (sortBy.value === "difficulty") {
      const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
      comparison =
        difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    } else if (sortBy.value === "completion") {
      comparison = b.completionRate - a.completionRate;
    }

    return sortOrder.value === "asc" ? comparison * -1 : comparison;
  });
});

// Методи для взаємодії з фільтрами
const toggleCategory = (categoryId: string) => {
  if (selectedCategories.value.includes(categoryId)) {
    selectedCategories.value = selectedCategories.value.filter(
      (id) => id !== categoryId
    );
  } else {
    selectedCategories.value.push(categoryId);
  }
};

const toggleDifficulty = (difficulty: string) => {
  if (selectedDifficulty.value.includes(difficulty)) {
    selectedDifficulty.value = selectedDifficulty.value.filter(
      (d) => d !== difficulty
    );
  } else {
    selectedDifficulty.value.push(difficulty);
  }
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedCategories.value = [];
  selectedDifficulty.value = [];
};

const getDifficultyColor = (difficulty: string): string => {
  const difficultyItem = difficultyLevels.value.find(
    (d) => d.value === difficulty
  );
  return difficultyItem ? difficultyItem.color : "gray";
};

// Заголовок сторінки
useHead({
  title: "Humanify - Математичні задачі",
  meta: [
    {
      name: "description",
      content:
        "Математичні задачі різного рівня складності з можливістю розв'язання за допомогою бібліотеки Math.js.",
    },
  ],
});
</script>

<template>
  <Header />
  <NuxtLayout name="default">
    <!-- Hero Section з анімованим фоном -->
    <section class="relative overflow-hidden">
      <div class="text-center py-12 relative z-10">
        <h1
          class="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent leading-tight"
        >
          Математичні задачі
        </h1>
        <p class="mt-6 text-lg md:text-xl max-w-3xl mx-auto font-light">
          Удосконалюйте свої навички з алгебри, геометрії, математичного аналізу
          та інших розділів математики за допомогою інтерактивних задач
        </p>

        <!-- Статистика -->
        <div class="flex flex-wrap justify-center gap-8 mt-10">
          <div class="text-center">
            <div
              class="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent"
            >
              9+
            </div>
            <div class="text-sm mt-1">Задач</div>
          </div>
          <div class="text-center">
            <div
              class="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent"
            >
              6
            </div>
            <div class="text-sm mt-1">Категорій</div>
          </div>
          <div class="text-center">
            <div
              class="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent"
            >
              3
            </div>
            <div class="text-sm mt-1">Рівні складності</div>
          </div>
        </div>
      </div>

      <!-- Фільтри та пошук -->
      <div
        class="bg-white rounded-2xl shadow-lg p-6 mb-12 backdrop-blur-sm bg-white/80 border border-gray-100"
      >
        <div
          class="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-6"
        >
          <div class="w-full md:w-1/3">
            <UInput
              v-model="searchQuery"
              icon="mdi:magnify"
              placeholder="Пошук за назвою"
              size="xl"
              color="emerald"
            />
          </div>

          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="category in categories"
              :key="category.id"
              :variant="
                selectedCategories.includes(category.id) ? 'solid' : 'outline'
              "
              color="emerald"
              @click="toggleCategory(category.id)"
              size="sm"
              class="mb-1 transition-all duration-300"
            >
              <template #leading>
                <Icon :name="category.icon" />
              </template>
              {{ category.name }}
            </UButton>
          </div>
        </div>

        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="level in difficultyLevels"
              :key="level.value"
              :variant="
                selectedDifficulty.includes(level.value) ? 'solid' : 'outline'
              "
              :color="level.color"
              @click="toggleDifficulty(level.value)"
              size="sm"
              class="transition-all duration-300"
            >
              {{ level.label }}
            </UButton>
          </div>

          <div class="flex flex-col md:flex-row items-center gap-3">
            <div class="flex items-center gap-2">
              <span class="text-sm">Сортувати за:</span>
              <USelect
                v-model="sortBy"
                :options="[
                  { value: 'popularity', label: 'Популярністю' },
                  { value: 'difficulty', label: 'Складністю' },
                  { value: 'completion', label: 'Успішністю рішень' },
                ]"
                size="sm"
                class="min-w-[140px]"
              />
            </div>

            <UButton
              @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
              variant="ghost"
              size="sm"
              :icon="
                sortOrder === 'asc'
                  ? 'mdi:sort-ascending'
                  : 'mdi:sort-descending'
              "
              class="hover:bg-emerald-50"
            />

            <UButton
              @click="resetFilters"
              variant="ghost"
              size="sm"
              icon="mdi:filter-remove"
              class="hover:bg-emerald-50"
            />
          </div>
        </div>
      </div>

      <!-- Список задач з покращеним дизайном -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <div
          v-for="task in sortedTasks"
          :key="task.id"
          class="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
        >
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div
                class="p-3 bg-emerald-100 rounded-lg inline-flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
              >
                <Icon
                  :name="
                    categories.find((c) => c.id === task.category)?.icon ||
                    'mdi:math'
                  "
                  class="text-xl text-emerald-600"
                />
              </div>

              <UBadge size="md">
                {{
                  difficultyLevels.find((d) => d.value === task.difficulty)
                    ?.label
                }}
              </UBadge>
            </div>

            <h3
              class="text-xl font-bold mb-3 group-hover:text-emerald-700 transition-colors duration-300"
            >
              {{ task.title }}
            </h3>
            <p class="text-sm mb-4 line-clamp-3">{{ task.description }}</p>

            <div class="flex flex-wrap gap-2 mb-4">
              <UBadge
                icon="ri:hashtag"
                v-for="(tag, tagIndex) in task.tags"
                :key="tagIndex"
                size="md"
              >
                {{ tag }}
              </UBadge>
            </div>
          </div>

          <div class="mt-auto p-4 pt-3 border-t border-gray-100 bg-gray-50/80">
            <UBadge icon="ri:timer-fill" size="md">
              <span>{{ task.timeEstimate }} хвилин</span>
            </UBadge>

            <UButton block :to="`/tasks/${task.id}`" class="mt-4">
              Розв'язати задачу
            </UButton>
          </div>
        </div>
      </div>

      <!-- Відображення коли немає знайдених задач -->
      <div
        v-if="sortedTasks.length === 0"
        class="text-center py-16 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100"
      >
        <div class="mb-6 text-gray-300 animate-pulse">
          <Icon name="mdi:magnify-empty" size="80" />
        </div>
        <h3 class="text-2xl font-bold mb-2">Задачі не знайдено</h3>
        <p class="max-w-md mx-auto mb-8">
          Спробуйте змінити параметри пошуку або фільтри
        </p>
        <UButton
          @click="resetFilters"
          color="emerald"
          variant="outline"
          class="transition-all duration-300 hover:scale-105"
        >
          <Icon name="mdi:refresh" class="mr-2" />
          Скинути всі фільтри
        </UButton>
      </div>

      <!-- Пагінація -->
      <div class="flex justify-center mt-12">
        <UPagination
          v-if="sortedTasks.length > 0"
          :total="Math.ceil(sortedTasks.length / 9)"
          :default-page="1"
          :ui="{ rounded: 'rounded-lg' }"
          class="shadow-sm"
        />
      </div>
    </section>

  </NuxtLayout>
</template>

<style scoped>
/* Додаткові стилі для анімацій та ефектів */
.u-button {
  transition: all 0.2s ease;
}

.u-button:hover {
  transform: translateY(-2px);
}

/* Градієнтний текст для Firefox */
@-moz-document url-prefix() {
  .bg-gradient-to-r.bg-clip-text.text-transparent {
    color: #047857; /* fallback for Firefox */
  }
}

/* Анімація для елементів сторінки */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Плавна анімація появи елементів */
.fade-in {
  animation: fadeIn 0.8s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
