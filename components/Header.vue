<script setup lang="ts">
const userMenuItems = [
  [
    {
      label: "Мій профіль",
      icon: "mingcute:settings-5-fill",
      click: () => navigateTo("/profile"),
    },
    {
      label: "Налаштування",
      icon: "mingcute:settings-5-fill",
      click: () => navigateTo("/settings"),
    },
  ],
  [
    {
      label: "Вийти",
      icon: "mdi:logout-variant",
      click: () => console.log("Logout"),
    },
  ],
];

// Список математичних тем для випадаючого меню "Довідник"
const mathTopics = [
  [
    {
      label: "Арифметика",
      icon: "mdi:calculator",
      click: () => navigateTo("/reference/arithmetic"),
    },
    {
      label: "Алгебра",
      icon: "mdi:function",
      click: () => navigateTo("/reference/algebra"),
    },
    {
      label: "Геометрія",
      icon: "mdi:shape",
      click: () => navigateTo("/reference/geometry"),
    },
  ],
  [
    {
      label: "Тригонометрія",
      icon: "mdi:sine-wave",
      click: () => navigateTo("/reference/trigonometry"),
    },
    {
      label: "Математичний аналіз",
      icon: "mdi:chart-bell-curve-cumulative",
      click: () => navigateTo("/reference/calculus"),
    },
    {
      label: "Теорія ймовірностей",
      icon: "mdi:dice-multiple",
      click: () => navigateTo("/reference/probability"),
    },
  ],
];
</script>

<template>
  <UDrawer
    direction="top"
    class="custom-drawer"
    :ui="{
      width: 'w-full',
      overlay: { background: 'bg-gray-900/30 backdrop-blur-sm' },
      content: 'bg-gradient-to-r from-emerald-700 to-green-500',
    }"
  >
    <UButton
      size="xl"
      class="z-999 fixed top-5 right-5 rounded-lg text-white bg-green-600 hover:bg-green-500"
      trailing-icon="typcn:th-menu"
    />

    <template #content>
      <div class="p-6 max-w-3xl md:max-w-5xl mx-auto">
        <!-- Логотип і основна навігація -->
        <div class="flex justify-between items-center mb-10">
          <Logo />
        </div>

        <!-- Основна навігація -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- Довідник з випадаючим меню -->
          <div>
            <UDropdown
              :items="mathTopics"
              :popper="{ placement: 'right-start' }"
              trigger="hover"
              mode="hover"
            >
              <div
                class="bg-white text-black rounded-lg p-6 hover:shadow-xl transition-colors cursor-pointer relative group"
              >
                <div
                  class="p-3 bg-green-500 rounded-lg inline-flex items-center justify-center mb-4 transition-all"
                >
                  <Icon
                    name="mdi:book-open-variant"
                    class="text-3xl text-white"
                  />
                </div>

                <h3 class="text-xl font-bold mb-2">Довідник</h3>
                <p class="text-sm">
                  Повний довідник з математичних тем та формул
                </p>
              </div>
            </UDropdown>
          </div>

          <!-- Задачі -->
          <div>
            <NuxtLink to="/problems" class="block">
              <div
                class="bg-white rounded-lg p-6 hover:shadow-xl transition-colors cursor-pointer border border-green-500/20"
              >
                <div
                  class="p-3 bg-green-500 rounded-lg inline-flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-all"
                >
                  <Icon name="mdi:numeric" class="text-3xl text-white" />
                </div>

                <h3 class="text-xl font-bold mb-2">Задачі</h3>
                <p class="text-sm">
                  Розв'язуйте математичні задачі різних рівнів складності
                </p>
              </div>
            </NuxtLink>
          </div>

          <!-- Лабораторія -->
          <div>
            <NuxtLink to="/lab" class="block">
              <div
                class="bg-white rounded-lg p-6 hover:shadow-xl transition-colors cursor-pointer border border-green-500/20"
              >
                <div
                  class="p-3 bg-green-500 rounded-lg inline-flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-all"
                >
                  <Icon name="mdi:flask" class="text-3xl text-white" />
                </div>

                <h3 class="text-xl font-bold mb-2">Лабораторія</h3>
                <p class="text-sm">
                  Інтерактивні експерименти та математичні моделі
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </template>
  </UDrawer>
</template>

<style scoped>
/* Додаткові стилі для анімацій та ефектів */
.custom-drawer :deep(.u-button) {
  transition: all 0.2s ease;
}

.custom-drawer :deep(.u-button:hover) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Стилі для карток */
.custom-drawer :deep(.u-dropdown) {
  width: 100%;
}
</style>
