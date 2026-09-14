import { defineNuxtRouteMiddleware, navigateTo } from '#imports';
import { useAuthStore } from '~/stores/authStore';

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();
  const token = useCookie('auth_token')
  const protectedPaths = ['admin', 'dashboard'];
  const isProtected = protectedPaths.some((path)=> to.path.startsWith(path))
  // if (!isProtected) return;
  // if (!token.value) {
  //   return navigateTo('/');
  // }
});