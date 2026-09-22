import { defineNuxtRouteMiddleware, navigateTo } from '#imports';
import { useAuthStore } from '~/stores/authStore';

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const connected = authStore.isAuthenticated;

  const protectedPaths = ['/admin', '/dashboard'];
  const isProtected = protectedPaths.some((path)=> to.path.startsWith(path))
  if (!isProtected) return;
  if (!connected) {
    return navigateTo('/');
  }
});