```vue
<template>
  <UModal
    :open="props.modelValue"
    @update:open="(val: any) => emit('update:modelValue', val)"
    :title="isRegister ? 'Créer mon compte' : 'Espace Client Súna'"
    :description="
      isRegister
        ? 'Rejoignez la diaspora qui pilote ses projets au Cameroun en toute sécurité.'
        : 'Accédez au suivi en temps réel de vos missions et démarches.'
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
            Connexion
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
            Inscription
          </button>
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="onSubmit" class="space-y-3.5">
          <section v-if="isRegister">
            <p class="text-xs text-(--secondary) font-semibold">
              Informations personnelles
            </p>

            <div class="mt-2">
              <Input
                v-model="fullname"
                type="text"
                placeholder="ex: Jean Dupont"
                class="w-full"
                label="Nom complet"
                name="fullname"
                :error="errors.fullname"
              />
              <Input
                v-model="avatar"
                type="image"
                placeholder="Téléchargez une photo"
                class="w-full"
                label="Photo de profil"
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
              Contacts
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
                placeholder="vous@email.com"
                class="w-full"
                label="Adresse email"
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
                
                label="Numéro WhatsApp / Téléphone"
                name="phone"
                :error="errors.phone"
              />
            </div>
          </section>
          <section v-if="isRegister">
            <p class="text-xs text-(--secondary) font-semibold mt-5">Profil</p>

            <div class="mt-2">
              <Combobox
                v-model="country"
                url="https://countries.dev/name"
                option-value="name"
                option-label="name"
                name="country"
                label="Pays de residence"
                placeholder="Rechercher un pays..."
                :error="errors.country"
              />
              <Combobox
                v-model="city"
                url="https://countries.dev/cities?q"
                option-value="name"
                option-label="name"
                name="country"
                label="Pays de residence"
                placeholder="Rechercher un pays..."
                :error="errors.city"
              />
            </div>
          </section>

          <section>
            <p class="text-xs text-(--secondary) font-semibold mt-5">
              Sécurité
            </p>

            <div
              :class="isRegister? 'grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2 mt-2': 'mt-2'"
            >
              <Input
                v-model="password"
                type="password"
                placeholder="8 caractères minimum"
                class="w-full"
                label="Mot de passe"
                name="password"
                :error="errors.password"
              />

              <!-- Confirmation -->

              <Input
                v-if="isRegister"
                v-model="confirmPassword"
                type="password"
                placeholder="Confirmez votre mot de passe"
                label="Confirmer le mot de passe"
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

              <span>Se souvenir de moi</span>
            </label>

            <NuxtLink
              to="#"
              class="text-rust-600 hover:text-rust-900 font-medium"
            >
              Mot de passe oublié ?
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
                isRegister ? `Créer mon compte client` : `Accéder à mon espace`
              "
            />
        </form>

        <USeparator label="Ou" />

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
  <span>Continuer avec Google</span>
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
    fullname: "",
    email: "",
    country: "",
    city: "",
    password: "",
    confirm_password: "",
    phone: "",
    avatar: "",
  },
});
const [fullname] = defineField("fullname");
const [email] = defineField("email");
const [country] = defineField("country");
const [city] = defineField("city");
const [password] = defineField("password");
const [confirmPassword] = defineField("confirm_password");
const [phone] = defineField("phone");
const [avatar] = defineField("avatar");

const store = useAuthStore();

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    if (isRegister.value) {
      await store.register(values);
    } else {
      const success = await store.login(values);
    }
    console.log("Valeurs du formulaire :", values);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // emit("update:modelValue", false);
    resetForm();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const loginWithGoogle = () => {
  console.log("Connexion avec Google");
};

// onMounted(() => {
//   fetchCountries();
// });
</script>
