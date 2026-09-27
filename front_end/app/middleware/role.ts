export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  const requiredRole = to.meta.role as string | undefined

  if (!requiredRole) {
    return
  }

  if (authStore.user?.role !== requiredRole) {
    return navigateTo('/403')
  }
})