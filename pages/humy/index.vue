<script setup lang="ts">
useHead({
  title: "Humy - Ваш персональний помічник з математики",
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
    description: "Отримуйте пояснення та рішення задач за лічені секунди"
  },
  {
    icon: "mdi:brain",
    title: "Розумне навчання",
    description: "ШІ адаптується до вашого рівня знань та стилю навчання"
  },
  {
    icon: "mdi:code-tags",
    title: "Код + математика",
    description: "Унікальний підхід через програмування для глибшого розуміння"
  },
  {
    icon: "mdi:clock-outline",
    title: "24/7 доступність",
    description: "Навчайтеся в зручний для вас час без обмежень"
  }
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
      "Електронна підтримка"
    ],
    popular: false,
    buttonText: "Почати навчання",
    color: "gray"
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
      "Експорт рішень у PDF"
    ],
    popular: true,
    buttonText: "Обрати преміум",
    color: "emerald"
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
      "Доступ до бета-функцій"
    ],
    popular: false,
    buttonText: "Стати про",
    color: "purple"
  }
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
    "Пріоритетна підтримка"
  ],
  buttonText: "Підписатися зараз"
};

const testimonials = [
  {
    name: "Анна Коваленко",
    role: "Студентка ІТ",
    content: "HumyAI допоміг мені зрозуміти складні алгоритми через математичні концепції. Тепер програмування стало набагато зрозумілішим!",
    rating: 5
  },
  {
    name: "Дмитро Петров",
    role: "Розробник",
    content: "Завдяки цьому ШІ я нарешті розібрався з лінійною алгеброю та її застосуванням у машинному навчанні.",
    rating: 5
  }
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
    <div class="text-center mb-20">
      <div
        class="inline-flex items-center gap-2 mb-6 px-4 py-2 text-sm font-medium bg-emerald-100 text-emerald-800 rounded-full"
      >
        <Icon name="streamline-flex:ai-scanner-robot-remix" />
        Знайомтесь з Humy
      </div>

      <h1 class="text-5xl md:text-7xl font-extrabold text-emerald-600 mb-6 leading-tight">
        Ваш персональний<br />
        <span class="text-gray-800">математичний помічник</span>
      </h1>

      <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
        Революційний ШІ-чатбот, який допоможе вам освоїти математику через програмування. 
        Індивідуальний підхід, миттєві відповіді та безмежні можливості для навчання.
      </p>

      <!-- Chatbot Illustration -->
      <div class="relative max-w-2xl mx-auto mb-16">
        <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 shadow-lg">
          <div class="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div class="flex items-start gap-4">
              <div class="bg-emerald-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="streamline-flex:ai-scanner-robot-remix" class="text-xl text-white" />
              </div>
              <div class="flex-1">
                <div class="bg-gray-100 rounded-lg p-3 mb-2">
                  <p class="text-sm text-gray-700">Привіт! Як я можу допомогти з математикою сьогодні?</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <div class="flex items-start gap-4 flex-row-reverse">
              <div class="bg-emerald-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:account" class="text-xl text-white" />
              </div>
              <div class="flex-1">
                <div class="bg-emerald-100 rounded-lg p-3 mb-2 ml-auto max-w-xs">
                  <p class="text-sm text-emerald-800">Допоможи розв'язати квадратне рівняння за допомогою Python</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Floating elements -->
        <div class="absolute -top-4 -left-4 bg-emerald-600 w-8 h-8 rounded-full opacity-20 animate-pulse"></div>
        <div class="absolute -bottom-4 -right-4 bg-teal-500 w-6 h-6 rounded-full opacity-30 animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 -right-8 bg-emerald-400 w-4 h-4 rounded-full opacity-25 animate-pulse" style="animation-delay: 2s;"></div>
      </div>
    </div>

    <!-- Features Section -->
    <section class="mb-20">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">Чому HumyAI?</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Унікальні можливості, які роблять навчання математики простішим та ефективнішим
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
        >
          <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
            <Icon :name="feature.icon" class="text-xl text-emerald-600" />
          </div>
          <h3 class="font-bold text-gray-800 mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="mb-20">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">Простий та доступний тариф</h2>
        <p class="text-gray-600 mb-8">Один план з усіма можливостями для ефективного навчання</p>
      </div>

      <div class="max-w-md mx-auto">
        <div class="bg-white rounded-2xl p-8 shadow-lg border-2 border-emerald-600 relative">
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="bg-emerald-600 text-white px-6 py-2 rounded-full text-sm font-medium">
              Рекомендований план
            </span>
          </div>

          <div class="text-center mb-8">
            <Icon name="streamline-flex:ai-scanner-robot-remix" class="text-6xl text-emerald-600 mb-4" />
            <h3 class="text-3xl font-bold text-gray-800 mb-2">{{ plan.name }}</h3>
            <p class="text-gray-600 mb-6">{{ plan.description }}</p>
            <div class="mb-6">
              <span class="text-5xl font-bold text-emerald-600">{{ plan.price }}</span>
              <span class="text-gray-600 text-lg"> ₴/{{ plan.period }}</span>
            </div>
          </div>

          <ul class="space-y-4 mb-8">
            <li v-for="(feature, fIndex) in plan.features" :key="fIndex" class="flex items-start gap-3">
              <Icon name="mdi:check-circle" class="text-emerald-600 flex-shrink-0 mt-0.5 text-lg" />
              <span class="text-gray-700">{{ feature }}</span>
            </li>
          </ul>

          <UButton
            color="emerald"
            size="xl"
            block
            class="font-medium text-lg py-4"
          >
            {{ plan.buttonText }}
          </UButton>
        </div>
      </div>

      <div class="text-center mt-8">
        <p class="text-sm text-gray-500">
          Безкоштовний 7-денний пробний період • Скасувати в будь-який час
        </p>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="mb-20">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">Що кажуть користувачі</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div class="flex text-amber-400 mb-4">
            <Icon v-for="i in testimonial.rating" :key="i" name="mdi:star" />
          </div>
          <p class="text-gray-700 mb-4 italic">"{{ testimonial.content }}"</p>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <Icon name="mdi:account" class="text-emerald-600" />
            </div>
            <div>
              <p class="font-medium text-gray-800">{{ testimonial.name }}</p>
              <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 opacity-10">
        <Icon name="mdi:robot-excited" class="text-9xl" />
      </div>
      <div class="absolute bottom-0 left-0 opacity-10">
        <Icon name="mdi:math-compass" class="text-8xl" />
      </div>

      <div class="relative z-10 max-w-3xl mx-auto">
        <h2 class="text-4xl font-bold mb-6">
          Почніть навчання з HumyAI сьогодні
        </h2>
        <p class="text-xl mb-8 opacity-90">
          Приєднуйтесь до тисяч студентів, які вже відкрили новий спосіб 
          вивчення математики через програмування
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <UButton
            color="white"
            size="lg"
            class="font-medium"
          >
            Спробувати безкоштовно
          </UButton>
          <UButton
            color="white"
            variant="outline"
            size="lg"
            class="font-medium"
          >
            Дізнатися більше
          </UButton>
        </div>

        <p class="text-sm mt-6 opacity-75">
          Без зобов'язань • Скасувати в будь-який час • Миттєвий доступ
        </p>
      </div>
    </section>
  </NuxtLayout>
</template>