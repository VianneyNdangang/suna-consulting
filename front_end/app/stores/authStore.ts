import { defineStore } from "pinia";
import { ref } from "vue";
import type { AxiosInstance } from "axios";
import { useNuxtApp } from "#imports";
import axios from "axios";
import { user_token } from "~/helpers/constant";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<any | null>(null);
  const token = ref<string | null>(null);
  const loading = ref(false);
  const message = ref('')
  const { $axios } = useNuxtApp();
  const api = $axios as AxiosInstance;

  const setToken = (t: string | null) => {
    token.value = t;
    if (import.meta.client) {
      if (t) window.localStorage.setItem(user_token, t);
      else window.localStorage.removeItem(user_token);
    }
  };

  const login = async (items: any) => {
    loading.value = true;
    try {
      const res = await api.post("/auth/signin", items);
      message.value = res.data.message
      await fetchProfile();
      return res.data.success;
    } catch (err) {
      console.error("Login error", err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const register = async (payload: Record<string, any>) => {
    const formData = new FormData();

    formData.append("full_name", payload.full_name);
    formData.append("email", payload.email);
    formData.append("phone", payload.phone);
    formData.append("country", payload.country);
    formData.append("password", payload.password);
    formData.append("city", payload.city);

    if (payload.avatar) {
      formData.append("avatar", payload.avatar);
    }
    try {

      const res = await api.post("/auth/signup", formData);
      const role = res.data?.user?.role
      message.value = res.data.message
      await fetchProfile();
      if(res.data.success){
        if(role === 'CLIENT'){
          navigateTo(`/dashboard`)
        }else{
          navigateTo(`/admin`)
        }
      }
      return res.data.success;
    } catch (err) {
      console.error("Register error", err);
      return false;
    } finally {
    }
  };

  const fetchProfile = async () => {
      const res = await api.get("/auth/me");
      user.value = res.data?.user ?? res.data ?? null;
      return user.value;
  };

  const logout = async() => {
    const res = await api.post(`auth/signout`)
    message.value = res.data.message
  };

  // Initialize token from localStorage on client
  if (import.meta.client) {
    const t = window.localStorage.getItem("user_token");
    if (t) token.value = t;
  }

  return { user, token, loading, login, register, fetchProfile, message, logout };
});
