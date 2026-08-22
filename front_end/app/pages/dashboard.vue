<template>
  <div class="dashboard">
    <h1>Tableau de bord</h1>
    <div v-if="user">
      <p>Bonjour, {{ user.name ?? user.email }}</p>
      <pre>{{ user }}</pre>
      <button @click="logout">Se déconnecter</button>
    </div>
    <div v-else-if="auth.loading" class="space-y-3" aria-busy="true" aria-label="Chargement du profil">
      <USkeleton class="h-6 w-48" />
      <USkeleton class="h-24 w-full max-w-xl" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '~/stores/authStore';

definePageMeta({ middleware: 'auth' });

const auth = useAuthStore();
const user = auth.user;

onMounted(async () => {
  if (!user.value) await auth.fetchProfile();
});

const logout = () => {
  auth.logout();
  navigateTo('/login');
};
</script>

<style scoped>
.dashboard { max-width: 800px; margin: 2rem auto; }
</style>
