import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AxiosInstance } from 'axios';
import { useNuxtApp } from '#imports';

export const useUserStore = defineStore('users', () => {
  const users = ref<any[]>([]);
  const loading = ref(false);
  const { $axios } = useNuxtApp();
  const api = $axios as AxiosInstance;
  const toast = useToastStore();

  const fetchUsers = async () => {
    loading.value = true;
    try {
      const res = await api.get('/users');
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
      const res = await api.post('/users', payload);
      users.value.push(res.data ?? res);
      toast.show(
        "Inscription réussie",
        "success",
        "Votre compte a bien été créé",
      );
      // return res.data ?? res;
    } catch (err) {
      toast.show(
        "Inscription échouée",
        "danger",
        "Erreur lors de la création de votre compte",
      );
      return null;
    } finally {
      loading.value = false;
    }
  };

  const updateUser = async (id: string, payload: any) => {
    loading.value = true;
    try {
      const res = await api.patch(`/users/${id}`, payload);
      toast.show(
        "Mise a jour réussie",
        "success",
        "Vos données ont bien été mises a jour",
      );
      // return res.data ?? res;
    } catch (err) {
      toast.show(
        "Mise a jour échouée",
        "danger",
        "Vos données n'ont pas été mises a jour",
      );
      return null;
    } finally {
      loading.value = false;
    }
  };

  const deleteUser = async (id: string) => {
    loading.value = true;
    try {
      const res = await api.delete(`/users/${id}`);
      users.value = users.value.filter(u => String(u.id) !== String(id));
      // return res.data ?? res;
      toast.show(
        "Suppression effectuée",
        "success",
        "Ce compte a été supprimé",
      );
    } catch (err) {
      toast.show(
        "Suppression échouée",
        "danger",
        "Ce compte n'a pas été supprimé",
      );
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { users, loading, fetchUsers, createUser, updateUser, deleteUser };
});
