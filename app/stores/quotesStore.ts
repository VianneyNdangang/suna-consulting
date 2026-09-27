import { defineStore } from "pinia";
import { ref } from "vue";
import type { AxiosInstance } from "axios";
import { useNuxtApp } from "#imports";
import type { quotesType } from "~/types/types";
import useFetchData from "~/hooks/request";

export const usequotestore = defineStore("quotes", () => {
  const Url = `/quotes`;
  // const page = ref(1);
  // const limit = ref(20);
  // const filters = ref(null);
  // const { data, fetchData, loading, pagination } = useFetchData({
  //   url: Url,
  //   page,
  //   limit,
  //   filters,
  // });
  // const quotes = computed(()=>data)
  // const fetchquotes = async(newPage?:number, newFilters:any)=>{
  //   if(newPage){
  //     page.value = newPage
  //   }if(newFilters){
  //     filters.value = newFilters
  //   }
  //   fetchData()
  // }

  const quotes = ref<quotesType[]>([]);
  const loading = ref(false);
  const { $axios } = useNuxtApp();
  const api = $axios as AxiosInstance;

  const fetchquotes = async () => {
    try {
      loading.value = true;
      const response = await api.get(Url);
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

  const createquotes = async (newQuote: any) => {
    loading.value = true;
    const response = await api.post(Url, newQuote);
    const created = response.data ?? response;
    fetchquotes();
    return response.data;
  };

  const updatequotes = async (id: string, data: any) => {
    try {
      const response = await api({
        method: "PATCH",
        url: `${Url}/${id}`,
        data: data,
      });

      const updated = response.data ?? response;
      const idx = quotes.value.findIndex(
        (q) => String((q as any).id) === String(id),
      );
      if (idx !== -1) quotes.value[idx] = updated as quotesType;

      // const response = await api.patch(`/quotes/${id}`, is_active:)
    } catch (error) {}
  };

  return { 
    fetchquotes, 
    quotes, 
    loading, 
    createquotes, 
    updatequotes,
    // pagination,
   };
});
