import { defineStore } from "pinia";
import { ref } from "vue";
import type { AxiosInstance } from "axios";
import { useNuxtApp } from "#imports";
import type { faqType } from "~/types/types";

export const useFaqStore = defineStore("faq", () => {
  const faq = ref<faqType[]>([]);
  const loading = ref(false);
  const { $axios } = useNuxtApp();
  const api = $axios as AxiosInstance;

  const fetchfaq = async () => {
    try {
      loading.value = true;
      const response = await api.get("/faq");
      const items = Array.isArray(response.data)
        ? response.data
        : (response.data?.faq ?? []);
      faq.value = items as faqType[];
    } catch (error) {
    } finally {
      loading.value = false;
    }
  };

  const createfaq = async (newFaq: faqType) => {
      const response = await api.post("/faq", newFaq);
    return response.data
  };

  const updatefaq = async (id: string, data: any) => {
      const response = api({
        method: "PATCH",
        url: `users/${id}/faq`,
        data: data,
      });
  };

  return { fetchfaq, faq, loading, createfaq, updatefaq };
});
