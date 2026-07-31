import { defineStore } from "pinia";
import { ref } from "vue";
import type { AxiosInstance } from "axios";
import { useNuxtApp } from "#imports";
import type { testimonialsType } from "~/types/types";

export const useTestimonialstore = defineStore("Testimonials", () => {
  const Testimonials = ref<testimonialsType[]>([]);
  const loading = ref(false);
  const { $axios } = useNuxtApp();
  const api = $axios as AxiosInstance;
  const toast = useToastStore();

  const fetchTestimonials = async () => {
    try {
      loading.value = true;
      const response = await api.get("/testimonials");
      const items: testimonialsType[] = Array.isArray(response.data)
        ? response.data
        : (response.data?.Testimonials ?? []);
      Testimonials.value = items.filter(
        (item: any) => item.is_published === true,
      );
    } catch (error) {
      console.error("Error fetching Testimonials", error);
      Testimonials.value = [];
    } finally {
      loading.value = false;
    }
  };

  const createTestimonials = async (newProduct: testimonialsType) => {
    try {
      loading.value = true;
      const response = await api.post("/testimonials", newProduct);
      Testimonials.value = [
        ...Testimonials.value,
        response.data as testimonialsType,
      ];
      toast.show(
        "Opération réussie",
        "success",
        "Votre temoignage a été envoyé avec succès.",
      );
    } catch (error) {
      console.error("Error creating product", error);
    } finally {
      loading.value = false;
    }
  };

  return { fetchTestimonials, Testimonials, loading, createTestimonials };
});
