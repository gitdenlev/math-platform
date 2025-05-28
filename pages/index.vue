<script setup lang="ts">
import type { StepperItem } from "@nuxt/ui";
import HumanifyPreviewVideo from "~/components/HumanifyPreviewVideo.vue";

const items = ref<StepperItem[]>([
  {
    title: "Вивчення концепції",
    description:
      "Детальне вивчення математичної концепції з інтерактивними прикладами",
    icon: "mdi:book-open-variant",
  },
  {
    title: "Тренування в лабораторії",
    description: "Експериментальне застосування знань у безпечному середовищі",
    icon: "mdi:flask-outline",
  },
  {
    title: "Вирішення задач",
    description: "Застосування знань для розв'язання практичних задач",
    icon: "i-lucide-clipboard",
  },
]);

useHead({
  title: "Humanify - Програмуй Математично",
  meta: [
    {
      name: "description",
      content:
        "Humanify - це новий підхід до вивчення математики через програмування. Відкрийте для себе інтерактивні задачі, експериментальну лабораторію та багато іншого.",
    },
  ],
  link: [
    {
      rel: "icon",
      href: "/logo.svg",
      type: "image/svg+xml",
    },
  ],
});

const features = [
  {
    icon: "mdi:code-braces",
    title: "Інтерактивні задачі",
    description:
      "Розв'язуйте математичні задачі з миттєвою перевіркою правильності рішення та підказками",
  },
  {
    icon: "mdi:book-open-page-variant",
    title: "Докладний довідник",
    description:
      "Повний математичний довідник з формулами, теоремами та візуальними поясненнями",
  },
  {
    icon: "mdi:flask-outline",
    title: "Експериментальна лабораторія",
    description:
      "Досліджуйте математичні концепції за допомогою інтерактивних моделей та симуляцій",
  },
];

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

const statistics = [
  {
    value: "100+",
    label: "Активних студентів",
    icon: "mdi:account-group",
  },
  {
    value: "250+",
    label: "Інтерактивних задач",
    icon: "mdi:code-braces",
  },
  {
    value: "50+",
    label: "Математичних тем",
    icon: "mdi:book-open-variant",
  },
  {
    value: "98%",
    label: "Задоволених студентів",
    icon: "mdi:thumb-up",
  },
];

const isModalOpen = ref(false);
const videoSrc = ref("/video.mp4");

const openVideoModal = () => {
  isModalOpen.value = true;
};

onMounted(() => {
  isModalOpen.value = false;
});
</script>

<template>
  <NuxtLayout name="default">
  
    <div class="flex md:flex-row items-center justify-between text-left">
      <div class="flex-1 text-left relative">
        <div
          class="inline-flex items-center gap-1 mb-4 px-3 py-1 text-sm font-medium bg-emerald-600 text-white rounded-full"
        >
          <Icon name="mdi:star" />
          Новий підхід до вивчення математики
        </div>

        <h1
          class="text-4xl md:text-6xl font-extrabold text-emerald-600 leading-tight"
        >
          Програмуй математично
        </h1>

        <p class="mt-5 text-lg max-w-xl mx-auto md:mx-0">
          Humanify — це більше ніж просто задачі. Це новий спосіб зрозуміти
          математику за допомогою коду — крок за кроком, ідея за ідеєю.
        </p>

        <div class="mt-8 flex justify-center md:justify-start">
          <UButton
            icon="mdi:play-circle-outline"
            label="Подивитися відео"
            @click="openVideoModal"
          />
        </div>
      </div>

      <div
        class="flex-1 justify-center md:justify-end relative hidden md:block"
      >
        <NuxtImg
          loading="lazy"
          width="500"
          src="/math-programming-student-humanify.svg"
          alt="Ілюстрація учня, який вивчає математику за допомогою програмування — навколо нього формули, планета, ДНК, атом і шестерні. Освітня платформа Humanify"
        />
      </div>
    </div>

    <UModal :ui="{ width: 'max-w-3xl' }">
      <HumanifyPreviewVideo
        :src="videoSrc"
        :autoplay="true"
        :loop="false"
        :is-visible="isModalOpen"
        @close="isModalOpen = false"
      />
    </UModal>

    <section class="py-20">
      <div class="text-left md:text-center mb-16">
        <h2 class="text-4xl font-bold text-emerald-600 mb-4">
          Наші можливості
        </h2>
        <p class="text-gray-600 mx-auto">
          Відкрийте для себе унікальні інструменти, які допоможуть вам освоїти
          математику через програмування
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-white text-white rounded-xl p-6 shadow-lg relative overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div
            class="absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-10 bg-emerald-600"
          ></div>

          <div
            class="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-emerald-600"
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

    <section
      class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl"
    >
      <div class="text-left md:text-center mb-16">
        <h2 class="text-4xl font-bold text-emerald-600 mb-4">Як це працює</h2>
        <p class="text-gray-600 mx-auto">
          Наша методика дозволяє вам крок за кроком освоїти математичні
          концепції через програмування
        </p>
      </div>

      <div class="container mx-auto px-4">
        <div
          class="flex flex-col md:flex-row justify-between items-stretch gap-6"
        >
          <div
            class="flex-1 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div class="mb-6 flex justify-center">
              <div
                class="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center"
              >
                <Icon :name="items[0].icon" class="text-2xl text-white" />
              </div>
            </div>
            <div class="text-center">
              <h3 class="text-xl font-bold text-emerald-600 mb-3">
                {{ items[0].title }}
              </h3>
              <p class="text-gray-600">{{ items[0].description }}</p>
            </div>
          </div>

          <div class="hidden md:flex items-center justify-center">
            <div class="w-8 h-1 bg-emerald-600 rounded"></div>
          </div>

          <div
            class="flex-1 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div class="mb-6 flex justify-center">
              <div
                class="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center"
              >
                <Icon :name="items[1].icon" class="text-2xl text-white" />
              </div>
            </div>
            <div class="text-center">
              <h3 class="text-xl font-bold text-emerald-600 mb-3">
                {{ items[1].title }}
              </h3>
              <p class="text-gray-600">{{ items[1].description }}</p>
            </div>
          </div>

          <div class="hidden md:flex items-center justify-center">
            <div class="w-8 h-1 bg-emerald-600 rounded"></div>
          </div>

          <div
            class="flex-1 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div class="mb-6 flex justify-center">
              <div
                class="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center"
              >
                <Icon :name="items[2].icon" class="text-2xl text-white" />
              </div>
            </div>
            <div class="text-center">
              <h3 class="text-xl font-bold text-emerald-600 mb-3">
                {{ items[2].title }}
              </h3>
              <p class="text-gray-600">{{ items[2].description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20">
      <div class="text-left md:text-center mb-16">
        <h2 class="text-4xl font-bold mb-4">Наші досягнення</h2>
        <p class="mx-auto">
          Humanify у цифрах — результат нашої наполегливої роботи та вашої
          довіри
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div v-for="(stat, index) in statistics" :key="index">
          <div class="flex justify-center mb-4">
            <Icon :name="stat.icon" class="text-5xl text-emerald-600" />
          </div>
          <h3 class="text-4xl font-bold mb-2 text-emerald-600">
            {{ stat.value }}
          </h3>
          <p>{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <section class="py-20">
      <div class="text-left md:text-center mb-16">
        <h2 class="text-4xl font-bold mb-4">Відгуки</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Гляньте, що кажуть ті, хто вже навчається з нами та здобуває нові
          знання і навички
        </p>
      </div>

      <UCarousel
        :prev="{ color: 'emerald' }"
        :next="{ variant: 'emerald' }"
        prev-icon="radix-icons:chevron-left"
        next-icon="radix-icons:chevron-right"
        arrows
        :items="testimonials"
        class="w-full mx-auto rounded-xl"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="bg-white rounded-xl p-6 shadow-sm transition-shadow duration-300"
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
                <Icon
                  v-for="i in testimonial.rating"
                  :key="i"
                  name="mdi:star"
                />
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
      </UCarousel>
    </section>

    <section class="py-20 bg-emerald-600 rounded-3xl relative overflow-hidden text-center">
      <div class="absolute top-0 right-0 opacity-10">
        <Icon name="mdi:function" class="text-9xl text-white" />
      </div>
      <div class="absolute bottom-0 left-0 opacity-10">
        <Icon name="mdi:code-braces" class="text-9xl text-white" />
      </div>

      <div class="relative z-10 w-full mx-auto">
        <h2 class="text-4xl font-bold mb-6 text-white">
          Готові розпочати свій шлях в математичне програмування?
        </h2>
        <p class="text-lg text-white mb-8">
          Приєднуйтесь до студентів, які вже відкрили для себе новий спосіб
          вивчення математики
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink to="/login" class="bg-white text-emerald-600"> Зареєструватися безкоштовно </NuxtLink>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>