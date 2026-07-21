import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AxiosInstance } from 'axios';
import { useNuxtApp } from '#imports';

export const useUserStore = defineStore('users', () => {
  const users = ref<any[]>([]);
  const loading = ref(false);
  const { $axios } = useNuxtApp();
  const api = $axios as AxiosInstance;

  const fetchUsers = async () => {
    loading.value = true;
    try {
      const res = await api.get('/api/mock/users');
      users.value = Array.isArray(res.data) ? res.data : res.data?.users ?? [];
    } catch (err) {
      console.error('fetchUsers', err);
      users.value = [];
    } finally {
      loading.value = false;
    }
  };

  const createUser = async (payload: any) => {
    loading.value = true;
    try {
      const res = await api.post('/api/mock/users', payload);
      users.value.push(res.data ?? res);
      return res.data ?? res;
    } catch (err) {
      console.error('createUser', err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const updateUser = async (id: string, payload: any) => {
    loading.value = true;
    try {
      const res = await api.patch(`/api/mock/users/${id}`, payload);
      return res.data ?? res;
    } catch (err) {
      console.error('updateUser', err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const deleteUser = async (id: string) => {
    loading.value = true;
    try {
      const res = await api.delete(`/api/mock/users/${id}`);
      users.value = users.value.filter(u => String(u.id) !== String(id));
      return res.data ?? res;
    } catch (err) {
      console.error('deleteUser', err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { users, loading, fetchUsers, createUser, updateUser, deleteUser };
});
