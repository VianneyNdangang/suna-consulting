import { defineStore } from "pinia";
import { ref } from "vue";
import type { AxiosInstance } from "axios";
import { useNuxtApp } from "#imports";
import type { quotesType } from "~/types/types";

export const usequotestore = defineStore("quotes", () => {
  const quotes = ref<quotesType[]>([]);
  const loading = ref(false);
  const { $axios } = useNuxtApp();
  const api = $axios as AxiosInstance;
  const toast = useToastStore()

  const fetchquotes = async () => {
    try {
      loading.value = true;
      const response = await api.get("/quotes");
      const items = Array.isArray(response.data)
        ? response.data
        : (response.data?.quotes ?? []);

      quotes.value = items as quotesType[];
    } catch (error) {
      quotes.value = [];
    } finally {
      loading.value = false;
    }
  };

  const createquotes = async (newProduct: quotesType) => {
    try {
      loading.value = true;
      const response = await api.post("/quotes", newProduct);
      const created = response.data ?? response;
      quotes.value = [...quotes.value, created as quotesType];
      toast.show(
        "Operation réussie",
        "success",
        "Votre requette a bien été soumise"
      )
    } catch (error) {
      toast.show(
        "Operation échouée",
        "danger",
        "Erreur lors de la soumission de votre requette"
      )
    } finally {
      loading.value = false;
    }
  };

  const updatequotes = async (id: string, data:any) => {
    try {
      loading.value = true;
      const response = await api({
        method: "PATCH",
        url: `quotes/${id}`,
        data:data,
      });

      const updated = response.data ?? response;
      const idx = quotes.value.findIndex(q => String((q as any).id) === String(id));
      if (idx !== -1) quotes.value[idx] = updated as quotesType;

      // const response = await api.patch(`/quotes/${id}`, is_active:)
    } catch (error) {}
  };

  return { fetchquotes, quotes, loading, createquotes, updatequotes };
});
