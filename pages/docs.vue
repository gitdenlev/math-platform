<template>
  <div
    class="flex h-screen bg-white dark:bg-[#0c0c0c] text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden"
  >
    <!-- Sidebar Navigation -->
    <aside
      class="w-72 hidden lg:flex flex-col border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#121212] h-full"
      <!--
      Logo
      Area
      --
    >
      <div
        class="p-3 flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800 shrink-0"
      >
        <div class="w-8 h-8 rounded-md flex items-center justify-center">
          <Icon name="ph:book-open" size="20" />
        </div>
        <span class="text-lg">Документація</span>
      </div>

      <nav class="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
        <div class="space-y-1 mb-6">
          <div
            v-for="section in commandSections"
            :key="section.title"
            class="rounded-md overflow-hidden"
          >
            <button
              @click="toggleSection(section.title)"
              class="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              :class="
                expandedSections[section.title]
                  ? 'text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-800/30'
                  : 'text-zinc-600 dark:text-zinc-400'
              "
            >
              <div class="flex items-center gap-3">
                <Icon
                  :name="section.icon"
                  size="18"
                  :class="
                    expandedSections[section.title]
                      ? 'text-zinc-900 dark:text-zinc-100'
                      : 'text-zinc-400 dark:text-zinc-500'
                  "
                />
                <span>{{ section.title }}</span>
              </div>
              <Icon
                name="ph:caret-down-bold"
                size="14"
                class="transition-transform duration-200 text-zinc-400"
                :class="{ 'rotate-180': expandedSections[section.title] }"
              />
            </button>
            <div
              v-show="expandedSections[section.title]"
              class="bg-zinc-50/50 dark:bg-zinc-800/30"
            >
              <div class="px-4 py-2 space-y-1">
                <button
                  v-for="item in section.items"
                  :key="item.label"
                  @click="selectItem(item)"
                  class="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-all group"
                  :class="
                    activeItem?.label === item.label
                      ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10'
                      : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  "
                >
                  <span class="truncate">{{ item.label }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            v-for="section in formulaSections"
            :key="section.title"
            class="rounded-md overflow-hidden"
          >
            <button
              @click="toggleSection(section.title)"
              class="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              :class="
                expandedSections[section.title]
                  ? 'text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-800/30'
                  : 'text-zinc-600 dark:text-zinc-400'
              "
            >
              <div class="flex items-center gap-3">
                <Icon
                  :name="section.icon"
                  size="18"
                  :class="
                    expandedSections[section.title]
                      ? 'text-zinc-900 dark:text-zinc-100'
                      : 'text-zinc-400 dark:text-zinc-500'
                  "
                />
                <span>{{ section.title }}</span>
              </div>
              <Icon
                name="ph:caret-down-bold"
                size="14"
                class="transition-transform duration-200 text-zinc-400"
                :class="{ 'rotate-180': expandedSections[section.title] }"
              />
            </button>
            <div
              v-show="expandedSections[section.title]"
              class="bg-zinc-50/50 dark:bg-zinc-900/30"
            >
              <div class="px-4 py-2 space-y-1">
                <button
                  v-for="item in section.items"
                  :key="item.label"
                  @click="selectItem(item)"
                  class="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-all group border-l-2"
                  :class="
                    activeItem?.label === item.label
                      ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10'
                      : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  "
                >
                  <span class="truncate">{{ item.label }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="p-6 border-t border-slate-100 dark:border-slate-800 shrink-0">
        <NuxtLink
          to="/"
          class="flex items-center gap-3 text-sm font-semibold text-zinc-500 hover:text-emerald-500 transition-colors"
        >
          <Icon name="ph:arrow-left-bold" />
          Назад до розрахунків
        </NuxtLink>
      </div>
    </aside>

    <!-- Main Content -->
    <main
      class="flex-1 bg-white dark:bg-[#0c0c0c] h-full overflow-hidden flex items-center justify-center"
      ref="mainContent"
    >
      <div class="max-w-4xl px-8 py-8 lg:px-12 w-full">
        <div
          v-if="activeItem"
          :key="activeItem.label"
          class="max-w-lg mx-auto animate-fade-in"
        >
          <!-- Title -->
          <h3 class="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            {{ activeItem.label }}
          </h3>

          <!-- Description -->
          <p
            class="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8"
          >
            {{ activeItem.description }}
          </p>

          <!-- Example Usage -->
          <div class="space-y-3">
            <h4 class="text-xl font-bold text-zinc-900 dark:text-white">
              Приклад використання
            </h4>

            <div
              class="bg-[#f8faff] dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-md overflow-hidden shadow-sm"
            >
              <!-- MATH Header -->
              <div
                class="px-5 py-2.5 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center"
              >
                <span
                  class="text-[10px] font-bold text-zinc-400 tracking-widest uppercase"
                  >МАТЕМАТИКА</span
                >
                <button
                  @click="copyExample(activeItem.example)"
                  class="text-zinc-400 hover:text-emerald-500 transition-colors"
                >
                  <Icon name="ph:copy" size="18" />
                </button>
              </div>

              <!-- Expression -->
              <div class="p-7 bg-white dark:bg-zinc-900">
                <code
                  class="text-xl font-mono text-emerald-600 dark:text-emerald-400"
                >
                  {{ activeItem.example }}
                </code>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center">
          <Icon
            name="ph:cursor-click"
            size="40"
            class="text-zinc-200 dark:text-zinc-800 mb-3 mx-auto"
          />
          <p class="text-zinc-400 text-sm">Виберіть елемент з бічної панелі</p>
        </div>
      </div>
    </main>

    <!-- Right side replaced by empty space or centered layout -->

    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="showToast" class="fixed bottom-8 right-8 z-50">
        <div
          class="bg-slate-900 dark:bg-emerald-500 text-white px-6 py-3 rounded-md shadow-2xl flex items-center gap-3"
        >
          <Icon name="ph:check-circle-fill" />
          <span class="text-sm font-bold">Скопійовано в буфер обміну</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

definePageMeta({ layout: "blank" });

const activeItem = ref<any>(null);
const showToast = ref(false);

const sections = [
  {
    title: "Арифметика",
    icon: "ph:calculator-bold",
    category: "commands",
    items: [
      {
        label: "Додавання",
        syntax: "a + b",
        description: "Сумує два або більше чисел або змінних.",
        example: "125 + 75",
      },
      {
        label: "Віднімання",
        syntax: "a - b",
        description: "Знаходить різницю між двома значеннями.",
        example: "200 - 45.5",
      },
      {
        label: "Множення",
        syntax: "a * b",
        description: "Множить два або більше чисел.",
        example: "12 * 8",
      },
      {
        label: "Ділення",
        syntax: "a / b",
        description: "Ділить одне число на інше.",
        example: "100 / 3",
      },
      {
        label: "Степінь",
        syntax: "a ^ b",
        description: "Підносить число до степеня.",
        example: "2 ^ 10",
      },
      {
        label: "Остача (Mod)",
        syntax: "mod(a, b)",
        description: "Повертає остачу від ділення.",
        example: "mod(25, 4)",
      },
      {
        label: "Округлення",
        syntax: "round(x)",
        description: "Округлює число до найближчого цілого.",
        example: "round(3.6)",
      },
      {
        label: "Округлення вниз",
        syntax: "floor(x)",
        description: "Округлює число вниз до найближчого цілого.",
        example: "floor(3.9)",
      },
      {
        label: "Округлення вгору",
        syntax: "ceil(x)",
        description: "Округлює число вгору до найближчого цілого.",
        example: "ceil(3.1)",
      },
    ],
  },
  {
    title: "Функції",
    icon: "ph:function-bold",
    category: "commands",
    items: [
      {
        label: "Квадратний корінь",
        syntax: "sqrt(x)",
        description: "Обчислює квадратний корінь числа.",
        example: "sqrt(144)",
      },
      {
        label: "Синус",
        syntax: "sin(x)",
        description: "Синус кута (в радіанах за замовчуванням).",
        example: "sin(pi / 2)",
      },
      {
        label: "Косинус",
        syntax: "cos(x)",
        description: "Косинус кута (в радіанах за замовчуванням).",
        example: "cos(pi)",
      },
      {
        label: "Тангенс",
        syntax: "tan(x)",
        description: "Тангенс кута.",
        example: "tan(45 deg)",
      },
      {
        label: "Логарифм",
        syntax: "log(x)",
        description: "Логарифм за основою 10.",
        example: "log(100)",
      },
      {
        label: "Натуральний логарифм",
        syntax: "ln(x)",
        description: "Натуральний логарифм (основа e).",
        example: "ln(e^2)",
      },
      {
        label: "Модуль",
        syntax: "abs(x)",
        description: "Абсолютне значення числа.",
        example: "abs(-50)",
      },
      {
        label: "Факторіал",
        syntax: "n!",
        description: "Добуток усіх натуральних чисел до n.",
        example: "5!",
      },
      {
        label: "Середнє",
        syntax: "mean(a, b, ...)",
        description: "Обчислює середнє арифметичне аргументів.",
        example: "mean(1, 2, 3, 4)",
      },
    ],
  },
  {
    title: "Константи",
    icon: "ph:pi-bold",
    category: "commands",
    items: [
      {
        label: "Пі",
        syntax: "pi",
        description: "Відношення довжини кола до його діаметра (~3.14159).",
        example: "pi",
      },
      {
        label: "Число Ейлера",
        syntax: "e",
        description: "Основа натурального логарифма (~2.71828).",
        example: "e",
      },
      {
        label: "Золотий перетин",
        syntax: "phi",
        description: "Золотий перетин (~1.618).",
        example: "phi",
      },
      {
        label: "Гравітація (Земля)",
        syntax: "g",
        description: "Стандартне прискорення вільного падіння (~9.807 м/s²).",
        example: "g",
      },
      {
        label: "Швидкість світла",
        syntax: "c",
        description: "Швидкість світла у вакуумі (~299,792,458 м/s).",
        example: "c",
      },
    ],
  },
  {
    title: "Конвертація",
    icon: "ph:arrows-left-right-bold",
    category: "commands",
    items: [
      {
        label: "Довжина",
        syntax: "value unit to unit",
        description:
          "Конвертація між м, км, см, мм, дюймами, футами, ярдами, милями.",
        example: "10 m to feet",
      },
      {
        label: "Маса",
        syntax: "value unit to unit",
        description: "Конвертація між кг, г, мг, фунтами, унціями, тоннами.",
        example: "50 kg to lbs",
      },
      {
        label: "Температура",
        syntax: "value unit to unit",
        description: "Конвертація між degC, degF, K.",
        example: "36.6 degC to degF",
      },
      {
        label: "Час",
        syntax: "value unit to unit",
        description:
          "Конвертація між секундами, хвилинами, годинами, днями, тижнями, роками.",
        example: "2 hours to seconds",
      },
      {
        label: "Дані",
        syntax: "value unit to unit",
        description: "Конвертація між б, Б, кБ, МБ, ГБ, ТБ.",
        example: "1024 MB to GB",
      },
    ],
  },
  {
    title: "Геометричні формули",
    icon: "ph:shapes-bold",
    category: "formulas",
    items: [
      {
        label: "Площа кола",
        syntax: "pi * r^2",
        description: "Площа кола з радіусом r.",
        example: "pi * 5^2",
      },
      {
        label: "Довжина кола",
        syntax: "2 * pi * r",
        description: "Довжина кола з радіусом r.",
        example: "2 * pi * 5",
      },
      {
        label: "Площа прямокутника",
        syntax: "width * height",
        description: "Площа прямокутника.",
        example: "10 * 20",
      },
      {
        label: "Площа трикутника",
        syntax: "0.5 * base * height",
        description: "Площа трикутника.",
        example: "0.5 * 10 * 5",
      },
      {
        label: "Теорема Піфагора",
        syntax: "sqrt(a^2 + b^2)",
        description: "Гіпотенуза прямокутного трикутника.",
        example: "sqrt(3^2 + 4^2)",
      },
      {
        label: "Об'єм сфери",
        syntax: "4/3 * pi * r^3",
        description: "Об'єм сфери.",
        example: "4/3 * pi * 3^3",
      },
    ],
  },
  {
    title: "Алгебраїчні формули",
    icon: "ph:function-bold",
    category: "formulas",
    items: [
      {
        label: "Дискримінант",
        syntax: "b^2 - 4*a*c",
        description: "Визначає характер коренів для ax² + bx + c = 0.",
        example: "5^2 - 4*1*6",
      },
      {
        label: "Корінь квадратного рівняння (+)",
        syntax: "(-b + sqrt(b^2 - 4*a*c)) / (2*a)",
        description: "Позитивний корінь квадратного рівняння.",
        example: "(-5 + sqrt(5^2 - 4*1*6)) / 2",
      },
      {
        label: "Відстань 2D",
        syntax: "sqrt((x2-x1)^2 + (y2-y1)^2)",
        description: "Відстань між двома точками (x1,y1) та (x2,y2).",
        example: "sqrt((5-1)^2 + (5-2)^2)",
      },
      {
        label: "Середня точка",
        syntax: "((x1+x2)/2, (y1+y2)/2)",
        description: "Середина відрізка між двома точками.",
        example: "((1+5)/2, (2+6)/2)",
      },
    ],
  },
];

const commandSections = computed(() =>
  sections.filter((s) => s.category === "commands")
);
const formulaSections = computed(() =>
  sections.filter((s) => s.category === "formulas")
);

const expandedSections = ref<Record<string, boolean>>({});

// Initialize first section as open
if (sections.length > 0) {
  expandedSections.value[sections[0].title] = true;
}

const toggleSection = (title: string) => {
  expandedSections.value[title] = !expandedSections.value[title];
};

activeItem.value = sections[0].items[0];

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

const selectItem = (item: any) => {
  activeItem.value = item;
};

const copyExample = (text: string) => {
  navigator.clipboard.writeText(text);
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 2000);
};

useHead({ title: "Документація - Humanify" });
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e2e2;
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #1e293b;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px) scale(0.995);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translate(20px, 0);
}
.toast-leave-to {
  opacity: 0;
  transform: translate(20px, 0);
}

/* Remove any potential uppercase/tracking from children if they leak */
* {
  text-transform: none !important;
  letter-spacing: normal !important;
}
</style>
