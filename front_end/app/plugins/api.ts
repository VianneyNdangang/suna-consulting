import axios from 'axios';
import { defineNuxtPlugin, useRuntimeConfig } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  
  const api = axios.create({
    baseURL: runtimeConfig.public.apiUrl || 'http://localhost:4000/',
    timeout: 2500, // Shorter 2.5s timeout prevents long freezing when server is offline
    headers: { 'Content-Type': 'application/json' },
  });

  api.interceptors.request.use((config: any) => {
    if (import.meta.client) {
      const token = window.localStorage.getItem('user_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Quietly reject so stores can gracefully fallback without breaking page hydration
      return Promise.reject(error);
    }
  );

  nuxtApp.provide('axios', api);
});
