import axios from 'axios';
import { defineNuxtPlugin, useRuntimeConfig } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
  // const runtimeConfig = useRuntimeConfig();
  
  const api = axios.create({
    // baseURL: 'https://suna-bay.vercel.app/api/v1',
    baseURL: 'http://localhost:5000/',
    timeout: 10000, // Shorter 1s timeout prevents long freezing when server is offline
    // headers: { 'Content-Type': 'application/json' },
    // withCredentials: true
  });

  // api.interceptors.request.use((config: any) => {
  //   if (import.meta.client) {
  //     const token = window.localStorage.getItem('user_token');
  //     if (token) {
  //       config.headers.Authorization = `Bearer ${token}`;
  //     }
  //   }
  //   return config;
  // });

  // api.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  nuxtApp.provide('axios', api);
});
