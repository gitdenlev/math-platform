<template>
  <CommonGridBackground inner-class="flex items-center justify-center p-4">
    <div
      class="w-full max-w-[420px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden"
    >
      <div class="px-8 py-10">
        <!-- Logo -->
        <div class="flex flex-col items-center gap-4 mb-8">
          <div
            class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-400/20"
          >
            <Icon name="ph:plant-fill" class="w-7 h-7 text-white" />
          </div>
          <div class="text-center">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {{ isLogin ? "Welcome Back" : "Join Humanify" }}
            </h1>
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              {{
                isLogin
                  ? "Enter your credentials to access your account"
                  : "Start your journey with us today"
              }}
            </p>
          </div>
        </div>

        <!-- Google Button -->
        <button
          class="w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-200 py-2.5 px-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-3 mb-6 transition-all duration-200 group hover:border-emerald-200 dark:hover:border-emerald-500/50"
        >
          <Icon
            name="material-icon-theme:google"
            class="w-5 h-5 transition-transform group-hover:scale-110"
          />
          <span class="font-medium text-sm">Continue with Google</span>
        </button>

        <div class="relative mb-6">
          <div class="absolute inset-0 flex items-center">
            <div
              class="w-full border-t border-gray-200 dark:border-gray-800"
            ></div>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span
              class="px-4 bg-white/0 dark:bg-gray-900/0 backdrop-blur-xl text-gray-400 font-medium bg-white dark:bg-gray-900"
              >Or continue with</span
            >
          </div>
        </div>

        <form @submit.prevent class="space-y-4">
          <!-- Email Input -->
          <div>
            <label
              class="block text-gray-700 dark:text-gray-300 text-xs font-semibold mb-1.5 ml-1"
              >Email Address</label
            >
            <input
              v-model="form.email"
              type="email"
              placeholder="name@example.com"
              class="w-full bg-gray-50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
            />
          </div>

          <!-- Password Input -->
          <div>
            <label
              class="block text-gray-700 dark:text-gray-300 text-xs font-semibold mb-1.5 ml-1"
              >Password</label
            >
            <input
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              class="w-full bg-gray-50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
            />
          </div>

          <!-- Confirm Password (Sign Up only) -->
          <div
            v-if="!isLogin"
            class="animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <label
              class="block text-gray-700 dark:text-gray-300 text-xs font-semibold mb-1.5 ml-1"
              >Confirm Password</label
            >
            <input
              v-model="form.confirmPassword"
              type="password"
              placeholder="••••••••"
              class="w-full bg-gray-50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
            />
          </div>

          <!-- Remember & Forgot -->
          <div v-if="isLogin" class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                class="w-3.5 h-3.5 rounded border-gray-300 dark:border-gray-700 bg-transparent text-emerald-600 focus:ring-emerald-600 focus:ring-offset-0 cursor-pointer"
              />
              <span
                class="text-gray-500 dark:text-gray-400 text-xs group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors"
                >Remember me</span
              >
            </label>
            <a
              href="#"
              class="text-emerald-600 dark:text-emerald-500 text-xs hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors font-medium"
            >
              Forgot password?
            </a>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 dark:shadow-emerald-900/20 transform active:scale-[0.98] transition-all duration-200 mt-2"
          >
            {{ isLogin ? "Sign In" : "Create Account" }}
          </button>
        </form>

        <!-- Toggle Mode -->
        <p class="text-gray-500 dark:text-gray-400 text-center text-sm mt-6">
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          <button
            @click="toggleMode"
            class="text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold ml-1 transition-colors hover:underline"
          >
            {{ isLogin ? "Sign up" : "Log in" }}
          </button>
        </p>
      </div>

      <!-- Footer Note inside card or removed for cleaner look? Keeping it minimal. -->
    </div>

    <!-- Footer Copyright outside -->
    <div class="fixed bottom-6 text-center w-full z-10 pointer-events-none">
      <p class="text-gray-400 dark:text-gray-600 text-xs">
        © Humanify All rights reserved.
      </p>
    </div>
  </CommonGridBackground>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

useHead({
  title: "Login - Humanify",
  meta: [
    {
      name: "description",
      content: "Login to your Humanify account",
    },
  ],
});

const isLogin = ref(true);

const form = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});

const toggleMode = () => {
  isLogin.value = !isLogin.value;
};
</script>

<style scoped>
/* Ensure smooth transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
