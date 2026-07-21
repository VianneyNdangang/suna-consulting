<template>
  <div class="auth-page">
    <h1>Inscription</h1>
    <form @submit.prevent="onSubmit">
      <label>Nom</label>
      <input v-model="name" required />

      <label>Email</label>
      <input v-model="email" type="email" required />

      <label>Mot de passe</label>
      <input v-model="password" type="password" required />

      <button :disabled="loading">S'inscrire</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/authStore';

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref<string | null>(null);
const router = useRouter();
const auth = useAuthStore();

const loading = computed(() => auth.loading);

const onSubmit = async () => {
  error.value = null;
  const ok = await auth.register({ name: name.value, email: email.value, password: password.value });
  if (ok) {
    await router.push('/dashboard');
  } else {
    error.value = 'Échec de l\'inscription';
  }
};
</script>

<style scoped>
.auth-page { max-width: 420px; margin: 2rem auto; }
.error { color: #c00; }
</style>
