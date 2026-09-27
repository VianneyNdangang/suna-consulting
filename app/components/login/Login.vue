<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div
      class="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-xl"
    >
      <div class="flex flex-col items-center">
        <NuxtImg
          src="/logo_primary.png"
          sizes="100"
          quality="100"
          format="webp"
        />

        <h1 class="mt-4 text-xl font-bold text-rust-600">
          {{ t('auth.loginTitle') }}
        </h1>

        <p class="mt-2 text-center text-gray-500">
          {{ t('auth.loginDescription') }}
        </p>
      </div>

      <form
        class="mt-8 space-y-5"
        @submit.prevent="onSubmit"
      >
        <Input
          v-model="email"
          :label="t('auth.email')"
          name="email"
          type="email"
          placeholder="example@email.com"
          :error="errors.email"
        />

        <Input
          v-model="password"
          :label="t('auth.password')"
          name="password"
          type="password"
          placeholder="********"
          :error="errors.password"
        />

        <Button
          type="submit"
          :label="t('auth.loginSubmit')"
          variant="primary"
          bg="[#c79e46]"
          w="full"
          :loading="log.loading"
        />
      </form>

      <div class="my-6 flex items-center">
        <div class="h-px flex-1 bg-gray-300" />
        <span class="mx-4 text-sm text-gray-400">{{ t('auth.or') }}</span>
        <div class="h-px flex-1 bg-gray-300" />
      </div>

      <!-- Bouton Google -->
      <Button
        type="button"
        :label="t('auth.continueGoogle')"
        variant="secondary"
        w="full"
        @click="loginWithGoogle"
      >
        <template #icon>
          <!-- <variant
            src="/google.svg"
            class="h-5 w-5"
            alt="Google"
          /> -->
        </template>
      </Button>

      <p class="mt-6 text-center text-sm">
        {{ t('auth.noAccount') }}

        <NuxtLink
          to="/register"
          class="font-semibold text-rust-600 hover:underline"
        >
          {{ t('auth.signUp') }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "../buttons/Button.vue";

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import Input from "../input/Input.vue";

import { loginSchema } from '~/schemas/forms.schema';

const log = useUserStore();
const authStore = useAuthStore();
const { t } = useI18n();

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(loginSchema),
});

const [email] = defineField("email");
const [password] = defineField("password");

watch(
  () => authStore.user?.email,
  (userEmail) => {
    if (!email.value && userEmail) email.value = userEmail;
  },
  { immediate: true },
);

const onSubmit = handleSubmit(async (values) => {
  // await log.loginUser(values);
});

const loginWithGoogle = () => {
  // log.loginWithGoogle();
};
</script>