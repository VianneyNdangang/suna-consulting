import { defineStore } from "pinia";
import { ref } from "vue";
import type { AxiosInstance } from "axios";
import { useNuxtApp } from "#imports";

export const useServiceStore = defineStore("services", () => {
  const Url = `/admin/service`;
  const loading = ref(false)
  const getApi = ()=>{
    const { $axios } = useNuxtApp();
  return $axios as AxiosInstance;
  }
  const services = ref<any[]>([])

  const fetchServices = async () => {
    loading.value = true
    const api = getApi()
    try {
      const res = await api.get(Url)
      const payload = res.data?.data ?? res.data
      services.value = Array.isArray(payload) ? payload : []
    } catch (error) {
      console.error(error)
    }finally{loading.value = false}
  };

  const createServices = async (data: any, id?: string) => {
    const api = getApi()
    await api({
      method: id ? "PATCH" : "POST",
      url: id ? `${Url}/${id}` : Url,
      data: data,
    });
  };

  return { fetchServices, services, loading, createServices };
},
{
  persist: true
}
);
