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
  const toast = ();

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
      const response = await api.post("/team", newTeamMember);
  };

  const updateTeam = async (id: string, data: any) => {
   api({
        method: "PATCH",
        url: `team/${id}`,
        data: data,
      });
     
  };

  return { fetchTeam, Team, loading, createTeam, updateTeam };
});
