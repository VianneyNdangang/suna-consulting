import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { defineNuxtPlugin, useRuntimeConfig } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const api = axios.create({
    baseURL: runtimeConfig.public.apiUrl ?? '',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (import.meta.client) {
      const token = window.localStorage.getItem('user_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  });

  nuxtApp.provide('axios', api);
});
