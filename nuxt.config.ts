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
  },
  app: {
    head: {
      title: 'MyNuxtEvents',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Create and manage your events with MyNuxtEvents - A modern event management platform' },
        { name: 'theme-color', content: '#0E172B' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})


