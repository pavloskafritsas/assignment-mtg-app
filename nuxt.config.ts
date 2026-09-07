// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: false,
  css: ['assignment-mtg-ui/dist/assignment-mtg-ui.css'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      simulateApiErrors: false,
    },
  },
  vite: {
    server: {
      fs: {
        allow: ['../assignment-mtg-ui'],
      },
    },
  },
})
