import { defineStore } from "pinia";
import { ref } from "vue";
import type { AxiosInstance } from "axios";
import { useNuxtApp } from "#imports";
import type { servicesType } from "~/types/types";

export const useServiceStore = defineStore("services", () => {
  const services = ref<servicesType[]>([]);
  const loading = ref(false);
  const { $axios } = useNuxtApp();
  const api = $axios as AxiosInstance;
  const toast = useToastStore();

  const fetchServices = async () => {
    try {
      loading.value = true;
      const response = await api.get("/services");
      const items: servicesType[] = Array.isArray(response.data)
        ? response.data
        : (response.data?.services ?? []);
      services.value = items.filter((item)=> item.is_active === true) ;
    } catch (error) {
      services.value = [];
    } finally {
      loading.value = false;
    }
  };

  const createServices = async (newService: servicesType) => {
    try {
      loading.value = true;
      const response = await api.post("/services", newService);
      const created = response.data ?? response;
      services.value = [...services.value, created as servicesType];
      toast.show(
        "Opération réussie",
        "success",
        "Le service "+newService.title+" a été créé avec succès.",
      );
    } catch (error) {
      toast.show(
        "Opération échouée",
        "danger",
        "Erreur lors de la création du service "+newService.title,
      )
    } finally {
      loading.value = false;
    }
  };

  const updateServices = async (id: string, data:any) => {
    try {
      loading.value = true;
      const response = await api({
        method: "PATCH",
        url: `/services/${id}`,
        data:data,
      });
      const updated = response.data ?? response;
      const idx = services.value.findIndex(s => String((s as any).id) === String(id));
      if (idx !== -1) services.value[idx] = updated as servicesType;

      toast.show(
        "Opération réussie",
        "success",
        "Le service "+updated.title+" a été modifié avec succès.",
      );
    } catch (error) {
      toast.show(
        "Opération échouée",
        "danger",
        "Erreur lors de la modification de ce service",
      )
    }
  };

  return { fetchServices, services, loading, createServices, updateServices };
});
