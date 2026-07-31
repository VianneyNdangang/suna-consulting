import { defineStore } from "pinia";
import { ref } from "vue";
import type { AxiosInstance } from "axios";
import { useNuxtApp } from "#imports";
import type { site_contentType } from "~/types/types";

export const usesite_contentStore = defineStore("site_content", () => {
  const site_content = ref<site_contentType>();
  const loading = ref(false);
  const { $axios } = useNuxtApp();
  const api = $axios as AxiosInstance;
  const toast = useToastStore();

  const fetchsite_content = async () => {
    try {
      loading.value = true;
      const response = await api.get("/site-content");
      const items = Array.isArray(response.data)
        ? response.data
        : (response.data ?? {});

      site_content.value = items as site_contentType;
    } catch (error) {
    } finally {
      loading.value = false;
    }
  };

  const updatesite_content = async (id: string, data: any) => {
    try {
      loading.value = true;
      const response = api({
        method: "PATCH",
        url: `site-content/${id}`,
        data: data,
      });
      toast.show(
        "Operation réussie",
        "success",
        "Le contenu de votre site a été mis a jour"
      )
    } catch (error) {
    } finally {
      loading.value = false;
    }
  };

  return { fetchsite_content, site_content, loading, updatesite_content };
});
