import { defineStore } from "pinia";
import { ref } from "vue";
import type { AxiosInstance } from "axios";
import { useNuxtApp } from "#imports";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref<any | null>(null);
    const token = ref<string | null>(null);
    const loading = ref(false);
    const message = ref("");
    const { $axios } = useNuxtApp();
    const api = $axios as AxiosInstance;

    const isAuthenticated = computed(() => !!user.value);

    const login = async (items: any) => {
      loading.value = true;
      try {
        const res = await api.post("/auth/signin", items);
        message.value = res.data.message;
        user.value = res.data?.user ?? res.data ?? null;
        const role = user.value?.role;
        if (res.data.success) {
          if (role === "CLIENT") {
            await navigateTo(`/dashboard`);
          } else {
            await navigateTo(`/admin`);
          }
        }
      } catch (err) {
        console.error("Login error", err);
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
        const res = await api.post("/auth/signup", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        user.value = res.data?.user ?? res.data ?? null;
        const role =user.value?.role;
        message.value = res.data.message;
        if (res.data.success) {
          if (role === "CLIENT") {
            await navigateTo(`/dashboard`);
          } else {
            await navigateTo(`/admin`);
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
      try {
        const res = await api.get("/user");
        user.value = res.data?.user ?? res.data ?? null;
        return user.value;
      } catch (error: any) {
        if (error.response?.status === 401) {
          user.value = null;
        }
        return null;
      }
    };

    const logout = async () => {
      const res = await api.post(`auth/signout`);
      user.value = null;
      message.value = res.data.message;
      await navigateTo("/");
    };

    return {
      isAuthenticated,
      user,
      token,
      loading,
      login,
      register,
      fetchProfile,
      message,
      logout,
    };
  },
  {
    persist: {
      pick: ["user"],
    },
  },
);
