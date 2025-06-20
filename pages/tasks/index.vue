<script setup lang="ts">
import type { ProblemDifficulty } from "~/types";
import { ref, computed } from "vue";

useHead({
  title: "Задачі",
  meta: [
    {
      name: "description",
      content:
        "Знайдіть та розв'яжіть математичні задачі різної складності. Фільтруйте за категоріями, складністю та продавцями.",
    },
  ],
});

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
  price?: number;
  discountPrice?: number;
  seller?: string;
  availability?: string;
}

const categories = ref([
  {
    id: "arithmetic",
    name: "Арифметика",
    icon: "mdi:calculator",
    color: "emerald",
  },
  { id: "algebra", name: "Алгебра", icon: "mdi:function", color: "blue" },
  { id: "geometry", name: "Геометрія", icon: "mdi:shape", color: "purple" },
  {
    id: "calculus",
    name: "Мат. аналіз",
    icon: "mdi:chart-bell-curve",
    color: "orange",
  },
  {
    id: "statistics",
    name: "Статистика",
    icon: "mdi:chart-box",
    color: "rose",
  },
  {
    id: "discrete",
    name: "Дискретна",
    icon: "mdi:graph",
    color: "teal",
  },
]);

const difficultyLevels = ref([
  {
    value: "easy",
    label: "Легкий",
    color: "emerald",
    icon: "mdi:star-outline",
  },
  {
    value: "medium",
    label: "Середній",
    color: "amber",
    icon: "mdi:star-half-full",
  },
  { value: "hard", label: "Складний", color: "red", icon: "mdi:star" },
]);

const tasks = ref<Task[]>([
  {
    id: 1,
    title: "Рівняння з однією змінною",
    description:
      "Розв'яжіть лінійне рівняння 2x + 5 = 11 та знайдіть значення змінної x.",
    category: "algebra",
    tags: ["лінійні", "одна змінна", "базові"],
    difficulty: "easy",
    completionRate: 95,
    solvedCount: 1200,
    timeEstimate: 5,
    price: 1499,
    discountPrice: 1399,
    seller: "MathPro",
    availability: "Готово до відправлення",
  },
  {
    id: 2,
    title: "Площа трикутника",
    description:
      "Знайдіть площу трикутника зі сторонами 3, 4, 5 за формулою Герона.",
    category: "geometry",
    tags: ["площа", "прямокутний", "формула Герона"],
    difficulty: "easy",
    completionRate: 88,
    solvedCount: 950,
    timeEstimate: 7,
    price: 1299,
    seller: "GeomMaster",
    availability: "В наявності",
  },
  {
    id: 3,
    title: "Похідна функції",
    description:
      "Знайдіть похідну функції f(x) = x³ - 2x + 1 та визначте критичні точки.",
    category: "calculus",
    tags: ["диференціювання", "многочлен", "критичні точки"],
    difficulty: "medium",
    completionRate: 72,
    solvedCount: 610,
    timeEstimate: 12,
    price: 1799,
    discountPrice: 1599,
    seller: "CalcExpert",
    availability: "Закінчується",
  },
  {
    id: 4,
    title: "Система лінійних рівнянь",
    description:
      "Розв'яжіть систему рівнянь методом підстановки: x + y = 5, 2x - y = 1.",
    category: "algebra",
    tags: ["система", "лінійні", "підстановка"],
    difficulty: "medium",
    completionRate: 65,
    solvedCount: 480,
    timeEstimate: 15,
    price: 1599,
    seller: "AlgebraPro",
    availability: "Готово до відправлення",
  },
  {
    id: 5,
    title: "Теорема Піфагора",
    description:
      "У прямокутному трикутнику катети дорівнюють 6 і 8. Знайдіть довжину гіпотенузи.",
    category: "geometry",
    tags: ["прямокутний", "теорема", "піфагор"],
    difficulty: "easy",
    completionRate: 91,
    solvedCount: 1100,
    timeEstimate: 6,
    price: 999,
    discountPrice: 899,
    seller: "GeomMaster",
    availability: "В наявності",
  },
  {
    id: 6,
    title: "Інтеграл функції",
    description:
      "Обчисліть визначений інтеграл ∫₀¹ x² dx та поясніть геометричний зміст результату.",
    category: "calculus",
    tags: ["інтегрування", "визначений", "геометрія"],
    difficulty: "hard",
    completionRate: 45,
    solvedCount: 230,
    timeEstimate: 20,
    price: 2199,
    seller: "CalcExpert",
    availability: "Під замовлення",
  },
]);

const searchQuery = ref("");
const selectedCategories = ref<string[]>([]);
const selectedDifficulty = ref<string[]>([]);
const selectedSellers = ref<string[]>([]);
const sortBy = ref("popularity");
const sortOrder = ref("desc");
const currentPage = ref(1);
const itemsPerPage = 12;

const filteredTasks = computed(() => {
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

    const matchesSeller =
      selectedSellers.value.length === 0 ||
      (task.seller && selectedSellers.value.includes(task.seller));

    return (
      matchesSearch && matchesCategory && matchesDifficulty && matchesSeller
    );
  });
});

const sortedTasks = computed(() => {
  return [...filteredTasks.value].sort((a, b) => {
    let comparison = 0;

    switch (sortBy.value) {
      case "popularity":
        comparison = b.solvedCount - a.solvedCount;
        break;
      case "difficulty":
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        comparison =
          difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        break;
      case "price":
        comparison =
          (a.discountPrice || a.price || 0) - (b.discountPrice || b.price || 0);
        break;
      case "newest":
        comparison = b.id - a.id;
        break;
    }

    return sortOrder.value === "asc" ? comparison : -comparison;
  });
});

const paginatedTasks = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return sortedTasks.value.slice(startIndex, endIndex);
});

const totalPages = computed(() =>
  Math.ceil(sortedTasks.value.length / itemsPerPage)
);

const uniqueSellers = computed(() => {
  const sellers = new Set<string>();
  tasks.value.forEach((task) => {
    if (task.seller) sellers.add(task.seller);
  });
  return Array.from(sellers);
});

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

const toggleSeller = (seller: string) => {
  const index = selectedSellers.value.indexOf(seller);
  if (index > -1) {
    selectedSellers.value.splice(index, 1);
  } else {
    selectedSellers.value.push(seller);
  }
  currentPage.value = 1;
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedCategories.value = [];
  selectedDifficulty.value = [];
  selectedSellers.value = [];
  currentPage.value = 1;
};

const getCategoryInfo = (categoryId: string) => {
  return categories.value.find((c) => c.id === categoryId);
};

const getDifficultyInfo = (difficulty: string) => {
  return difficultyLevels.value.find((d) => d.value === difficulty);
};
</script>

<template>
  <!-- Header -->
  <NuxtLayout>
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
      <!-- Sidebar Filters -->
      <div
        class="lg:w-1/4 bg-emerald-600 text-white rounded-lg shadow-sm p-5 h-fit sticky top-4"
      >
        <!-- Search -->
        <div class="mb-6">
          <h3 class="font-bold text-lg mb-3">Пошук</h3>
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Знайти задачу..."
              class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
            <Icon
              name="mdi:magnify"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            />
          </div>
        </div>

        <!-- Categories -->
        <div class="mb-6">
          <h3 class="font-bold text-lg mb-3">Категорії</h3>
          <div class="space-y-2">
            <div
              v-for="category in categories"
              :key="category.id"
              class="flex items-center"
            >
              <input
                :id="`category-${category.id}`"
                type="checkbox"
                :value="category.id"
                v-model="selectedCategories"
                class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label
                :for="`category-${category.id}`"
                class="ml-2 text-gray-700"
              >
                {{ category.name }}
              </label>
            </div>
          </div>
        </div>

        <!-- Difficulty -->
        <div class="mb-6">
          <h3 class="font-bold text-lg mb-3">Складність</h3>
          <div class="space-y-2">
            <div
              v-for="level in difficultyLevels"
              :key="level.value"
              class="flex items-center"
            >
              <input
                :id="`difficulty-${level.value}`"
                type="checkbox"
                :value="level.value"
                v-model="selectedDifficulty"
                class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label
                :for="`difficulty-${level.value}`"
                class="ml-2 text-white"
              >
                {{ level.label }}
              </label>
            </div>
          </div>
        </div>

        <!-- Reset Filters -->
        <button
          @click="resetFilters"
          class="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Icon name="mdi:refresh" class="h-5 w-5" />
          Скинути фільтри
        </button>
      </div>

      <!-- Tasks Grid -->
      <div class="lg:w-3/4">
        <!-- Sorting and Results Count -->
        <div
          class="p-4 mb-4 flex flex-col sm:flex-row justify-between items-center"
        >
          <div class="text-gray-700 mb-2 sm:mb-0">
            Знайдено
            <span class="font-bold">{{ filteredTasks.length }}</span> задач
          </div>
          <div class="flex items-center gap-2">
            <span class="text-gray-700">Сортування:</span>
            <select
              v-model="sortBy"
              class="border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="popularity">За популярністю</option>
              <option value="difficulty">За складністю</option>
              <option value="newest">За новизною</option>
            </select>
            <button
              @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
              class="p-1 rounded-lg border border-gray-200 hover:bg-emerald-50 hover:border-emerald-300"
            >
              <Icon
                :name="
                  sortOrder === 'asc'
                    ? 'mdi:sort-ascending'
                    : 'mdi:sort-descending'
                "
                class="h-5 w-5"
              />
            </button>
          </div>
        </div>

        <!-- Tasks List -->
        <div v-if="paginatedTasks.length > 0" class="space-y-4">
          <div
            v-for="task in paginatedTasks"
            :key="task.id"
            class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-5"
          >
            <div class="flex flex-col md:flex-row gap-4">
              <!-- Task Image Placeholder -->
              <div
                class="md:w-1/4 flex items-center justify-center bg-gray-100 rounded-lg p-4"
              >
                <Icon
                  :name="getCategoryInfo(task.category)?.icon || 'mdi:math'"
                  class="h-16 w-16 text-emerald-600"
                />
              </div>

              <!-- Task Info -->
              <div class="md:w-2/4">
                <h3
                  class="text-lg font-bold text-gray-900 mb-2 hover:text-emerald-600 cursor-pointer"
                >
                  {{ task.title }}
                </h3>
                <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                  {{ task.description }}
                </p>
                <div class="flex flex-wrap gap-2 mb-3">
                  <span
                    v-for="tag in task.tags.slice(0, 3)"
                    :key="tag"
                    class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white rounded-lg shadow-sm p-10 text-center">
          <Icon
            name="mdi:math-compass"
            class="h-16 w-16 text-gray-300 mx-auto mb-4"
          />
          <h3 class="text-xl font-bold text-emerald-600 mb-2">
            Задачі не знайдено
          </h3>
          <p class="text-gray-600 mb-6">
            Спробуйте змінити параметри пошуку або скинути фільтри
          </p>
          <button
            @click="resetFilters"
            class="py-2 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
          >
            <Icon name="mdi:refresh" class="h-5 w-5" />
            Скинути фільтри
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center mt-8">
          <nav class="flex items-center gap-1">
            <button
              v-if="currentPage > 1"
              @click="currentPage = currentPage - 1"
              class="w-10 h-10 rounded-lg border border-gray-200 bg-white hover:bg-emerald-50 hover:border-emerald-300 text-gray-600 hover:text-emerald-600 transition-colors duration-200 flex items-center justify-center"
            >
              <Icon name="mdi:chevron-left" class="h-5 w-5" />
            </button>

            <button
              v-for="page in Array.from(
                { length: Math.min(5, totalPages) },
                (_, i) => i + 1
              )"
              :key="page"
              @click="currentPage = page"
              :class="[
                'w-10 h-10 rounded-lg font-medium transition-colors duration-200',
                currentPage === page
                  ? 'bg-emerald-600 text-white'
                  : 'border border-gray-200 bg-white hover:bg-emerald-50 hover:border-emerald-300 text-gray-600 hover:text-emerald-600',
              ]"
            >
              {{ page }}
            </button>

            <button
              v-if="currentPage < totalPages"
              @click="currentPage = currentPage + 1"
              class="w-10 h-10 rounded-lg border border-gray-200 bg-white hover:bg-emerald-50 hover:border-emerald-300 text-gray-600 hover:text-emerald-600 transition-colors duration-200 flex items-center justify-center"
            >
              <Icon name="mdi:chevron-right" class="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.container {
  max-width: 1200px;
}
</style>
