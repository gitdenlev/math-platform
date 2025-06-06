<script setup lang="ts">
import type { ProblemDifficulty } from "~/types";
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
  { id: "arithmetic", name: "Арифметика", icon: "mdi:calculator", color: "blue" },
  { id: "algebra", name: "Алгебра", icon: "mdi:function", color: "purple" },
  { id: "geometry", name: "Геометрія", icon: "mdi:shape", color: "green" },
  { id: "calculus", name: "Математичний аналіз", icon: "mdi:chart-bell-curve", color: "orange" },
  { id: "statistics", name: "Статистика", icon: "mdi:chart-box", color: "red" },
  { id: "discrete", name: "Дискретна математика", icon: "mdi:graph", color: "teal" },
]);

const difficultyLevels = ref([
  { value: "easy", label: "Легкий", color: "green", icon: "mdi:star-outline" },
  { value: "medium", label: "Середній", color: "yellow", icon: "mdi:star-half-full" },
  { value: "hard", label: "Складний", color: "red", icon: "mdi:star" },
]);

// Фейкові дані для задач
const tasks = ref<Task[]>([
  {
    id: 1,
    title: "Рівняння з однією змінною",
    description: "Розв'яжіть лінійне рівняння 2x + 5 = 11 та знайдіть значення змінної x.",
    category: "algebra",
    tags: ["лінійні", "одна змінна", "базові"],
    difficulty: "easy",
    completionRate: 95,
    solvedCount: 1200,
    timeEstimate: 5,
  },
  {
    id: 2,
    title: "Площа трикутника",
    description: "Знайдіть площу трикутника зі сторонами 3, 4, 5 за формулою Герона.",
    category: "geometry",
    tags: ["площа", "прямокутний", "формула Герона"],
    difficulty: "easy",
    completionRate: 88,
    solvedCount: 950,
    timeEstimate: 7,
  },
  {
    id: 3,
    title: "Похідна функції",
    description: "Знайдіть похідну функції f(x) = x³ - 2x + 1 та визначте критичні точки.",
    category: "calculus",
    tags: ["диференціювання", "многочлен", "критичні точки"],
    difficulty: "medium",
    completionRate: 72,
    solvedCount: 610,
    timeEstimate: 12,
  },
  {
    id: 4,
    title: "Система лінійних рівнянь",
    description: "Розв'яжіть систему рівнянь методом підстановки: x + y = 5, 2x - y = 1.",
    category: "algebra",
    tags: ["система", "лінійні", "підстановка"],
    difficulty: "medium",
    completionRate: 65,
    solvedCount: 480,
    timeEstimate: 15,
  },
  {
    id: 5,
    title: "Теорема Піфагора",
    description: "У прямокутному трикутнику катети дорівнюють 6 і 8. Знайдіть довжину гіпотенузи.",
    category: "geometry",
    tags: ["прямокутний", "теорема", "піфагор"],
    difficulty: "easy",
    completionRate: 91,
    solvedCount: 1100,
    timeEstimate: 6,
  },
  {
    id: 6,
    title: "Інтеграл функції",
    description: "Обчисліть визначений інтеграл ∫₀¹ x² dx та поясніть геометричний зміст результату.",
    category: "calculus",
    tags: ["інтегрування", "визначений", "геометрія"],
    difficulty: "hard",
    completionRate: 45,
    solvedCount: 230,
    timeEstimate: 20,
  },
  {
    id: 7,
    title: "Множення матриць",
    description: "Перемножте дві матриці 2×2 та знайдіть визначник добутку.",
    category: "discrete",
    tags: ["матриці", "лінійна алгебра", "визначник"],
    difficulty: "medium",
    completionRate: 58,
    solvedCount: 350,
    timeEstimate: 18,
  },
  {
    id: 8,
    title: "Ймовірність події",
    description: "Обчисліть ймовірність випадання парного числа при киданні звичайного шестигранного кубика.",
    category: "statistics",
    tags: ["ймовірність", "базові", "кубик"],
    difficulty: "easy",
    completionRate: 85,
    solvedCount: 780,
    timeEstimate: 5,
  },
  {
    id: 9,
    title: "Розв'язання квадратного рівняння",
    description: "Розв'яжіть квадратне рівняння x² - 5x + 6 = 0 через дискримінант.",
    category: "algebra",
    tags: ["квадратні", "дискримінант", "корені"],
    difficulty: "medium",
    completionRate: 78,
    solvedCount: 820,
    timeEstimate: 10,
  },
  {
    id: 10,
    title: "Об'єм циліндра",
    description: "Знайдіть об'єм циліндра з радіусом основи 3 см і висотою 7 см.",
    category: "geometry",
    tags: ["об'єм", "3D", "циліндр"],
    difficulty: "medium",
    completionRate: 68,
    solvedCount: 410,
    timeEstimate: 10,
  },
]);

// Стан фільтрів та сортування
const searchQuery = ref("");
const selectedCategories = ref<string[]>([]);
const selectedDifficulty = ref<string[]>([]);
const sortBy = ref("popularity");
const sortOrder = ref("desc");
const currentPage = ref(1);
const itemsPerPage = 12;

// Показувати панель фільтрів
const showFilters = ref(false);

// Статистика
const taskStats = computed(() => ({
  total: tasks.value.length,
  easy: tasks.value.filter(t => t.difficulty === 'easy').length,
  medium: tasks.value.filter(t => t.difficulty === 'medium').length,
  hard: tasks.value.filter(t => t.difficulty === 'hard').length,
  totalSolved: tasks.value.reduce((sum, task) => sum + task.solvedCount, 0),
  avgCompletion: Math.round(tasks.value.reduce((sum, task) => sum + task.completionRate, 0) / tasks.value.length)
}));

// Фільтрація задач
const filteredTasks = computed(() => {
  return tasks.value.filter((task) => {
    const matchesSearch =
      searchQuery.value === "" ||
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
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
  return [...filteredTasks.value].sort((a, b) => {
    let comparison = 0;

    switch (sortBy.value) {
      case "popularity":
        comparison = b.solvedCount - a.solvedCount;
        break;
      case "difficulty":
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        break;
      case "completion":
        comparison = b.completionRate - a.completionRate;
        break;
      case "newest":
        comparison = b.id - a.id;
        break;
      case "time":
        comparison = a.timeEstimate - b.timeEstimate;
        break;
    }

    return sortOrder.value === "asc" ? comparison : -comparison;
  });
});

// Пагінація
const paginatedTasks = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return sortedTasks.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(sortedTasks.value.length / itemsPerPage));

// Методи
const toggleCategory = (categoryId: string) => {
  const index = selectedCategories.value.indexOf(categoryId);
  if (index > -1) {
    selectedCategories.value.splice(index, 1);
  } else {
    selectedCategories.value.push(categoryId);
  }
  currentPage.value = 1;
};

const toggleDifficulty = (difficulty: string) => {
  const index = selectedDifficulty.value.indexOf(difficulty);
  if (index > -1) {
    selectedDifficulty.value.splice(index, 1);
  } else {
    selectedDifficulty.value.push(difficulty);
  }
  currentPage.value = 1;
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedCategories.value = [];
  selectedDifficulty.value = [];
  currentPage.value = 1;
};

const getCategoryInfo = (categoryId: string) => {
  return categories.value.find(c => c.id === categoryId);
};

const getDifficultyInfo = (difficulty: string) => {
  return difficultyLevels.value.find(d => d.value === difficulty);
};

// SEO
useHead({
  title: "Математичні задачі - Humanify",
  meta: [
    {
      name: "description",
      content: "Розв'язуйте математичні задачі різного рівня складності. Алгебра, геометрія, математичний аналіз та інші розділи математики."
    }
  ]
});
</script>

<template>
  <Header />
  <NuxtLayout name="default">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div class="relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/30 text-sm font-medium text-blue-700 mb-6">
          <Icon name="mdi:calculator-variant" class="text-lg" />
          Математичні задачі
        </div>
        
        <h1 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-6">
          Удосконалюйте свої<br>математичні навички
        </h1>
        
        <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          Розв'язуйте інтерактивні задачі з алгебри, геометрії, математичного аналізу 
          та інших розділів математики. Від базового до експертного рівня.
        </p>

        <!-- Statistics -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
            <div class="text-3xl font-bold text-blue-600 mb-2">{{ taskStats.total }}+</div>
            <div class="text-sm text-gray-600 font-medium">Задач усього</div>
          </div>
          <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
            <div class="text-3xl font-bold text-purple-600 mb-2">{{ categories.length }}</div>
            <div class="text-sm text-gray-600 font-medium">Категорій</div>
          </div>
          <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
            <div class="text-3xl font-bold text-emerald-600 mb-2">{{ taskStats.totalSolved.toLocaleString() }}+</div>
            <div class="text-sm text-gray-600 font-medium">Рішень</div>
          </div>
          <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
            <div class="text-3xl font-bold text-orange-600 mb-2">{{ taskStats.avgCompletion }}%</div>
            <div class="text-sm text-gray-600 font-medium">Середня успішність</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters and Search -->
    <section class="py-8 bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Search and Actions -->
        <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          <div class="flex-1 max-w-md">
            <div class="relative">
              <Icon name="mdi:magnify" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <UInput
                v-model="searchQuery"
                placeholder="Пошук задач..."
                class="pl-10"
                size="lg"
                @input="currentPage = 1"
              />
            </div>
          </div>
          
          <div class="flex items-center gap-3">
            <!-- Sort Controls -->
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600 font-medium hidden sm:block">Сортувати:</span>
              <USelect
                v-model="sortBy"
                :options="[
                  { value: 'popularity', label: 'За популярністю' },
                  { value: 'difficulty', label: 'За складністю' },
                  { value: 'completion', label: 'За успішністю' },
                  { value: 'newest', label: 'За новизною' },
                  { value: 'time', label: 'За часом' }
                ]"
                size="sm"
                class="w-36"
                @change="currentPage = 1"
              />
              <UButton
                @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
                variant="ghost"
                size="sm"
                :icon="sortOrder === 'asc' ? 'mdi:sort-ascending' : 'mdi:sort-descending'"
              />
            </div>

            <!-- Filter Toggle -->
            <UButton
              @click="showFilters = !showFilters"
              variant="outline"
              size="sm"
              :icon="showFilters ? 'mdi:filter-minus' : 'mdi:filter-plus'"
              :color="(selectedCategories.length || selectedDifficulty.length) ? 'primary' : 'gray'"
            >
              Фільтри
              <UBadge
                v-if="selectedCategories.length || selectedDifficulty.length"
                :label="selectedCategories.length + selectedDifficulty.length"
                size="xs"
                class="ml-2"
              />
            </UButton>

            <!-- Reset Filters -->
            <UButton
              v-if="searchQuery || selectedCategories.length || selectedDifficulty.length"
              @click="resetFilters"
              variant="ghost"
              size="sm"
              icon="mdi:refresh"
              color="gray"
            >
              Скинути
            </UButton>
          </div>
        </div>

        <!-- Expandable Filters -->
        <div v-if="showFilters" class="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
          <!-- Categories -->
          <div class="mb-6">
            <h3 class="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Icon name="mdi:shape" />
              Категорії
            </h3>
            <div class="flex flex-wrap gap-2">
              <UButton
                v-for="category in categories"
                :key="category.id"
                @click="toggleCategory(category.id)"
                :variant="selectedCategories.includes(category.id) ? 'solid' : 'soft'"
                :color="selectedCategories.includes(category.id) ? category.color : 'gray'"
                size="sm"
                class="transition-all duration-200"
              >
                <template #leading>
                  <Icon :name="category.icon" />
                </template>
                {{ category.name }}
              </UButton>
            </div>
          </div>

          <!-- Difficulty -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Icon name="mdi:star" />
              Рівень складності
            </h3>
            <div class="flex flex-wrap gap-2">
              <UButton
                v-for="level in difficultyLevels"
                :key="level.value"
                @click="toggleDifficulty(level.value)"
                :variant="selectedDifficulty.includes(level.value) ? 'solid' : 'soft'"
                :color="selectedDifficulty.includes(level.value) ? level.color : 'gray'"
                size="sm"
                class="transition-all duration-200"
              >
                <template #leading>
                  <Icon :name="level.icon" />
                </template>
                {{ level.label }}
              </UButton>
            </div>
          </div>
        </div>

        <!-- Results Info -->
        <div class="flex items-center justify-between text-sm text-gray-600 mb-6">
          <span>
            Знайдено <strong>{{ filteredTasks.length }}</strong> задач
            <span v-if="searchQuery || selectedCategories.length || selectedDifficulty.length">
              з {{ tasks.length }}
            </span>
          </span>
          <span v-if="totalPages > 1">
            Сторінка {{ currentPage }} з {{ totalPages }}
          </span>
        </div>
      </div>
    </section>

    <!-- Tasks Grid -->
    <section class="py-12 bg-gray-50/50">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Tasks -->
        <div v-if="paginatedTasks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="task in paginatedTasks"
            :key="task.id"
            class="group bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >
            <!-- Card Header -->
            <div class="p-6 pb-4">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div 
                    :class="`p-3 rounded-xl bg-${getCategoryInfo(task.category)?.color}-100 text-${getCategoryInfo(task.category)?.color}-600 group-hover:scale-110 transition-transform duration-300`"
                  >
                    <Icon :name="getCategoryInfo(task.category)?.icon || 'mdi:math'" class="text-xl" />
                  </div>
                  <div>
                    <div class="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {{ getCategoryInfo(task.category)?.name }}
                    </div>
                  </div>
                </div>
                
                <UBadge 
                  :color="getDifficultyInfo(task.difficulty)?.color" 
                  variant="soft"
                  size="sm"
                  class="flex items-center gap-1"
                >
                  <Icon :name="getDifficultyInfo(task.difficulty)?.icon" class="text-xs" />
                  {{ getDifficultyInfo(task.difficulty)?.label }}
                </UBadge>
              </div>

              <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                {{ task.title }}
              </h3>
              
              <p class="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {{ task.description }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1 mb-4">
                <UBadge
                  v-for="tag in task.tags.slice(0, 3)"
                  :key="tag"
                  color="gray"
                  variant="soft"
                  size="xs"
                >
                  {{ tag }}
                </UBadge>
                <UBadge
                  v-if="task.tags.length > 3"
                  color="gray"
                  variant="soft"
                  size="xs"
                >
                  +{{ task.tags.length - 3 }}
                </UBadge>
              </div>
            </div>

            <!-- Card Footer -->
            <div class="px-6 pb-6">
              <!-- Progress -->
              <div class="mb-4">
                <div class="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>Успішність рішень</span>
                  <span class="font-medium">{{ task.completionRate }}%</span>
                </div>
                <UProgress 
                  :value="task.completionRate" 
                  :max="100" 
                  size="sm" 
                  :color="task.completionRate >= 80 ? 'green' : task.completionRate >= 60 ? 'yellow' : 'red'" 
                />
              </div>

              <!-- Stats -->
              <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div class="flex items-center gap-1">
                  <Icon name="mdi:check-circle-outline" />
                  <span>{{ task.solvedCount.toLocaleString() }} розв'язано</span>
                </div>
                <div class="flex items-center gap-1">
                  <Icon name="mdi:clock-outline" />
                  <span>~{{ task.timeEstimate }} хв</span>
                </div>
              </div>

              <!-- Action Button -->
              <UButton 
                :to="`/tasks/${task.id}`" 
                block 
                color="primary"
                variant="solid"
                class="group-hover:scale-[1.02] transition-transform duration-200"
              >
                <Icon name="mdi:play-circle-outline" class="mr-2" />
                Розв'язати задачу
              </UButton>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div class="mb-6">
            <Icon name="mdi:magnify-close" size="64" class="text-gray-300 mx-auto" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Задачі не знайдено</h3>
          <p class="text-gray-600 mb-8 max-w-md mx-auto">
            Спробуйте змінити параметри пошуку або скинути фільтри для перегляду всіх доступних задач.
          </p>
          <UButton @click="resetFilters" color="primary" variant="outline" size="lg">
            <Icon name="mdi:refresh" class="mr-2" />
            Скинути фільтри
          </UButton>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center mt-12">
          <UPagination
            v-model="currentPage"
            :total="totalPages"
            :max="7"
            show-first
            show-last
            size="sm"
          />
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<style scoped>
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth animations */
* {
  transition-property: transform, box-shadow, background-color, border-color, color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:scale-\[1\.02\] {
  transform: scale(1.02);
}

/* Custom scrollbar for filter section */
.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>