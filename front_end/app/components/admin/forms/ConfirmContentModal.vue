<template>
  <UModal
    :open="props.modelValue"
    @update:open="(val: boolean) => emit('update:modelValue', val)"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-full bg-(--secondary)/10 text-(--secondary)"
        >
          <UIcon name="i-tabler-edit" class="size-5" />
        </div>
        <div>
          <h3 class="text-base font-semibold text-(--text-primary)">
            Modifier le contenu du site ?
          </h3>
          <p class="text-sm text-(--text-secondary)">
            Confirmation de la modification du contenu
          </p>
        </div>
      </div>
    </template>
    <template #body>
      <UForm :schema="schema" :state="state" @submit="confirm">
        <div class="space-y-4">
          <p class="text-sm leading-6 text-(--text-secondary)">
            Vous êtes sur le point de modifier le contenu du site de
            <strong>SUNA CONSULTING</strong>. Veuillez entrer votre mot de passe
            pour confirmer cette action.
          </p>
          <UAlert
            icon="i-tabler-info-circle"
            color="warning"
            variant="soft"
            title="Attention"
            description="Les modifications seront appliquées au contenu actuellement enregistré sur le site."
          />
          <Input
            v-model="state.password"
            type="password"
            name="password"
            label="Mot de passe"
            placeholder="Entrez votre mot de passe"
            icon="i-tabler-lock"
            label-class="text-(--text-secondary)"
          />
        </div>
        <div class="mt-6 flex w-full justify-end gap-3">
          <Button
            type="button"
            label="Annuler"
            variant="ghost"
            :disabled="loading"
            @click="close"
          />
          <Button
            type="submit"
            label="Confirmer la modification"
            icon="i-tabler-check"
            variant="primary"
            :loading="loading"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
<script setup lang="ts">
import * as z from "zod";
import Button from "~/components/buttons/Button.vue";
const props = withDefaults(
  defineProps<{ modelValue: boolean; loading?: boolean }>(),
  { loading: false },
);
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "confirm", data: { password: string }): void;
}>();
const schema = z.object({
  password: z.string().min(1, "Le mot de passe est obligatoire."),
});
const state = reactive({ password: "" });
const close = () => {
  state.password = "";
  emit("update:modelValue", false);
};
const confirm = () => {
  emit("confirm", { password: state.password });
};
</script>
