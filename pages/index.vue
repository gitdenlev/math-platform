<script setup lang="ts">
import type { StepperItem } from "@nuxt/ui";

const items = ref<StepperItem[]>([
  {
    title: "Вивчення концепції",
    description:
      "Детальне вивчення математичної концепції з інтерактивними прикладами",
    icon: "mdi:book-open-variant",
  },
  {
    title: "Аналіз коду",
    description: "Дослідження програмної реалізації математичних концепцій",
    icon: "mdi:code-braces",
  },
  {
    title: "Рішення задачі",
    description: "Застосування знань для розв'язання практичних задач",
    icon: "i-lucide-clipboard",
  },
  {
    title: "Візуалізація результатів",
    description: "Графічне представлення даних для кращого розуміння",
    icon: "mdi:chart-bell-curve",
  },
  {
    title: "Аналіз ефективності",
    description: "Оцінка алгоритмічної складності та оптимізація рішення",
    icon: "mdi:trending-up",
  },
]);

useHead({
  title: "Humanify - Програмуй математично",
  meta: [
    {
      name: "description",
      content:
        "Humanify - це новий підхід до вивчення математики через програмування. Відкрийте для себе інтерактивні задачі, експериментальну лабораторію та багато іншого.",
    },
  ],
  link: [
    {
      rel: "icon", // використовуємо "icon" для favicon
      href: "/logo.svg",
      type: "image/svg+xml", // важливо вказати тип для SVG
    },
  ],
});

const features = [
  {
    icon: "mdi:code-braces",
    title: "Інтерактивні задачі",
    description:
      "Розв'язуйте математичні задачі з миттєвою перевіркою правильності рішення та підказками",
    color: "bg-emerald-500",
  },
  {
    icon: "mdi:book-open-page-variant",
    title: "Докладний довідник",
    description:
      "Повний математичний довідник з формулами, теоремами та візуальними поясненнями",
    color: "bg-green-500",
  },
  {
    icon: "mdi:flask-outline",
    title: "Експериментальна лабораторія",
    description:
      "Досліджуйте математичні концепції за допомогою інтерактивних моделей та симуляцій",
    color: "bg-teal-500",
  },
];

// Курси за рівнями
const courseLevels = [
  {
    level: "Початковий",
    icon: "mdi:chart-timeline-variant",
    color: "bg-emerald-500",
    description:
      "Ідеально підходить для тих, хто починає свій шлях у програмуванні та математиці",
    courses: [
      { title: "Основи алгоритмів", duration: "4 тижні", lessons: 12 },
      { title: "Математична логіка", duration: "3 тижні", lessons: 9 },
      {
        title: "Лінійні рівняння в програмуванні",
        duration: "2 тижні",
        lessons: 8,
      },
    ],
  },
  {
    level: "Середній",
    icon: "mdi:function-variant",
    color: "bg-green-500",
    description:
      "Для тих, хто має базові знання та прагне поглибити розуміння математики в програмуванні",
    courses: [
      { title: "Рекурсивні алгоритми", duration: "5 тижнів", lessons: 15 },
      { title: "Структури даних", duration: "6 тижнів", lessons: 18 },
      { title: "Геометричні алгоритми", duration: "4 тижні", lessons: 12 },
    ],
  },
  {
    level: "Просунутий",
    icon: "mdi:graph",
    color: "bg-teal-500",
    description:
      "Складні теми для досвідчених програмістів, які бажають освоїти вищу математику",
    courses: [
      { title: "Чисельні методи", duration: "7 тижнів", lessons: 21 },
      { title: "Криптографічні алгоритми", duration: "8 тижнів", lessons: 24 },
      { title: "Машинне навчання", duration: "10 тижнів", lessons: 30 },
    ],
  },
];

// Практикуми та воркшопи
const workshops = [
  {
    title: "Програмування фракталів",
    date: "Щосуботи",
    icon: "mdi:hexagon-multiple",
    color: "bg-emerald-500",
    description:
      "Практичний воркшоп з побудови різних типів фракталів за допомогою рекурсивних алгоритмів",
    format: "Онлайн",
  },
  {
    title: "Алгоритми машинного зору",
    date: "Щонеділі",
    icon: "mdi:eye",
    color: "bg-green-500",
    description:
      "Дослідження математичних основ комп'ютерного зору та їх реалізація на практиці",
    format: "Змішаний",
  },
  {
    title: "Оптимізація коду",
    date: "По середах",
    icon: "mdi:speedometer",
    color: "bg-teal-500",
    description:
      "Математичні методи оптимізації алгоритмів для підвищення продуктивності програм",
    format: "Офлайн",
  },
  {
    title: "Візуалізація даних",
    date: "По четвергах",
    icon: "mdi:chart-areaspline",
    color: "bg-cyan-500",
    description:
      "Побудова різних типів графіків і діаграм для наочного представлення математичних даних",
    format: "Онлайн",
  },
];

// Відгуки студентів
const testimonials = [
  {
    name: "Марія Петренко",
    role: "Студентка КНУ",
    avatar: "/avatars/maria.jpg",
    content:
      "Humanify кардинально змінив моє розуміння математики. Тепер я бачу зв'язок між абстрактними концепціями та їх практичним застосуванням у програмуванні.",
    rating: 5,
  },
  {
    name: "Олексій Коваль",
    role: "Розробник ПЗ",
    avatar: "/avatars/oleksiy.jpg",
    content:
      "Як програміст, я завжди хотів краще розуміти математику. Завдяки Humanify мені вдалося заповнити прогалини у знаннях і покращити свої алгоритмічні навички.",
    rating: 5,
  },
  {
    name: "Софія Мельник",
    role: "Викладач математики",
    avatar: "/avatars/sofia.jpg",
    content:
      "Рекомендую Humanify всім своїм учням. Ця платформа поєднує класичну математику з сучасними підходами до програмування. Результати просто вражають!",
    rating: 4,
  },
];

// Статистика платформи
const statistics = [
  {
    value: "10,000+",
    label: "Активних студентів",
    icon: "mdi:account-group",
    color: "text-emerald-600",
  },
  {
    value: "250+",
    label: "Інтерактивних задач",
    icon: "mdi:code-braces",
    color: "text-green-600",
  },
  {
    value: "50+",
    label: "Математичних тем",
    icon: "mdi:book-open-variant",
    color: "text-teal-600",
  },
  {
    value: "98%",
    label: "Задоволених студентів",
    icon: "mdi:thumb-up",
    color: "text-cyan-600",
  },
];
</script>

<template>
  <NuxtLayout name="default">
    <!-- Hero Section -->
    <!-- Декоративний фоновий елемент -->

    <div class="flex md:flex-row items-center justify-between">
      <!-- LEFT: Text Content -->
      <div class="flex-1 text-center md:text-left relative">
        <!-- Бейдж новинка -->
        <div
          class="inline-flex items-center mb-4 px-3 py-1 text-sm font-medium bg-emerald-100 rounded-full"
        >
          <Icon name="mdi:star" class="mr-1" />
          Новий підхід до вивчення математики
        </div>

        <h1
          class="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent leading-tight"
        >
          Програмуй математично
        </h1>

        <p class="mt-5 text-lg max-w-xl mx-auto md:mx-0">
          Humanify — це більше ніж просто задачі. Це новий спосіб зрозуміти
          математику за допомогою коду — крок за кроком, ідея за ідеєю.
        </p>

        <div
          class="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4"
        >
          <UButton
            icon="ion:rocket"
            size="xl"
            color="primary"
            variant="solid"
            class="bg-green-600 font-medium tracking-wide"
          >
            Розпочати навчання
          </UButton>
        </div>
      </div>

      <div
        class="flex-1 justify-center md:justify-end relative hidden md:block"
      >
        <NuxtImg src="/learn.svg" width="500" />
      </div>
    </div>

    <!-- Features Section -->
    <section class="py-20">
      <div class="text-center mb-12">
        <h2
          class="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent mb-4"
        >
          Наші можливості
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Відкрийте для себе унікальні інструменти, які допоможуть вам освоїти
          математику через програмування
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-white text-white rounded-xl p-6 shadow-lg border border-gray-100 relative overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div
            class="absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-10"
            :class="feature.color"
          ></div>

          <div
            class="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
            :class="feature.color"
          >
            <Icon :name="feature.icon" class="text-2xl" />
          </div>

          <h3 class="text-xl text-gray-600 font-bold mb-3">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- How It Works Section - Зигзагоподібний вертикальний процес -->
    <section class="py-20">
      <div class="text-center mb-16">
        <h2
          class="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent mb-4"
        >
          Як це працює
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Наша методика дозволяє вам крок за кроком освоїти математичні
          концепції через програмування
        </p>
      </div>

      <!-- Вертикальний зигзагоподібний степер -->
      <div class="relative container mx-auto">
        <!-- Вертикальна лінія -->
        <div
          class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald-200 hidden md:block"
        ></div>

        <!-- Кроки -->
        <div class="space-y-12">
          <!-- Крок 1 -->
          <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
              <div
                class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-emerald-100"
              >
                <h3 class="text-xl font-bold text-emerald-700 mb-3">
                  {{ items[0].title }}
                </h3>
                <p class="text-gray-600">{{ items[0].description }}</p>
              </div>
            </div>
            <div
              class="md:w-1/2 flex justify-center items-center order-1 md:order-2 mb-4 md:mb-0"
            >
              <div
                class="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center relative z-10"
              >
                <Icon :name="items[0].icon" class="text-2xl text-white" />
              </div>
            </div>
          </div>

          <!-- Крок 2 -->
          <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
              <div
                class="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center relative z-10"
              >
                <Icon :name="items[1].icon" class="text-2xl text-white" />
              </div>
            </div>
            <div class="md:w-1/2 md:pl-12">
              <div
                class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-emerald-100"
              >
                <h3 class="text-xl font-bold text-emerald-700 mb-3">
                  {{ items[1].title }}
                </h3>
                <p class="text-gray-600">{{ items[1].description }}</p>
              </div>
            </div>
          </div>

          <!-- Крок 3 -->
          <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
              <div
                class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-emerald-100"
              >
                <h3 class="text-xl font-bold text-emerald-700 mb-3">
                  {{ items[2].title }}
                </h3>
                <p class="text-gray-600">{{ items[2].description }}</p>
              </div>
            </div>
            <div
              class="md:w-1/2 flex justify-center items-center order-1 md:order-2 mb-4 md:mb-0"
            >
              <div
                class="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center relative z-10"
              >
                <Icon :name="items[2].icon" class="text-2xl text-white" />
              </div>
            </div>
          </div>

          <!-- Крок 4 -->
          <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
              <div
                class="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center relative z-10"
              >
                <Icon :name="items[3].icon" class="text-2xl text-white" />
              </div>
            </div>
            <div class="md:w-1/2 md:pl-12">
              <div
                class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-emerald-100"
              >
                <h3 class="text-xl font-bold text-emerald-700 mb-3">
                  {{ items[3].title }}
                </h3>
                <p class="text-gray-600">{{ items[3].description }}</p>
              </div>
            </div>
          </div>

          <!-- Крок 5 -->
          <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
              <div
                class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-emerald-100"
              >
                <h3 class="text-xl font-bold text-emerald-700 mb-3">
                  {{ items[4].title }}
                </h3>
                <p class="text-gray-600">{{ items[4].description }}</p>
              </div>
            </div>
            <div
              class="md:w-1/2 flex justify-center items-center order-1 md:order-2 mb-4 md:mb-0"
            >
              <div
                class="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center relative z-10"
              >
                <Icon :name="items[4].icon" class="text-2xl text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Практикуми та воркшопи -->
    <section
      class="py-20 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl"
    >
      <div class="text-center mb-12">
        <h2
          class="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent mb-4"
        >
          Практикуми та воркшопи
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Приєднуйтесь до наших інтерактивних занять для застосування
          теоретичних знань на практиці
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="(workshop, index) in workshops"
          :key="index"
          class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col border-l-4"
          :class="`border-${workshop.color.replace('bg-', '')}`"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center">
              <div
                class="p-3 rounded-lg inline-flex items-center justify-center mr-4"
                :class="workshop.color"
              >
                <Icon :name="workshop.icon" class="text-xl text-white" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-800">
                  {{ workshop.title }}
                </h3>
                <div class="flex items-center mt-1">
                  <Icon name="mdi:calendar" class="text-gray-400 mr-1" />
                  <span class="text-sm text-gray-500">{{ workshop.date }}</span>
                  <span class="mx-2 text-gray-300">|</span>
                  <UBadge
                    :color="
                      workshop.format === 'Онлайн'
                        ? 'emerald'
                        : workshop.format === 'Офлайн'
                        ? 'green'
                        : 'teal'
                    "
                    size="sm"
                  >
                    {{ workshop.format }}
                  </UBadge>
                </div>
              </div>
            </div>
          </div>

          <p class="text-gray-600 mb-4">{{ workshop.description }}</p>

          <div class="mt-auto flex justify-end">
            <UButton color="green" variant="ghost">
              Записатись
              <template #trailing>
                <Icon name="mdi:arrow-right" />
              </template>
            </UButton>
          </div>
        </div>
      </div>

      <div class="text-center mt-10">
        <UButton color="green" variant="outline" size="lg">
          Переглянути всі практикуми
          <template #trailing>
            <Icon name="mdi:arrow-right" />
          </template>
        </UButton>
      </div>
    </section>

    <!-- Статистика платформи -->
    <section class="py-20">
      <div class="text-center mb-16">
        <h2
          class="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent mb-4"
        >
          Наші досягнення
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Humanify у цифрах — результат нашої наполегливої роботи та вашої
          довіри
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="(stat, index) in statistics"
          :key="index"
          class="text-center"
        >
          <div class="flex justify-center mb-4">
            <Icon :name="stat.icon" :class="`text-5xl ${stat.color}`" />
          </div>
          <h3 class="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent">
            {{ stat.value }}
          </h3>
          <p>{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Відгуки студентів -->
    <section class="py-20">
      <div class="text-center mb-12">
        <h2
          class="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent mb-4"
        >
          Відгуки наших студентів
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Гляньте, що кажуть ті, хто вже навчається з нами та здобуває нові
          знання і навички
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex items-center mb-4">
            <div class="flex-shrink-0">
              <div
                class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center"
              >
                <Icon name="mdi:account" class="text-xl text-emerald-600" />
              </div>
            </div>
            <div class="ml-4">
              <h4 class="font-bold text-gray-800">{{ testimonial.name }}</h4>
              <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
            </div>
          </div>

          <div class="mb-4">
            <div class="flex text-amber-400 mb-2">
              <Icon v-for="i in testimonial.rating" :key="i" name="mdi:star" />
              <Icon
                v-for="i in 5 - testimonial.rating"
                :key="i + 5"
                name="mdi:star-outline"
              />
            </div>
            <p class="text-gray-600 italic">{{ testimonial.content }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="py-20 bg-gradient-to-r from-emerald-700 to-green-600 rounded-3xl text-white relative overflow-hidden"
    >
      <!-- Декоративні елементи -->
      <div class="absolute top-0 right-0 opacity-10">
        <Icon name="mdi:function" class="text-9xl" />
      </div>
      <div class="absolute bottom-0 left-0 opacity-10">
        <Icon name="mdi:code-braces" class="text-9xl" />
      </div>

      <div class="relative z-10 text-center w-full mx-auto">
        <h2 class="text-4xl font-bold mb-6">
          Готові розпочати свій шлях в математичне програмування?
        </h2>
        <p class="text-lg text-emerald-100 mb-8">
          Приєднуйтесь до студентів, які вже відкрили для себе новий спосіб
          вивчення математики
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <UButton
            variant="solid"
            size="xl"
            class="font-medium bg-green-600 text-white"
          >
            Зареєструватися безкоштовно
          </UButton>
        </div>
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
</style>
