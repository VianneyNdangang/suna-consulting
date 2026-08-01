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
  const toast = useToastStore();

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
    try {
      loading.value = true;
      const response = await api.post("/faq", newFaq);
      faq.value = [...faq.value, response.data as faqType];
      toast.show(
        "Opération réussie",
        "success",
        "Enregistrement effectué avec succes",
      );
    } catch (error) {
      toast.show(
        "Opération échoué",
        "danger",
        "Une erreur est survenue lors de l'enregistrement",
      );
    } finally {
      loading.value = false;
    }
  };

  const updatefaq = async (id: string, data: any) => {
    try {
      loading.value = true;
      const response = api({
        method: "PATCH",
        url: `users/${id}/faq`,
        data: data,
      });
      toast.show(
        "Opération réussie",
        "success",
        "Modification efectuée avec succes",
      );
    } catch (error) {
      toast.show(
        "Opération échoué",
        "danger",
        "Une erreur est survenue lors de la modification",
      );
    }
  };

  return { fetchfaq, faq, loading, createfaq, updatefaq };
});
