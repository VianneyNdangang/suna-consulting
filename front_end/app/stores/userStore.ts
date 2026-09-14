import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AxiosInstance } from 'axios';
import { useNuxtApp } from '#imports';
import useFetchData from '~/hooks/request';

export const useUserStore = defineStore('users', () => {
  const Url = `/users`
  const page = ref(1)
  const limit = ref(20)
  const {fetchData, pagination, data, loading} = useFetchData(
    {
      url: Url,
      page,
      limit,
    }
  )
  const users = computed(()=>data.value);

  const { $axios } = useNuxtApp();
  const api = $axios as AxiosInstance;

  const fetchUsers = async (newPage?: number) => {
      if (newPage) {
        page.value = newPage;
      }
      await fetchData();
    };

  const createUser = async (payload: any, id?: string) => {
    await api.post(Url, payload);
    fetchUsers()
  };

  const updateUser = async (id: string, payload: any) => {
      await api.patch(`${Url}/${id}`, payload);
      fetchUsers()
  };

  return { users, loading, fetchUsers, createUser, updateUser, pagination };
});
