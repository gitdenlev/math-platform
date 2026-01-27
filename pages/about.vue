<template>
  <div
    class="min-h-screen bg-white dark:bg-[#0c0c0c] text-zinc-900 dark:text-zinc-100 selection:bg-emerald-500/20 selection:text-emerald-900 font-['Outfit'] scroll-smooth"
  >
    <!-- Close Button -->
    <button
      @click="router.push('/')"
      class="fixed top-8 right-8 p-3 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all z-50 text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
    >
      <Icon name="ph:x-bold" size="20" />
    </button>

    <!-- Navigation (Minimalist) -->
    <nav
      class="absolute top-0 left-0 w-full px-6 sm:px-12 lg:px-24 py-8 flex justify-between items-center z-40"
    >
      <div class="font-bold text-xl tracking-tight">Humanify</div>
      <div class="hidden sm:flex gap-8 text-sm font-medium text-zinc-500">
        <a
          href="#mission"
          class="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >Місія</a
        >
        <a
          href="#capabilities"
          class="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >Можливості</a
        >
        <a
          href="#privacy"
          class="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >Конфіденційність</a
        >
      </div>
    </nav>

    <!-- Hero -->
    <section
      class="relative min-h-[85vh] flex items-center px-6 sm:px-12 lg:px-24 pt-20"
    >
      <div class="absolute inset-0 pointer-events-none">
        <div
          class="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent opacity-30"
        ></div>
        <div
          class="absolute top-[-5%] left-[-2%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]"
        ></div>
      </div>

      <div
        class="relative z-10 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-1000"
      >
        <div
          class="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest mb-8"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Математика нового покоління
        </div>
        <h1
          class="text-6xl sm:text-8xl font-bold tracking-tight mb-8 leading-[1.05]"
        >
          Обчислення з<br />
          <span
            class="text-emerald-600 dark:text-emerald-500 underline decoration-zinc-200 dark:decoration-zinc-800 underline-offset-8"
            >розумінням.</span
          >
        </h1>
        <p
          class="text-xl sm:text-2xl text-zinc-500 dark:text-zinc-400 max-w-2xl mb-12 leading-relaxed"
        >
          Humanify перетворює складну логіку на інтуїтивне розуміння. Ми
          створюємо інструменти, які не просто вирішують, а пояснюють.
        </p>
        <div class="flex flex-wrap gap-6">
          <button
            @click="router.push('/')"
            class="px-10 py-4 rounded-full font-bold text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-zinc-500/10"
          >
            Почати вирішувати
          </button>
        </div>
      </div>
    </section>

    <!-- The Mission -->
    <section
      id="mission"
      class="py-32 px-6 sm:px-12 lg:px-24 border-t border-zinc-100 dark:border-zinc-900"
    >
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        <div class="lg:w-1/3">
          <h2
            class="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4"
          >
            Місія
          </h2>
          <h3 class="text-4xl font-bold leading-tight">
            Ясність понад <br />складність.
          </h3>
        </div>
        <div class="lg:w-2/3">
          <p
            class="text-2xl text-zinc-600 dark:text-zinc-300 leading-snug mb-12"
          >
            Більшість програм розглядають математику як набір вхідних і вихідних
            даних. Ми розглядаємо її як мову, що потребує перекладу.
          </p>
          <div
            class="grid sm:grid-cols-2 gap-12 pt-8 border-t border-zinc-100 dark:border-zinc-900"
          >
            <div>
              <h4 class="font-bold text-lg mb-3">Інтуїція на першому місці</h4>
              <p class="text-zinc-500 leading-relaxed">
                Ніякого безладу. Ніяких перешкод. Робочий простір, створений для
                того, щоб ви могли зосередитися на чистій логіці.
              </p>
            </div>
            <div>
              <h4 class="font-bold text-lg mb-3">Змістовні відповіді</h4>
              <p class="text-zinc-500 leading-relaxed">
                Ми надаємо обґрунтування кожного результату, перетворюючи
                обчислення на знання.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Capabilities -->
    <section
      id="capabilities"
      class="py-32 bg-zinc-50 dark:bg-zinc-900/40 px-6 sm:px-12 lg:px-24"
    >
      <div class="max-w-7xl mx-auto">
        <div class="mb-24">
          <h2
            class="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4"
          >
            Можливості
          </h2>
          <h3 class="text-5xl font-bold">Стандартні функції.</h3>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20">
          <div>
            <div
              class="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center mb-6 shadow-sm border border-zinc-100 dark:border-zinc-700"
            >
              <Icon
                name="ph:lightning-bold"
                class="text-emerald-500"
                size="24"
              />
            </div>
            <h4 class="text-xl font-bold mb-4">
              Продуктивність в реальному часі
            </h4>
            <p class="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Миттєві обчислення в алгебрі, математичному аналізі та науковій
              нотації.
            </p>
          </div>
          <div>
            <div
              class="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center mb-6 shadow-sm border border-zinc-100 dark:border-zinc-700"
            >
              <Icon name="ph:folders-bold" class="text-emerald-500" size="24" />
            </div>
            <h4 class="text-xl font-bold mb-4">Розумні простори</h4>
            <p class="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Організуйте проекти в ізольовані "Простори" зі збереженою
              історією.
            </p>
          </div>
          <div>
            <div
              class="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center mb-6 shadow-sm border border-zinc-100 dark:border-zinc-700"
            >
              <Icon name="ph:sparkle-bold" class="text-emerald-500" size="24" />
            </div>
            <h4 class="text-xl font-bold mb-4">Інтелект одиниць виміру</h4>
            <p class="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Автоматична конвертація та обробка складних систем одиниць.
            </p>
          </div>
          <div>
            <div
              class="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center mb-6 shadow-sm border border-zinc-100 dark:border-zinc-700"
            >
              <Icon
                name="ph:clock-counter-clockwise-bold"
                class="text-emerald-500"
                size="24"
              />
            </div>
            <h4 class="text-xl font-bold mb-4">Історія обчислень</h4>
            <p class="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Ніколи не втрачайте відкриттів. Кожен вираз індексується і
              доступний для пошуку.
            </p>
          </div>
          <div>
            <div
              class="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center mb-6 shadow-sm border border-zinc-100 dark:border-zinc-700"
            >
              <Icon name="ph:palette-bold" class="text-emerald-500" size="24" />
            </div>
            <h4 class="text-xl font-bold mb-4">Вишукана естетика</h4>
            <p class="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Робочий простір, який відчувається преміальним, не відволікає і
              адаптується.
            </p>
          </div>
          <div>
            <div
              class="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center mb-6 shadow-sm border border-zinc-100 dark:border-zinc-700"
            >
              <Icon
                name="ph:device-mobile-bold"
                class="text-emerald-500"
                size="24"
              />
            </div>
            <h4 class="text-xl font-bold mb-4">Мультиплатформенність</h4>
            <p class="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Повністю адаптивний дизайн, який працює так само добре на
              мобільних пристроях, як і на настільних.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Privacy -->
    <section
      id="privacy"
      class="py-32 bg-zinc-900 text-white px-6 sm:px-12 lg:px-24"
    >
      <div
        class="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center"
      >
        <div class="md:w-1/2">
          <h2 class="text-4xl font-bold mb-8 italic">
            Конфіденційність не <br />обговорюється.
          </h2>
          <p class="text-zinc-400 text-lg leading-relaxed mb-10">
            Ваша інтелектуальна праця залишається вашою. Ми не тренуємо наші
            моделі на ваших даних і не продаємо патерни вашої активності. Те, що
            відбувається у вашому Просторі, залишається у вашому Просторі.
          </p>
          <div class="grid grid-cols-2 gap-8 border-t border-zinc-800 pt-10">
            <div>
              <div class="font-bold text-emerald-500 mb-2">Без відстеження</div>
              <div class="text-sm text-zinc-500 tracking-tight">
                Нуль рекламного трекінгу або інвазивних скриптів аналітики.
              </div>
            </div>
            <div>
              <div class="font-bold text-emerald-500 mb-2">Безпечна хмара</div>
              <div class="text-sm text-zinc-500 tracking-tight">
                Шифрування за промисловими стандартами для всіх збережених
                даних.
              </div>
            </div>
          </div>
        </div>
        <div class="md:w-1/2 flex justify-center">
          <Icon name="ph:shield-check-fill" class="text-zinc-800" size="240" />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-48 px-6 sm:px-12 lg:px-24 text-center">
      <h2 class="text-5xl sm:text-7xl font-bold mb-12 tracking-tight">
        Вирішуйте з метою.
      </h2>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <button
          @click="router.push('/')"
          class="px-12 py-5 rounded-full font-bold text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:scale-[1.05] transition-transform text-lg"
        >
          Розпочати
        </button>
      </div>
    </section>

    <!-- Simple Footer -->
    <footer
      class="py-12 px-6 sm:px-12 lg:px-24 border-t border-zinc-100 dark:border-zinc-900"
    >
      <div
        class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8"
      >
        <div class="font-bold text-zinc-900 dark:text-white text-xl">
          Humanify
        </div>
        <div class="flex gap-10 text-sm font-medium text-zinc-400">
          <NuxtLink to="/" class="hover:text-emerald-500 transition-colors"
            >Головна</NuxtLink
          >

          <NuxtLink to="/about" class="text-emerald-600">Про нас</NuxtLink>
        </div>
        <div class="text-xs text-zinc-400 tracking-widest uppercase">
          Керується логікою. Вдосконалено дизайном. © 2026
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

definePageMeta({
  layout: "blank",
});

useHead({
  title: "Про нас | Humanify",
  meta: [
    {
      name: "description",
      content:
        "Humanify - це математична платформа нового покоління, створена для студентів та професіоналів.",
    },
  ],
});
</script>

<style scoped>
/* Simple subtle fade for the hero */
.animate-in {
  animation-duration: 0.8s;
  animation-fill-mode: both;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-in-from-bottom-4 {
  from {
    transform: translateY(1rem);
  }
  to {
    transform: translateY(0);
  }
}

.fade-in {
  animation-name: fade-in;
}
.slide-in-from-bottom-4 {
  animation-name: slide-in-from-bottom-4;
}
</style>
