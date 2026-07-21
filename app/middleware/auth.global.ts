import { defineNuxtRouteMiddleware, navigateTo } from '#imports';
import { useAuthStore } from '~/stores/authStore';

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();
  const protectedPaths = [''];
  if (!protectedPaths.some((path) => to.path.startsWith(path))) return;

  if (!auth.token) {
    return navigateTo('/login');
  }
});
