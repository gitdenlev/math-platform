<script setup lang="ts">
import type { ProblemDifficulty } from "~/types"; // Припускаю, що CategoryTask не потрібен, якщо categories статичні
import { ref, computed } from "vue"; // onMounted більше не потрібен

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

// --- Фейкові дані для задач ---
const tasks = ref<Task[]>([
  {
    id: 1,
    title: "Рівняння з однією змінною",
    description: "Розв'яжіть лінійне рівняння 2x + 5 = 11.",
    category: "algebra",
    tags: ["лінійні", "одна змінна"],
    difficulty: "easy",
    completionRate: 95,
    solvedCount: 1200,
    timeEstimate: 5,
  },
  {
    id: 2,
    title: "Площа трикутника",
    description: "Знайдіть площу трикутника зі сторонами 3, 4, 5.",
    category: "geometry",
    tags: ["площа", "прямокутний"],
    difficulty: "easy",
    completionRate: 88,
    solvedCount: 950,
    timeEstimate: 7,
  },
  {
    id: 3,
    title: "Похідна функції",
    description: "Знайдіть похідну функції f(x) = x^3 - 2x + 1.",
    category: "calculus",
    tags: ["диференціювання", "многочлен"],
    difficulty: "medium",
    completionRate: 72,
    solvedCount: 610,
    timeEstimate: 12,
  },
  {
    id: 4,
    title: "Система лінійних рівнянь",
    description: "Розв'яжіть систему: x + y = 5, 2x - y = 1.",
    category: "algebra",
    tags: ["система", "лінійні"],
    difficulty: "medium",
    completionRate: 65,
    solvedCount: 480,
    timeEstimate: 15,
  },
  {
    id: 5,
    title: "Теорема Піфагора",
    description: "У прямокутному трикутнику катети 6 і 8. Знайдіть гіпотенузу.",
    category: "geometry",
    tags: ["прямокутний", "теорема"],
    difficulty: "easy",
    completionRate: 91,
    solvedCount: 1100,
    timeEstimate: 6,
  },
  {
    id: 6,
    title: "Інтеграл функції",
    description: "Обчисліть визначений інтеграл від 0 до 1 функції f(x) = x^2.",
    category: "calculus",
    tags: ["інтегрування", "визначений"],
    difficulty: "hard",
    completionRate: 45,
    solvedCount: 230,
    timeEstimate: 20,
  },
  {
    id: 7,
    title: "Множення матриць",
    description: "Перемножте дві матриці 2x2.",
    category: "discrete",
    tags: ["матриці", "лінійна алгебра"],
    difficulty: "medium",
    completionRate: 58,
    solvedCount: 350,
    timeEstimate: 18,
  },
  {
    id: 8,
    title: "Ймовірність події",
    description: "Обчисліть ймовірність випадання парного числа при киданні кубика.",
    category: "statistics",
    tags: ["ймовірність", "базові"],
    difficulty: "easy",
    completionRate: 85,
    solvedCount: 780,
    timeEstimate: 5,
  },
  {
    id: 9,
    title: "Розв'язання квадратного рівняння",
    description: "Розв'яжіть рівняння x^2 - 5x + 6 = 0.",
    category: "algebra",
    tags: ["квадратні", "дискримінант"],
    difficulty: "medium",
    completionRate: 78,
    solvedCount: 820,
    timeEstimate: 10,
  },
  {
    id: 10,
    title: "Об'єм циліндра",
    description: "Знайдіть об'єм циліндра з радіусом 3 і висотою 7.",
    category: "geometry",
    tags: ["об'єм", "3D"],
    difficulty: "medium",
    completionRate: 68,
    solvedCount: 410,
    timeEstimate: 10,
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
  // Тепер немає isLoading, завжди повертаємо відфільтровані задачі
  return tasks.value.filter((task) => {
    const matchesSearch =
      searchQuery.value === "" ||
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      task.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      task.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.value.toLowerCase())
      );

    const matchesCategory =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.includes(task.category);

    const matchesDifficulty =
      selectedDifficulty.value.length === 0 ||
      selectedDifficulty.value.includes(task.difficulty);

    return matchesSearch && matchesCategory && matchesDifficulty;
  });
});

// Відсортовані задачі
const sortedTasks = computed(() => {
  // Тепер немає isLoading, завжди повертаємо відсортовані задачі
  return [...filteredTasks.value].sort((a, b) => {
    let comparison = 0;

    if (sortBy.value === "popularity") {
      comparison = b.solvedCount - a.solvedCount;
    } else if (sortBy.value === "difficulty") {
      const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
      // @ts-ignore - TypeScript може не знати, що a.difficulty/b.difficulty є ключами difficultyOrder
      comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    } else if (sortBy.value === "completion") {
      comparison = b.completionRate - a.completionRate;
    }
    // Додамо сортування за новизною (за ID, якщо created_at не передається/не використовується тут)
    else if (sortBy.value === "newest") {
       comparison = b.id - a.id; // Припускаючи, що більший ID означає новішу задачу
    }


    return sortOrder.value === "asc" ? comparison : comparison * -1; // Змінено логіку для 'asc'
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
  sortBy.value = "popularity"; // Можна скинути і сортування
  sortOrder.value = "desc";
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
        "Математичні задачі різного рівня складності з можливістю розв'язання.",
    },
  ],
});

// Пагінація
const currentPage = ref(1); // Додаємо стан поточної сторінки
const itemsPerPage = 9; // Кількість елементів на сторінці

const paginatedTasks = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return sortedTasks.value.slice(startIndex, endIndex);
});
</script>

<template>
  <Header />
  <NuxtLayout name="default">
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

        <div class="flex flex-wrap justify-center gap-8 mt-10">
          <div class="text-center">
            <div
              class="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent"
            >
              {{ tasks.length }}+
            </div>
            <div class="text-sm mt-1">Задач</div>
          </div>
          <div class="text-center">
            <div
              class="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent"
            >
              {{ categories.length }}
            </div>
            <div class="text-sm mt-1">Категорій</div>
          </div>
          <div class="text-center">
            <div
              class="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent"
            >
              {{ difficultyLevels.length }}
            </div>
            <div class="text-sm mt-1">Рівні складності</div>
          </div>
        </div>
      </div>

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
                  { value: 'newest', label: 'Новизною' }, // Додано опцію сортування
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

      <div v-if="paginatedTasks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <div
          v-for="task in paginatedTasks"
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

              <UBadge size="md" :color="getDifficultyColor(task.difficulty)">
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
                color="gray"
                variant="subtle"
                v-for="(tag, tagIndex) in task.tags"
                :key="tagIndex"
                size="md"
              >
                {{ tag }}
              </UBadge>
            </div>
          </div>

          <div class="mt-auto p-4 pt-3 border-t border-gray-100 bg-gray-50/80">
             <div class="flex justify-between items-center text-xs text-gray-500 mb-3">
                <span><Icon name="ri:check-double-line" class="mr-1"/> {{ task.solvedCount }} розв'язано</span>
                <span><Icon name="ri:time-line" class="mr-1"/> {{ task.timeEstimate }} хв.</span>
             </div>
            <UProgress :value="task.completionRate" :max="100" size="xs" color="emerald" class="mb-3"/>


            <UButton block :to="`/tasks/${task.id}`" class="mt-4">
              Розв'язати задачу
            </UButton>
          </div>
        </div>
      </div>

      <div
        v-if="paginatedTasks.length === 0 && (searchQuery || selectedCategories.length > 0 || selectedDifficulty.length > 0)"
        class="text-center py-16 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100"
      >
        <div class="mb-6 text-gray-300">
          <Icon name="mdi:magnify-empty" size="80" />
        </div>
        <h3 class="text-2xl font-bold mb-2">Задачі не знайдено</h3>
        <p class="max-w-md mx-auto mb-8">
          Спробуйте змінити параметри пошуку або фільтри.
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

      <div class="flex justify-center mt-12">
        <UPagination
          v-if="sortedTasks.length > itemsPerPage"
          :total="Math.ceil(sortedTasks.length / itemsPerPage)"
          :default-value="1"
          :model-value="currentPage"
          @update:model-value="currentPage = $event"
          show-first
          show-last
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