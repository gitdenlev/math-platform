// nuxt.config.ts
import tailwindcss from "@tailwindcss/vite";
import type { NuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: "cloudflare-pages",
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/color-mode",
  ],
  ui: {
    global: true, // Обов'язково

    components: {
      button: {
        default: {
          // Якщо ви хочете, щоб UButton без color="" мав primary колір
          // Або якщо ви хочете, щоб при color="primary" використовувався саме 600-й відтінок
          color: "primary", // Використовувати primary колір, визначений в app.config.ts
          variant: "solid", // Варіант solid
          // Перевизначаємо класи, щоб завжди використовувати 600-й відтінок primary
          // (який тепер буде emerald-600, завдяки app.config.ts)
          class:
            "bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-primary-600",
        },
        // Якщо ви хочете, щоб при color="emerald" використовувався 600-й відтінок,
        // а не 500-й (дефолт Nuxt UI для названих кольорів)
        variants: {
          solid: {
            // Перевизначення для конкретного кольору (наприклад, 'emerald')
            // якщо ви хочете використовувати color="emerald"
            emerald:
              "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:outline-emerald-600",
          },
          // Додайте інші варіанти, якщо вони потрібні для primary
          // solid: {
          //   primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-primary-600'
          // }
        },
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
} as NuxtConfig);
