import { useAuth } from "#imports";
const isProtectedRoute = createRouteMatcher(['/events', '/calendar'])

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return  // Avoid SSR errors

  const { userId } = useAuth()

  if (!userId.value && isProtectedRoute(to)) {
    return navigateTo(`/sign-in?redirect_url=${encodeURIComponent(to.fullPath)}`)
  }
})
