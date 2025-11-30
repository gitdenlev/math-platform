<template>
  <div
    class="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white dark:bg-gray-950 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:20px_20px] p-8 gap-12 transition-colors"
  >
    <!-- Theme Toggle -->
    <button
      @click="toggleTheme"
      class="fixed top-6 right-6 flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-500 transition-all text-gray-600 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 shadow-lg hover:shadow-xl z-50"
      :title="
        colorMode.value === 'dark'
          ? 'Switch to Light Mode'
          : 'Switch to Dark Mode'
      "
    >
      <Icon
        :name="colorMode.value === 'dark' ? 'ph:sun-bold' : 'ph:moon-bold'"
        size="20"
      />
    </button>

    <!-- Image -->
    <div>
      <NuxtImg
        loading="lazy"
        src="/not-found-page-humanify.svg"
        alt="Креативна команда Humanify працює над вирішенням проблем, символізуючи пошук рішення на сторінці 404."
        width="500"
        class="drop-shadow-2xl"
      />
    </div>

    <!-- Content -->
    <div class="text-center md:text-left max-w-md space-y-6">
      <!-- Error Code with Gradient -->
      <div class="relative">
        <h1
          class="text-7xl md:text-8xl font-bold bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 bg-clip-text text-transparent"
        >
          {{ error.statusCode }}
        </h1>
      </div>

      <!-- Error Message -->
      <div class="space-y-3">
        <h2
          class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
        >
          {{ getErrorTitle(error.statusCode) }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          {{ getErrorMessage(error.statusCode) }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-3 pt-4">
        <NuxtLink
          to="/"
          class="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
        >
          <Icon name="ph:house-bold" size="20" />
          <span>Go to Homepage</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object,
});

const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const getErrorTitle = (code: number) => {
  const titles: Record<number, string> = {
    404: "Page Not Found",
    500: "Server Error",
    403: "Access Forbidden",
    401: "Unauthorized",
  };
  return titles[code] || "Oops! Something went wrong";
};

const getErrorMessage = (code: number) => {
  const messages: Record<number, string> = {
    404: "The page you are looking for doesn't exist or has been moved.",
    500: "We're experiencing some technical difficulties. Please try again later.",
    403: "You don't have permission to access this page.",
    401: "You need to be logged in to access this page.",
  };
  return (
    messages[code] ||
    "An unexpected error occurred. Please try again or contact support."
  );
};
</script>
