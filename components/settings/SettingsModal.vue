<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-100 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm"
        @click.self="handleClose"
      >
        <div
          class="bg-white dark:bg-[#0d0d0d] w-full max-w-2xl rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-800/40 overflow-hidden transition-transform duration-200 relative"
          @click.stop
        >
          <!-- Header -->
          <header
            class="px-8 pt-6 pb-5 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60"
          >
            <h1
              class="text-2xl font-semibold text-zinc-900 dark:text-white tracking-tight"
            >
              Налаштування
            </h1>
            <button
              class="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 outline-none"
              @click="handleClose"
            >
              <Icon name="ph:x-bold" size="20" />
            </button>
          </header>

          <!-- Content -->
          <div class="overflow-y-auto custom-scrollbar max-h-[600px]">
            <div class="px-8 py-6">
              <div class="space-y-8">
                <!-- Interface Section -->
                <div>
                  <h3
                    class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4"
                  >
                    Інтерфейс
                  </h3>
                  <div class="divide-y divide-zinc-100 dark:divide-zinc-800/40">
                    <!-- Theme -->
                    <div
                      class="flex items-center justify-between py-6 first:pt-0"
                    >
                      <label
                        class="text-base font-medium text-zinc-900 dark:text-zinc-100"
                        >Зовнішній вигляд</label
                      >
                      <USelect
                        v-model="settings.appearance"
                        :options="appearanceOptions"
                        option-attribute="label"
                        value-attribute="value"
                        size="sm"
                        class="w-40"
                      />
                    </div>
                  </div>
                </div>

                <!-- AI Section -->
                <div>
                  <h3
                    class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4"
                  >
                    ШІ
                  </h3>
                  <div class="divide-y divide-zinc-100 dark:divide-zinc-800/40">
                    <!-- Explain Tone -->
                    <div
                      class="flex items-center justify-between py-6 first:pt-0"
                    >
                      <div class="space-y-1 max-w-md">
                        <label
                          class="text-base font-medium text-zinc-900 dark:text-zinc-100"
                          >Тон пояснення</label
                        >
                        <p class="text-sm text-zinc-500">
                          Виберіть, як ШІ пояснює вам математику
                        </p>
                      </div>
                      <USelect
                        v-model="settings.explainTone"
                        :options="explainToneOptions"
                        option-attribute="label"
                        value-attribute="value"
                        size="sm"
                        class="w-40"
                      />
                    </div>
                  </div>
                </div>

                <!-- Spaces Section -->
                <div>
                  <h3
                    class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4"
                  >
                    Простори
                  </h3>
                  <div class="divide-y divide-zinc-100 dark:divide-zinc-800/40">
                    <!-- Memory -->
                    <div class="py-6 first:pt-0">
                      <div class="flex items-center justify-between mb-5">
                        <label
                          class="text-base font-medium text-zinc-900 dark:text-zinc-100"
                          >Сховище простору</label
                        >
                        <span
                          class="text-sm font-semibold text-zinc-400 tracking-tight"
                          >24% ЗАЙНЯТО (12 / 50)</span
                        >
                      </div>
                      <div
                        class="w-full h-2 bg-zinc-100 dark:bg-zinc-800/80 rounded-full overflow-hidden"
                      >
                        <div
                          class="h-full bg-emerald-500 transition-all duration-1000 ease-in-out"
                          style="width: 24%"
                        ></div>
                      </div>
                      <p class="mt-5 text-sm text-zinc-500 leading-relaxed">
                        Ваш простір керується автоматично. Коли ви досягнете
                        ліміту, старі розрахунки можуть бути заархівовані, щоб
                        звільнити місце.
                      </p>
                    </div>

                    <!-- Clear all spaces -->
                    <div class="flex items-center justify-between py-6">
                      <div class="space-y-1 max-w-md">
                        <label
                          class="text-base font-medium text-zinc-900 dark:text-zinc-100"
                          >Очистити всі простори</label
                        >
                        <p class="text-sm text-zinc-500">
                          Назавжди видалити історію розрахунків
                        </p>
                      </div>
                      <button
                        class="px-4 py-2 text-sm font-medium text-red-500 border border-red-500/40 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        Видалити
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Account Section -->
                <div>
                  <h3
                    class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4"
                  >
                    Акаунт
                  </h3>
                  <div class="divide-y divide-zinc-100 dark:divide-zinc-800/40">
                    <!-- User Account -->
                    <div class="py-6 flex items-center gap-5 first:pt-0">
                      <div
                        class="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white text-2xl font-semibold shadow-sm overflow-hidden border border-zinc-200 dark:border-zinc-700"
                      >
                        <img
                          v-if="userAvatar"
                          :src="userAvatar"
                          class="w-full h-full object-cover"
                        />
                        <span v-else>D</span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <h3
                          class="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
                        >
                          Denys Levcenko
                        </h3>
                        <p class="text-sm text-zinc-500">
                          denis.levcenko@example.com
                        </p>
                      </div>
                    </div>

                    <!-- Logout -->
                    <div class="flex items-center justify-between py-6">
                      <div class="flex items-center gap-3">
                        <Icon
                          name="ph:sign-out-bold"
                          size="20"
                          class="text-zinc-400"
                        />
                        <span
                          class="text-base font-medium text-zinc-700 dark:text-zinc-300"
                          >Вийти</span
                        >
                      </div>
                      <button
                        class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors"
                      >
                        Вийти
                      </button>
                    </div>

                    <!-- Delete Account -->
                    <div class="flex items-center justify-between py-6">
                      <div class="space-y-1 max-w-md">
                        <label
                          class="text-base font-medium text-zinc-900 dark:text-zinc-100"
                          >Видалити акаунт</label
                        >
                      </div>
                      <button
                        class="px-4 py-2 text-sm font-medium text-red-500 border border-red-500/40 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        Видалити
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({ modelValue: Boolean });
const emit = defineEmits(["update:modelValue", "close"]);

const colorMode = useColorMode();
const userAvatar = ref(null);

// State for settings
const settings = reactive({
  explainTone: "friendly",
  appearance: colorMode.preference || "system",
});

watch(
  () => settings.appearance,
  (newVal) => {
    colorMode.preference = newVal;
  },
);

const appearanceOptions = [
  { value: "system", label: "Системна" },
  { value: "light", label: "Світла" },
  { value: "dark", label: "Темна" },
];

const explainToneOptions = [
  { value: "friendly", label: "Дружній" },
  { value: "academic", label: "Академічний" },
  { value: "concise", label: "Лаконічний" },
];

const handleClose = () => {
  emit("close");
  emit("update:modelValue", false);
};
</script>

<style scoped>
@reference "~/assets/css/main.css";

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e5e5;
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #27272a;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(10px);
}
</style>
