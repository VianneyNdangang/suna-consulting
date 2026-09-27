<template>
  <div class="auth-page">
    <h1>{{ t('auth.registrationTitle') }}</h1>
    <form @submit.prevent="onSubmit">
      <Input v-model="full_name" name="full_name" :label="t('auth.name')" type="text" :placeholder="t('auth.namePlaceholder')" :error="errors.full_name" />
      <Input v-model="email" name="email" :label="t('auth.email')" type="email" placeholder="you@email.com" :error="errors.email" />
      <Input v-model="password" name="password" :label="t('auth.password')" type="password" :placeholder="t('auth.passwordPlaceholder')" :error="errors.password" />
      <button :disabled="loading">{{ t('auth.registrationSubmit') }}</button>
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
const { t } = useI18n();
const router = useRouter();
const submitError = ref('');
const loading = computed(() => auth.loading);

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(registerSchema),
});

const [full_name] = defineField('full_name');
const [email] = defineField('email');
const [password] = defineField('password');

watch(
  () => auth.user,
  (profile) => {
    if (!profile) return;
    if (!full_name.value && profile.full_name) full_name.value = profile.full_name;
    if (!email.value && profile.email) email.value = profile.email;
  },
  { immediate: true },
);

const onSubmit = handleSubmit(async (values) => {
  submitError.value = '';
  const ok = await auth.register(values);
  if (ok) {
    await router.push('/dashboard');
  } else {
    submitError.value = t('auth.registrationError');
  }
});
</script>

<style scoped>
.auth-page { max-width: 420px; margin: 2rem auto; }
.error { color: #c00; }
</style>
