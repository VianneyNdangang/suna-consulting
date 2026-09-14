import { defineStore } from "pinia";
import { ref } from "vue";
import type { AxiosInstance } from "axios";
import { useNuxtApp } from "#imports";
import type { testimonialsType } from "~/types/types";
import useFetchData from "~/hooks/request";

export const useTestimonialstore = defineStore("Testimonials", () => {
  const { $axios } = useNuxtApp();
  const api = $axios as AxiosInstance;
  const Url = `/testimonials`;
  // const page = ref(1);
  // const limit = ref(20);
  // const filters = ref()
  // const { data, fetchData, loading, pagination} = useFetchData({
  //   url: Url,
  //   page,
  //   limit,
  //   filters,
  // })

  // const testimonials = computed(()=>data.value)
  // const fetchTestimonials = async (newPage?: number) => {
  //   if(newPage){
  //     page.value = newPage
  //   }
  //   fetchData()
  // };

  const testimonials = ref<testimonialsType[]>([]);
  const loading = ref(false);
  const fetchTestimonials = async () => {
    loading.value = true;
    try {
      const response = await api.get(Url);
      testimonials.value = response.data;
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      loading.value = false;
    }
  };
  const createTestimonials = async (newProduct: any) => {
    await api.post(Url, newProduct);
  };

  const updateTestominials = async (id: string, items: any) => {
    await api.patch(`${Url}/${id}`, items);
  };
  return {
    fetchTestimonials,
    testimonials,
    loading,
    createTestimonials,
    updateTestominials,
    // pagination,
  };
});
