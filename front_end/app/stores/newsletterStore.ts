import { defineStore } from "pinia";
import { ref } from "vue";
import type { AxiosInstance } from "axios";
import { useNuxtApp } from "#imports";
import type { newsletterType } from "~/types/types";

export const usenewslettertore = defineStore("newsletter", () => {
  const newsletter = ref<newsletterType[]>([]);
  const loading = ref(false);
  const { $axios } = useNuxtApp();
  const api = $axios as AxiosInstance;

  const fetchnewsletter = async () => {
    try {
      loading.value = true;
      const response = await api.get("/newsletter");
      const items = Array.isArray(response.data)
        ? response.data
        : (response.data?.newsletter ?? []);

      newsletter.value = items as newsletterType[];
    } catch (error) {
      newsletter.value = [];
      
    } finally {
      loading.value = false;
    }
  };

  const createnewsletter = async (newProduct: newsletterType) => {
    try {
      loading.value = true;
      const response = await api.post("/newsletter", newProduct);
      newsletter.value = [...newsletter.value, response.data as newsletterType];
     
    } catch (error) {
      
    } finally {
      loading.value = false;
    }
  };

  // const response = await api.patch(`/newsletter/${id}`, is_active:)

  return { fetchnewsletter, newsletter, loading, createnewsletter };
});
