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
      const response = await api.get("/services");
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
      const response = await api.post("/services", newProduct);
      services.value = [...services.value, response.data as servicesType];
    } catch (error) {
      console.error("Error creating product", error);
    } finally {
      loading.value = false;
    }
  };

  const updateServices = async (id: string, data:any) => {
    try {
      loading.value = true;
      const response = api({
        method: "PATCH",
        url: `users/${id}/services`,
        data:data,
      });

      // const response = await api.patch(`/services/${id}`, is_active:)
    } catch (error) {}
  };

  return { fetchservices, services, loading, createServices, updateServices };
});
