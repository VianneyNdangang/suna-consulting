import { defineStore } from "pinia";
import { ref } from "vue";
import type { AxiosInstance } from "axios";
import { useNuxtApp } from "#imports";
import type { faqType } from "~/types/types";

export const usefaqtore = defineStore("faq", () => {
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
      console.error("Error fetching faq", error);
      faq.value = [];
    } finally {
      loading.value = false;
    }
  };

  const createfaq = async (newProduct: faqType) => {
    try {
      loading.value = true;
      const response = await api.post("/faq", newProduct);
      faq.value = [...faq.value, response.data as faqType];
    } catch (error) {
      console.error("Error creating product", error);
    } finally {
      loading.value = false;
    }
  };

  const updatefaq = async (id: string, data:any) => {
    try {
      loading.value = true;
      const response = api({
        method: "PATCH",
        url: `users/${id}/faq`,
        data:data,
      });

      // const response = await api.patch(`/faq/${id}`, is_active:)
    } catch (error) {}
  };

  return { fetchfaq, faq, loading, createfaq, updatefaq };
});
