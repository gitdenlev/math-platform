<template>
  <footer class="pt-16 pb-8 mt-16">
    <div class="mb-8">
      <div class="flex items-center justify-center md:justify-start mb-6">
        <Logo />
      </div>

      <p
        class="text-gray-500 max-w-md mx-auto md:mx-0 text-center md:text-left mb-8"
      >
        Humanify — це інноваційна освітня платформа, яка об'єднує математику та
        програмування для створення унікального та ефективного навчального
        досвіду.
      </p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
      <div v-for="(section, index) in footerSections" :key="index">
        <h4 class="font-bold text-gray-800 mb-4">{{ section.title }}</h4>
        <ul class="space-y-2">
          <li v-for="link in section.links" :key="link.title">
            <a
              href="#"
              class="text-gray-500 hover:text-emerald-600 transition-colors"
            >
              {{ link.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between"
    >
      <div class="text-gray-500 text-sm mb-4 md:mb-0">
        © 2025 Humanify. Всі права захищено.
      </div>

      <div class="flex space-x-6">
        <a
          href="#"
          class="text-gray-400 hover:text-emerald-600 transition-colors"
        >
          <Icon name="mdi:facebook" class="text-xl" />
        </a>
        <a
          href="#"
          class="text-gray-400 hover:text-emerald-600 transition-colors"
        >
          <Icon name="mdi:twitter" class="text-xl" />
        </a>
        <a
          href="#"
          class="text-gray-400 hover:text-emerald-600 transition-colors"
        >
          <Icon name="mdi:instagram" class="text-xl" />
        </a>
        <a
          href="#"
          class="text-gray-400 hover:text-emerald-600 transition-colors"
        >
          <Icon name="mdi:youtube" class="text-xl" />
        </a>
        <a
          href="#"
          class="text-gray-400 hover:text-emerald-600 transition-colors"
        >
          <Icon name="mdi:github" class="text-xl" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerSections = [
  {
    title: "Платформа",
    links: [
      { title: "Головна", url: "/" },
      { title: "Курси", url: "/courses" },
      { title: "Задачі", url: "/problems" },
      { title: "Довідник", url: "/reference" },
      { title: "Блог", url: "/blog" },
    ],
  },
  {
    title: "Навчання",
    links: [
      { title: "Арифметика", url: "/arithmetic" },
      { title: "Алгебра", url: "/algebra" },
      { title: "Геометрія", url: "/geometry" },
      { title: "Математичний аналіз", url: "/calculus" },
      { title: "Статистика", url: "/statistics" },
    ],
  },
  {
    title: "Компанія",
    links: [
      { title: "Про нас", url: "/about" },
      { title: "Команда", url: "/team" },
      { title: "Партнери", url: "/partners" },
      { title: "Вакансії", url: "/careers" },
      { title: "Контакти", url: "/contacts" },
    ],
  },
  {
    title: "Юридична інформація",
    links: [
      { title: "Умови використання", url: "/terms" },
      { title: "Політика конфіденційності", url: "/privacy" },
      { title: "Cookie політика", url: "/cookies" },
    ],
  },
];
</script>
