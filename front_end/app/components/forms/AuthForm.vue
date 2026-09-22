```vue
<template>
  <UModal
    :open="props.modelValue"
    @update:open="(val: any) => emit('update:modelValue', val)"
    :title="isRegister ? t('auth.createAccount') : t('auth.clientSpace')"
    :description="
      isRegister
        ? t('auth.registerDescription')
        : t('auth.loginDescription')
    "
  >
    <template #body>
      <div class="space-y-4 py-2">
        <!-- Logo -->
        <div class="flex justify-center mb-2">
          <NuxtImg
            src="/SC-H01.png"
            sizes="160px"
            quality="100"
            format="webp"
            class="h-10 w-auto object-contain"
          />
        </div>

        <!-- Connexion / Inscription -->
        <div class="flex rounded-lg bg-sand-50 p-1 border border-gold-400/30">
          <button
            type="button"
            class="flex-1 py-1.5 text-xs font-semibold rounded-md transition-all duration-200"
            :class="
              !isRegister
                ? 'bg-rust-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-rust-900'
            "
            @click="isRegister = false"
          >
            {{ t('auth.login') }}
          </button>

          <button
            type="button"
            class="flex-1 py-1.5 text-xs font-semibold rounded-md transition-all duration-200"
            :class="
              isRegister
                ? 'bg-rust-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-rust-900'
            "
            @click="isRegister = true"
          >
            {{ t('auth.register') }}
          </button>
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="onSubmit" class="space-y-3.5">
          <section v-if="isRegister">
            <p class="text-xs text-(--secondary) font-semibold">
              {{ t('auth.personalInfo') }}
            </p>

            <div class="mt-2">
              <Input
                v-model="full_name"
                type="text"
                :placeholder="t('auth.fullNamePlaceholder')"
                class="w-full"
                :label="t('auth.fullName')"
                name="full_name"
                :error="errors.full_name"
              />
              <Input
                v-model="avatar"
                type="file"
                :placeholder="t('auth.uploadPhoto')"
                class="w-full"
                :label="t('auth.profilePhoto')"
                name="avatar"
                :error="errors.avatar"
              />
            </div>
          </section>
          <section>
            <p
              v-if="isRegister"
              class="text-xs text-(--secondary) font-semibold mt-5"
            >
              {{ t('auth.contacts') }}
            </p>

            <div
              :class="
                isRegister
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2 mt-2'
                  : 'mt-2'
              "
            >
              <Input
                v-model="email"
                type="email"
                placeholder="you@email.com"
                class="w-full"
                :label="t('auth.email')"
                name="email"
                :error="errors.email"
              />

              <!-- Téléphone -->
              <Input
                v-if="isRegister"
                v-model="phone"
                type="tel"
                placeholder="+237 6 52 34 56 78"
                class="w-full"
                :label="t('auth.phone')"
                name="phone"
                :error="errors.phone"
              />
            </div>
          </section>
          <section v-if="isRegister">
            <p class="text-xs text-(--secondary) font-semibold mt-5">{{ t('auth.profile') }}</p>

            <div class="mt-2">
              <Combobox
                v-model="country"
                url="https://countries.dev/name/"
                option-value="name"
                option-label="name"
                name="country"
                :label="t('auth.country')"
                :placeholder="t('auth.searchCountry')"
                :error="errors.country"
              />
              <Combobox
                v-model="city"
                url="https://countries.dev/cities?q="
                option-value="name"
                option-label="name"
                name="city"
                :label="t('auth.city')"
                :placeholder="t('auth.searchCity')"
                :error="errors.city"
              />
            </div>
          </section>

          <section>
            <p class="text-xs text-(--secondary) font-semibold mt-5">
              {{ t('auth.security') }}
            </p>

            <div
              :class="
                isRegister
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2 mt-2'
                  : 'mt-2'
              "
            >
              <Input
                v-model="password"
                type="password"
                :placeholder="t('auth.passwordPlaceholder')"
                class="w-full"
                :label="t('auth.password')"
                name="password"
                :error="errors.password"
              />

              <!-- Confirmation -->

              <Input
                v-if="isRegister"
                v-model="confirmPassword"
                type="password"
                :placeholder="t('auth.confirmPasswordPlaceholder')"
                :label="t('auth.confirmPassword')"
                name="confirm_password"
                :error="errors.confirm_password"
              />
            </div>
          </section>

          <div
            v-if="!isRegister"
            class="flex items-center justify-between text-xs"
          >
            <label
              class="flex items-center gap-1.5 text-slate-600 cursor-pointer"
            >
              <input
                type="checkbox"
                v-model="rememberMe"
                class="rounded border-slate-300 text-rust-600 focus:ring-rust-500"
              />

              <span>{{ t('auth.remember') }}</span>
            </label>

            <NuxtLink
              to="#"
              class="text-rust-600 hover:text-rust-900 font-medium"
            >
              {{ t('auth.forgotPassword') }}
            </NuxtLink>
          </div>
          <USeparator />
          <Button
            name="submitform"
            type="submit"
            w="full"
            variant="primary"
            :loading="loading"
            :label="
              isRegister ? t('auth.createClientAccount') : t('auth.accessSpace')
            "
          />
        </form>

        <USeparator :label="t('auth.or')" />

        <!-- Google -->
        <UButton
          type="button"
          variant="outline"
          block
          color="neutral"
          class="border-slate-300 text-slate-700 hover:bg-slate-50"
          @click="loginWithGoogle"
        >
          <UIcon :name="IconGoogle" class="size-5" />
          <span>{{ t('auth.continueGoogle') }}</span>
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import { loginSchema, registerSchema } from "~/schemas/forms.schema";
import Combobox from "../combobox/Combobox.vue";
import Button from "../buttons/Button.vue";
import { IconGoogle } from "../svg/svg.js";

const props = defineProps<{
  modelValue: boolean;
}>();
const { t } = useI18n();
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const isRegister = ref(false);
const loading = ref(false);

const rememberMe = ref(false);

const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema: computed(() =>
    toTypedSchema(isRegister.value ? registerSchema : loginSchema),
  ),
  initialValues: {
    full_name: "",
    email: "",
    country: "",
    city: "",
    password: "",
    confirm_password: "",
    phone: "",
    avatar: "",
  },
});
const [full_name] = defineField("full_name");
const [email] = defineField("email");
const [country] = defineField("country");
const [city] = defineField("city");
const [password] = defineField("password");
const [confirmPassword] = defineField("confirm_password");
const [phone] = defineField("phone");
const [avatar] = defineField("avatar");

const store = useAuthStore();
const toast = useToast();

const prefillFromUser = (user: any) => {
  if (!user) return;
  if (!full_name.value && user.full_name) full_name.value = user.full_name;
  if (!email.value && user.email) email.value = user.email;
  if (!phone.value && user.phone) phone.value = user.phone;
  if (!country.value && user.country) country.value = user.country;
  if (!city.value && user.city) city.value = user.city;
};

watch(() => store.user, prefillFromUser, { immediate: true });

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    if (isRegister.value) {
      await store.register(values);
    } else {
      const success = await store.login(values);
    }
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    emit("update:modelValue", false);
    toast.add({
      title: store.message,
      color: "success",
    });
    resetForm();
  } catch (err) {
    console.error(err);
    toast.add({
      title: store.message || t('auth.error'),
      color: "error",
    });
  } finally {
    loading.value = false;
  }
});

const loginWithGoogle = () => {
  console.log("Connexion avec Google");
};
</script>
