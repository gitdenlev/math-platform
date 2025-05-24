<script setup lang="ts">
import { useRoute } from "vue-router";
import type { ProblemDifficulty } from "~/types";
import { ref, computed } from "vue";

// Визначення типів
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

// Категорії для відображення назви категорії
const categories = ref([
  { id: "arithmetic", name: "Арифметика", icon: "mdi:calculator" },
  { id: "algebra", name: "Алгебра", icon: "mdi:function" },
  { id: "geometry", name: "Геометрія", icon: "mdi:shape" },
  { id: "calculus", name: "Математичний аналіз", icon: "mdi:chart-bell-curve" },
  { id: "statistics", name: "Статистика", icon: "mdi:chart-box" },
  { id: "discrete", name: "Дискретна математика", icon: "mdi:graph" },
]);

// Рівні складності для перекладу значення difficulty на українську
const difficultyLevels = ref([
  { value: "easy", label: "Легкий", color: "primary" },
  { value: "medium", label: "Середній", color: "warning" },
  { value: "hard", label: "Складний", color: "danger" },
]);

// Список всіх задач - копіюємо з index.vue для доступу до даних
const tasks = ref<Task[]>([
  {
    id: 1,
    title: "Порахувати суму чисел",
    description:
      "Напишіть функцію для розв'язання лінійних рівнянь виду ax + b = c",
    category: "algebra",
    tags: ["арифметика"],
    difficulty: "easy",
    timeEstimate: 5,
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
    timeEstimate: 15,
  },
]);

const route = useRoute();
const taskId = computed(() => Number(route.params.id));

// Знаходимо вибрану задачу за її ID
const task = computed<Task | undefined>(() => {
  return tasks.value.find((task) => task.id === taskId.value);
});

// Виводимо назву категорії за її ідентифікатором
const getCategoryName = (categoryId: string) => {
  const category = categories.value.find((c) => c.id === categoryId);
  return category ? category.name : categoryId;
};

// Виводимо назву складності за її ідентифікатором
const getDifficultyName = (difficulty: string) => {
  const difficultyItem = difficultyLevels.value.find(
    (d) => d.value === difficulty
  );
  return difficultyItem ? difficultyItem.label : difficulty;
};

// Виводимо колір складності за її ідентифікатором
const getDifficultyColor = (difficulty: string): string => {
  const difficultyItem = difficultyLevels.value.find(
    (d) => d.value === difficulty
  );
  return difficultyItem ? difficultyItem.color : "gray";
};

// Стан підказки
const showPremiumTooltip = ref(false);
const toggleTooltip = (value: boolean) => {
  showPremiumTooltip.value = value;
};

// Стан для лічильника символів
const solutionText = ref("");
const maxChars = 2000;

// Встановлюємо заголовок сторінки
useHead(() => ({
  title: task.value
    ? `Humanify - Задача: ${task.value.title}`
    : "Задача не знайдена",
  meta: [
    {
      name: "description",
      content: task.value
        ? `${task.value.title} - ${task.value.description}`
        : "Задача не знайдена",
    },
  ],
}));
</script>

<template>
  <Header />
  <div v-if="task" class="max-w-5xl mx-auto py-10 px-4">
    <!-- Навігаційні посилання з анімацією -->
    <div class="mb-6 flex items-center text-sm">
      <NuxtLink
        to="/tasks"
        class="hover:text-emerald-600 text-emerald-700 transition-colors flex items-center gap-2"
      >
        <Icon name="mdi:arrow-left" class="inline-block" /> Повернутися до
        списку задач
      </NuxtLink>
    </div>

    <!-- Основний контент задачі з покращеним дизайном -->
    <div
      class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-emerald-100"
    >
      <div class="flex justify-between items-start mb-8">
        <div class="flex items-center gap-5">
          <div class="flex items-center bg-emerald-600 p-3 rounded-xl">
            <Icon
              :name="
                categories.find((c) => c.id === task.category)?.icon ||
                'mdi:math'
              "
              class="text-2xl text-white"
            />
          </div>
          <h1 class="text-3xl font-semibold">{{ task.title }}</h1>
        </div>

        <UBadge icon="ri:sword-fill">
          {{ getDifficultyName(task.difficulty) }}
        </UBadge>
      </div>

      <div class="border-b border-gray-200 mb-8 pb-4">
        <div class="flex flex-wrap gap-3 mb-6">
          <UBadge
            icon="ri:hashtag"
            v-for="(tag, tagIndex) in task.tags"
            :key="tagIndex"
          >
            {{ tag }}
          </UBadge>

          <UBadge icon="ri:timer-fill">
            <span>{{ task.timeEstimate }} хвилин</span>
          </UBadge>
        </div>
      </div>

      <!-- Опис задачі з покращеним дизайном -->
      <div class="mb-10 p-8 rounded-xl shadow-inner border border-gray-200">
        <h2 class="text-2xl font-bold mb-5 flex items-center gap-3">
          Умова задачі
        </h2>
        <p class="leading-relaxed text-lg font-medium">
          {{ task.description }}
        </p>
      </div>

      <!-- Форма для введення відповіді з покращеним дизайном -->
      <div class="mb-10 p-8 rounded-xl shadow-inner border border-gray-200">
        <div class="solution-header">
          <h2 class="text-2xl font-bold mb-5 flex items-center gap-3">
            Ваше рішення
          </h2>
        </div>

        <div>
          <UTextarea
            id="answer"
            v-model="solutionText"
            rows="12"
            resize="none"
            :maxlength="maxChars"
            placeholder="Почніть вводити ваше рішення тут..."
            class="solution-textarea"
          />

          <!-- Кнопка перевірки в правому нижньому куті -->
          <UButton disabled icon="ri:check-fill">
            Перевірити
          </UButton>

          <!-- Лічильник символів -->
          <div class="character-counter">
            <Icon name="mdi:text" size="16" class="opacity-60" />
            <span class="counter-text"
              >{{ solutionText.length }} / {{ maxChars }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Якщо задача не знайдена -->
  <div v-else class="max-w-4xl mx-auto py-20 text-center px-4">
    <div class="error-animation mb-6 mx-auto">
      <Icon name="mdi:alert-circle-outline" class="text-8xl text-emerald-300" />
    </div>
    <h1 class="text-3xl font-bold text-emerald-800 mb-4">Задача не знайдена</h1>
    <p class="text-gray-600 mb-8 text-lg">
      Вибачте, але задача з ідентифікатором {{ taskId }} не існує або була
      видалена.
    </p>
    <UButton
      to="/tasks"
      color="emerald"
      size="lg"
      class="rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <span class="flex items-center gap-2">
        <Icon name="mdi:format-list-bulleted" size="20" />
        Повернутися до списку задач
      </span>
    </UButton>
  </div>
</template>

<style scoped>
/* Анімації та покращені стилі */
.hover-scale {
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}

.task-card-hover {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px -5px rgba(16, 185, 129, 0.1);
}

.task-card-hover:hover {
  box-shadow: 0 20px 40px -5px rgba(16, 185, 129, 0.2);
  transform: translateY(-5px);
}

.category-icon-container {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.category-icon-container:hover {
  transform: scale(1.05);
}

.category-icon-container::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  transform: rotate(30deg);
  transition: all 0.6s ease;
}

.category-icon-container:hover::before {
  transform: rotate(0deg);
}

.difficulty-badge {
  transition: all 0.3s ease;
}

.tag-badge {
  background: linear-gradient(
    to right,
    rgba(16, 185, 129, 0.2),
    rgba(16, 185, 129, 0.1)
  );
  color: #065f46;
  transition: all 0.3s ease;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.tag-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 10px -2px rgba(16, 185, 129, 0.15);
}

.solved-badge {
  background: linear-gradient(
    to right,
    rgba(139, 92, 246, 0.2),
    rgba(139, 92, 246, 0.1)
  );
  color: #5b21b6;
  transition: all 0.3s ease;
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.task-description {
  transition: all 0.3s ease;
}

.task-description:hover {
  box-shadow: 0 10px 30px -5px rgba(16, 185, 129, 0.15);
}

.error-animation {
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}
</style>
