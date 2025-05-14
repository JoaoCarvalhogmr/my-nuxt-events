export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/icon', '@pinia/nuxt', '@clerk/nuxt'],
  clerk: {
    skipServerMiddleware: true,
    signInUrl: process.env.NUXT_CLERK_SIGN_IN_URL,
    signUpUrl: process.env.NUXT_CLERK_SIGN_UP_URL,
    signInFallbackRedirectUrl: process.env.NUXT_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL,
    signUpFallbackRedirectUrl: process.env.NUXT_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL,
  },
  css: ['~/assets/css/main.css'],
  icon: {
    mode: 'css',
    cssLayer: 'base',
  }
})


