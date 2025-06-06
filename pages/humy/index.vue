<script setup lang="ts">
useHead({
  title: "HumyAI - Ваш персональний помічник з математики",
  meta: [
    {
      name: "description",
      content:
        "Отримайте доступ до персонального ШІ-помічника, який допоможе вам розв'язувати математичні задачі через програмування. Індивідуальний підхід, миттєві відповіді, 24/7 підтримка.",
    },
  ],
  link: [
    {
      rel: "icon",
      href: "/humy-ai-chatbot-humanify.svg",
      type: "image/svg+xml",
    },
  ],
});

const features = [
  {
    icon: "mdi:lightning-bolt",
    title: "Миттєві відповіді",
    description: "Отримуйте пояснення та рішення задач за лічені секунди",
  },
  {
    icon: "mdi:brain",
    title: "Розумне навчання",
    description: "ШІ адаптується до вашого рівня знань та стилю навчання",
  },
  {
    icon: "mdi:code-tags",
    title: "Код + математика",
    description: "Унікальний підхід через програмування для глибшого розуміння",
  },
  {
    icon: "mdi:clock-outline",
    title: "24/7 доступність",
    description: "Навчайтеся в зручний для вас час без обмежень",
  },
];

const plans = [
  {
    name: "Базовий",
    price: "199",
    period: "місяць",
    description: "Ідеально для початківців",
    features: [
      "50 запитань на місяць",
      "Базові математичні теми",
      "Стандартна швидкість відповіді",
      "Електронна підтримка",
    ],
    popular: false,
    buttonText: "Почати навчання",
    color: "gray",
  },
  {
    name: "Преміум",
    price: "399",
    period: "місяць",
    description: "Найпопулярніший вибір",
    features: [
      "Необмежена кількість запитань",
      "Всі математичні теми",
      "Пріоритетна швидкість відповіді",
      "Персоналізовані поради",
      "Детальні пояснення коду",
      "Експорт рішень у PDF",
    ],
    popular: true,
    buttonText: "Обрати преміум",
    color: "emerald",
  },
  {
    name: "Про",
    price: "699",
    period: "місяць",
    description: "Для серйозних студентів",
    features: [
      "Все з преміум плану",
      "Персональні консультації",
      "Пріоритетна підтримка 24/7",
      "Індивідуальні навчальні плани",
      "Доступ до бета-функцій",
    ],
    popular: false,
    buttonText: "Стати про",
    color: "purple",
  },
];

const plan = {
  name: "HumyAI",
  price: "129",
  period: "місяць",
  description: "Повний доступ до всіх можливостей",
  features: [
    "Необмежена кількість запитань",
    "Всі математичні теми",
    "Миттєві відповіді 24/7",
    "Персоналізовані поради",
    "Детальні пояснення коду",
    "Експорт рішень у PDF",
    "Пріоритетна підтримка",
  ],
  buttonText: "Підписатися зараз",
};

const testimonials = [
  {
    name: "Анна Коваленко",
    role: "Студентка ІТ",
    content:
      "HumyAI допоміг мені зрозуміти складні алгоритми через математичні концепції. Тепер програмування стало набагато зрозумілішим!",
    rating: 5,
  },
  {
    name: "Дмитро Петров",
    role: "Розробник",
    content:
      "Завдяки цьому ШІ я нарешті розібрався з лінійною алгеброю та її застосуванням у машинному навчанні.",
    rating: 5,
  },
];

const isYearly = ref(false);

const getPrice = (monthlyPrice: string) => {
  const monthly = parseInt(monthlyPrice);
  return isYearly.value ? Math.round(monthly * 12 * 0.8) : monthly;
};
</script>

<template>
  <NuxtLayout name="default">
    <!-- Hero Section -->
    <div class="text-left md:text-center mb-20">
      <div
        class="inline-flex items-center gap-2 mb-6 px-4 py-2 text-sm font-medium bg-emerald-100 text-emerald-800 rounded-full"
      >
        <Icon name="streamline-flex:ai-scanner-robot-remix" />
        Знайомтесь з Humy
      </div>

      <h1
        class="text-4xl md:text-7xl font-extrabold text-emerald-600 mb-6 leading-tight"
      >
        Ваш персональний
        <br />
        <span class="text-gray-600">математичний помічник</span>
      </h1>

      <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
        Революційний ШІ-чатбот, який допоможе вам освоїти математику через
        програмування. Індивідуальний підхід, миттєві відповіді та безмежні
        можливості для навчання.
      </p>

      <!-- Updated Chatbot Illustration -->
      <div class="relative max-w-2xl mx-auto mb-16">
        <div
          class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 shadow-lg"
        >
          <!-- Bot message (left aligned) -->
          <div class="flex items-start gap-4 mb-6">
            <div
              class="bg-emerald-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <Icon
                name="streamline-flex:ai-scanner-robot-remix"
                class="text-xl text-white"
              />
            </div>
            <div class="flex-1 max-w-[70%]">
              <div class="bg-white rounded-2xl px-4 py-3 shadow-sm w-fit">
                <p class="text-sm text-gray-700">
                  Привіт! Як я можу допомогти з математикою сьогодні?
                </p>
              </div>
            </div>
          </div>

          <!-- User message (right aligned) -->
          <div class="flex items-start gap-4 flex-row-reverse mb-6">
            <div
              class="bg-emerald-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <Icon name="mdi:account" class="text-xl text-white" />
            </div>
            <div class="flex-1 max-w-[70%] flex justify-end">
              <div class="bg-emerald-100 rounded-2xl px-4 py-3 w-fit">
                <p class="text-sm text-gray-800">
                  Допоможи з квадратним рівнянням.
                </p>
              </div>
            </div>
          </div>

          <!-- Bot response (left aligned) -->
          <div class="flex items-start gap-4">
            <div
              class="bg-emerald-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <Icon
                name="streamline-flex:ai-scanner-robot-remix"
                class="text-xl text-white"
              />
            </div>
            <div class="flex-1 max-w-[75%]">
              <div
                class="bg-white rounded-2xl px-4 py-3 shadow-sm w-fit text-left"
              >
                <p class="text-sm text-gray-700">
                  Звичайно! Квадратне рівняння має вигляд ax² + bx + c = 0. Для
                  розв'язання використовуємо формулу дискримінанта. Хочете
                  розглянути конкретний приклад?
                </p>
              </div>
            </div>
          </div>

          <!-- Short user response -->
          <div class="flex items-start gap-4 flex-row-reverse mt-6">
            <div
              class="bg-emerald-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <Icon name="mdi:account" class="text-xl text-white" />
            </div>
            <div class="flex-1 max-w-[70%] flex justify-end">
              <div class="bg-emerald-100 rounded-2xl px-4 py-3 w-fit">
                <p class="text-sm text-gray-800">Так, дякую! 👍</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Floating elements -->
        <div
          class="absolute -top-4 -left-4 bg-emerald-600 w-8 h-8 rounded-full opacity-20 animate-pulse"
        ></div>
        <div
          class="absolute -bottom-4 -right-4 bg-teal-500 w-6 h-6 rounded-full opacity-30 animate-pulse"
          style="animation-delay: 1s"
        ></div>
        <div
          class="absolute top-1/2 -right-8 bg-emerald-400 w-4 h-4 rounded-full opacity-25 animate-pulse"
          style="animation-delay: 2s"
        ></div>
      </div>
    </div>
  </NuxtLayout>
</template>
