<script setup lang="ts">
import { allFooterSections } from "@/constants/common/footer/footerSections";
</script>

<template>
  <footer class="mt-16 mb-4">
    <div class="mb-8 flex flex-col items-start">
      <div class="flex items-center mb-6">
        <HumanifyLogo logo-color="text-emerald-600" />
      </div>

      <p
        class="max-w-md mx-auto md:mx-0 text-left md:text-left mb-8"
      >
        Humanify — це інноваційна освітня платформа, яка об'єднує математику та
        програмування для створення унікального та ефективного навчального
        досвіду.
      </p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
      <div v-for="(section, index) in allFooterSections" :key="index">
        <h4 class="font-semibold mb-4">{{ section.title }}</h4>
        <ul class="space-y-2">
          <li v-for="link in section.links" :key="link.title">
            <NuxtLink
              :to="link.url"
              class="text-gray-500 hover:text-emerald-600 transition-colors"
            >
              {{ link.title }}
            </NuxtLink>
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

      <NuxtLink
        href="https://www.instagram.com/humanify_ua/?hl=en"
        class="text-gray-400 hover:text-emerald-600 transition-colors"
      >
        <Icon name="mdi:instagram" class="text-xl" />
      </NuxtLink>
    </div>
  </footer>
</template>
