<script setup lang="ts">
import { ref, reactive } from 'vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const isRegister = ref(false);
const loading = ref(false);

const form = reactive({
  name: '',
  email: '',
  password: '',
  phone: '',
});

const toast = useToastStore();

const handleSubmit = async () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    toast.show(
      isRegister.value ? 'Compte créé !' : 'Connexion réussie',
      'success',
      isRegister.value
        ? 'Bienvenue sur Súna Consulting. Votre espace est prêt.'
        : 'Vous êtes maintenant connecté à votre espace client.'
    );
    emit('update:modelValue', false);
  }, 1000);
};
</script>

<template>
  <UModal
    :open="props.modelValue"
    @update:open="(val) => emit('update:modelValue', val)"
    :title="isRegister ? 'Créer mon compte' : 'Espace Client Súna'"
    :description="isRegister ? 'Rejoignez la diaspora qui pilote ses projets au Cameroun en toute sécurité.' : 'Accédez au suivi en temps réel de vos missions et démarches.'"
  >
    <template #body>
      <div class="space-y-4 py-2">
        <div class="flex justify-center mb-2">
          <NuxtImg
            src="/SC-H01.png"
            sizes="160px"
            quality="100"
            format="webp"
            class="h-10 w-auto object-contain"
          />
        </div>

        <div class="flex rounded-lg bg-sand-50 p-1 border border-gold-400/30">
          <button
            type="button"
            class="flex-1 py-1.5 text-xs font-semibold rounded-md transition-all duration-200"
            :class="!isRegister ? 'bg-rust-600 text-white shadow-sm' : 'text-slate-600 hover:text-rust-900'"
            @click="isRegister = false"
          >
            Connexion
          </button>
          <button
            type="button"
            class="flex-1 py-1.5 text-xs font-semibold rounded-md transition-all duration-200"
            :class="isRegister ? 'bg-rust-600 text-white shadow-sm' : 'text-slate-600 hover:text-rust-900'"
            @click="isRegister = true"
          >
            Inscription
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-3.5">
          <div v-if="isRegister" class="space-y-1">
            <label class="text-xs font-medium text-slate-700">Nom complet</label>
            <UInput
              v-model="form.name"
              placeholder="ex: Jean Dupont"
              icon="i-lucide-user"
              class="w-full"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-xs font-medium text-slate-700">Adresse email</label>
            <UInput
              v-model="form.email"
              type="email"
              placeholder="vous@email.com"
              icon="i-lucide-mail"
              class="w-full"
              required
            />
          </div>

          <div v-if="isRegister" class="space-y-1">
            <label class="text-xs font-medium text-slate-700">Numéro WhatsApp / Téléphone</label>
            <UInput
              v-model="form.phone"
              type="tel"
              placeholder="+33 6 12 34 56 78"
              icon="i-lucide-phone"
              class="w-full"
            />
          </div>

          <div class="space-y-1">
            <label class="text-xs font-medium text-slate-700">Mot de passe</label>
            <UInput
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              icon="i-lucide-lock"
              class="w-full"
              required
            />
          </div>

          <div v-if="!isRegister" class="flex items-center justify-between text-xs">
            <label class="flex items-center gap-1.5 text-slate-600 cursor-pointer">
              <input type="checkbox" class="rounded border-slate-300 text-rust-600 focus:ring-rust-500" />
              <span>Se souvenir de moi</span>
            </label>
            <a href="#" class="text-rust-600 hover:text-rust-900 font-medium">Mot de passe oublié ?</a>
          </div>

          <UButton
            type="submit"
            block
            :loading="loading"
            class="mt-4 bg-rust-600 hover:bg-rust-700 text-white font-semibold py-2.5 shadow-md shadow-rust-600/20"
          >
            {{ isRegister ? 'Créer mon compte client' : 'Accéder à mon espace' }}
          </UButton>
        </form>

        <div class="relative my-4 text-center">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-200" /></div>
          <span class="relative bg-white px-2 text-xs uppercase tracking-wider text-slate-400">ou</span>
        </div>

        <UButton
          type="button"
          variant="outline"
          block
          color="neutral"
          icon="i-lucide-globe"
          class="border-slate-300 text-slate-700 hover:bg-slate-50"
          @click="handleSubmit"
        >
          Continuer avec Google
        </UButton>
      </div>
    </template>
  </UModal>
</template>
