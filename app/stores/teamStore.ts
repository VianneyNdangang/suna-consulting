import { defineStore } from "pinia";
import { ref } from "vue";
import type { AxiosInstance } from "axios";
import { useNuxtApp } from "#imports";
import type { teamType } from "~/types/types";

export const useTeamtore = defineStore("Team", () => {
  const Team = ref<teamType[]>([]);
  const loading = ref(false);
  const { $axios } = useNuxtApp();
  const api = $axios as AxiosInstance;
  const toast = useToastStore();

  const fetchTeam = async () => {
    try {
      loading.value = true;
      const response = await api.get("/team");
      const items = Array.isArray(response.data)
        ? response.data
        : (response.data?.Team ?? []);

      Team.value = items as teamType[];
    } catch (error) {
      console.error("Error fetching Team", error);
      Team.value = [];
    } finally {
      loading.value = false;
    }
  };

  const createTeam = async (newTeamMember: teamType) => {
    try {
      loading.value = true;
      const response = await api.post("/team", newTeamMember);
      Team.value = [...Team.value, response.data as teamType];
      toast.show(
        "Operation réussie",
        "success",
        (newTeamMember.name =
          " a été ajouter dans votre équipe en comme " + newTeamMember.role),
      );
    } catch (error) {
      toast.show(
        "Operation échouée",
        "danger",
        "Votre requette n'a pas été soumise",
      );
    } finally {
      loading.value = false;
    }
  };

  const updateTeam = async (id: string, data: any) => {
    try {
      loading.value = true;
      const response = api({
        method: "PATCH",
        url: `team/${id}`,
        data: data,
      });
      toast.show(
        "Operation réussie",
        "success",
        "Votre requette a bien été soumise",
      );
    } catch (error) {
      toast.show(
        "Operation échouée",
        "danger",
        "Votre requette n'a pas été soumise",
      );
    }
  };

  return { fetchTeam, Team, loading, createTeam, updateTeam };
});
