import { defineStore } from "pinia";
import { ref } from "vue";
import type { AxiosInstance } from "axios";
import { useNuxtApp } from "#imports";
import type { servicesType } from "~/types/types";

export const useservicestore = defineStore("services", () => {
  const services = ref<servicesType[]>([]);
  const loading = ref(false);
  const { $axios } = useNuxtApp();
  const api = $axios as AxiosInstance;

  const fetchservices = async () => {
    try {
      loading.value = true;
      const response = await api.get("/api/mock/services");
      const items = Array.isArray(response.data)
        ? response.data
        : (response.data?.services ?? []);

      services.value = items as servicesType[];
    } catch (error) {
      console.error("Error fetching services", error);
      services.value = [];
    } finally {
      loading.value = false;
    }
  };

  const createServices = async (newProduct: servicesType) => {
    try {
      loading.value = true;
      const response = await api.post("/api/mock/services", newProduct);
      const created = response.data ?? response;
      services.value = [...services.value, created as servicesType];
    } catch (error) {
      console.error("Error creating product", error);
    } finally {
      loading.value = false;
    }
  };

  const updateServices = async (id: string, data:any) => {
    try {
      loading.value = true;
      const response = await api({
        method: "PATCH",
        url: `/api/mock/services/${id}`,
        data:data,
      });

      const updated = response.data ?? response;
      const idx = services.value.findIndex(s => String((s as any).id) === String(id));
      if (idx !== -1) services.value[idx] = updated as servicesType;

      // const response = await api.patch(`/services/${id}`, is_active:)
    } catch (error) {}
  };

  return { fetchservices, services, loading, createServices, updateServices };
});
