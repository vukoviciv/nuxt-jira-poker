export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', 'nuxt-auth-utils', '@nuxt/ui'],
  css: ['@/assets/css/main.css'],
  runtimeConfig: {
    oauth: {
      atlassian: {
        clientId: '',
        clientSecret: '',
        redirectURL: '',
      },
    },
  },
});
