<template>
  <div class="auth-page">
    <h1>Inscription</h1>
    <form @submit.prevent="onSubmit">
      <Input v-model="name" name="name" label="Nom" type="text" placeholder="Votre nom" :error="errors.name" />
      <Input v-model="email" name="email" label="Email" type="email" placeholder="vous@email.com" :error="errors.email" />
      <Input v-model="password" name="password" label="Mot de passe" type="password" placeholder="8 caractères minimum" :error="errors.password" />
      <button :disabled="loading">S'inscrire</button>
    </form>
    <p v-if="submitError" class="error">{{ submitError }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useAuthStore } from '~/stores/authStore';
import { registerSchema } from '~/schemas/forms.schema';
import Input from '~/components/input/Input.vue';

const auth = useAuthStore();
const router = useRouter();
const submitError = ref('');
const loading = computed(() => auth.loading);

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(registerSchema),
});

const [name] = defineField('name');
const [email] = defineField('email');
const [password] = defineField('password');

const onSubmit = handleSubmit(async (values) => {
  submitError.value = '';
  const ok = await auth.register(values);
  if (ok) {
    await router.push('/dashboard');
  } else {
    submitError.value = 'Échec de l\'inscription';
  }
});
</script>

<style scoped>
.auth-page { max-width: 420px; margin: 2rem auto; }
.error { color: #c00; }
</style>
