import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AxiosInstance } from 'axios';
import { useNuxtApp } from '#imports';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any | null>(null);
  const token = ref<string | null>(null);
  const loading = ref(false);
  const { $axios } = useNuxtApp();
  const api = $axios as AxiosInstance;

  const setToken = (t: string | null) => {
    token.value = t;
    if (import.meta.client) {
      if (t) window.localStorage.setItem('user_token', t);
      else window.localStorage.removeItem('user_token');
    }
  };

  const login = async (email: string, password: string) => {
    loading.value = true;
    try {
      const res = await api.post('/auth/login', { email, password });
      const t = res.data?.token ?? res.data?.access_token ?? null;
      if (t) setToken(t);
      await fetchProfile();
      return true;
    } catch (err) {
      console.error('Login error', err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const register = async (payload: Record<string, any>) => {
    loading.value = true;
    try {
      const res = await api.post('/auth/register', payload);
      const t = res.data?.token ?? res.data?.access_token ?? null;
      if (t) setToken(t);
      await fetchProfile();
      return true;
    } catch (err) {
      console.error('Register error', err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const fetchProfile = async () => {
    loading.value = true;
    try {
      const res = await api.get('/auth/me');
      user.value = res.data?.user ?? res.data ?? null;
      return user.value;
    } catch (err) {
      console.warn('Fetch profile failed', err);
      user.value = null;
      return null;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    setToken(null);
    user.value = null;
  };

  // Initialize token from localStorage on client
  if (import.meta.client) {
    const t = window.localStorage.getItem('user_token');
    if (t) token.value = t;
  }

  return { user, token, loading, login, register, fetchProfile, logout };
});
