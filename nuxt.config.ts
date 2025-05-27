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
    "nuxt-vuefire",
  ],

  vuefire: {
    config: {
      apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
    analytics: true,
  },

  app: {
    head: {
      title: "Humanify - Програмуй Математично",
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/logo.svg",
        }
      ]
    },
  },

  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId:
        process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
  },

  ui: {
    global: true,
    components: {
      button: {
        default: {
          color: "primary",
          variant: "solid",
          class:
            "bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-primary-600",
        },
        variants: {
          solid: {
            emerald:
              "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:outline-emerald-600",
          },
        },
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
} as NuxtConfig);
