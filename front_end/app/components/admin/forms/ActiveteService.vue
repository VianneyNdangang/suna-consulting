<template>
  <UModal
    :open="props.modelValue"
    @update:open="(val: any) => emit('update:modelValue', val)"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-full bg-(--secondary)/10 text-(--secondary)"
        >
          <UIcon name="i-tabler-message-check" class="size-5" />
        </div>

        <div>
          <h3 class="text-base font-semibold text-(--text-primary)">
            {{
              service.is_active
                ? `Désactiver le service`
                : `Activer le service ?`
            }}
          </h3>

          <p class="text-sm text-(--text-secondary)">
            Confirmation de publication
          </p>
        </div>
      </div>
    </template>

    <template #body>
      <div class="space-y-4">
        <p class="text-sm leading-6 text-(--text-secondary)">
          {{
            service.is_active
              ? `Êtes-vous sûr de vouloir aésactiver ce service ? Il ne sera plus visible
          publiquement sur le site.`
              : `Êtes-vous sûr de vouloir activer ce service ? Il sera visible
          publiquement sur le site.`
          }}
        </p>

        <UAlert
          icon="i-tabler-info-circle"
          color="warning"
          variant="soft"
          title="Attention"
          :description="
            service.is_active
              ? `Une fois désactivé, le service ne pourra plus être consulté par les visiteurs du site.`
              : `Une fois activé, le service pourra être consulté par les visiteurs du site.`
          "
        />
      </div>
    </template>

    <template #footer>
      <div class="flex w-full justify-end gap-3">
        <Button
          type="button"
          label="Annuler"
          variant="ghost"
          @click="
            () => {
              emit('update:modelValue', false);
            }
          "
        />

        <Button
          type="button"
          :label="service.is_active?`Désactiver`:`Activer`"
          icon="i-tabler-check"
          variant="primary"
          :loading="loading"
          @click="confirmPublication"
        />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import Button from "~/components/buttons/Button.vue";

const props = defineProps<{
  modelValue: boolean;
  service: any;
}>();

const store = useServiceStore();
const toast = useToast();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const loading = ref(false);

const confirmPublication = async () => {
  loading.value = true;

  const isPublishing = !props.service.is_active;

  try {
    await store.createServices({
      is_active: isPublishing,
    }, props.service.id);
    store.fetchServices();
    emit("update:modelValue", false);

    if (isPublishing) {
      toast.add({
        title: "Succès",
        description: "service activé avec succès.",
        color: "success",
        icon: "i-tabler-circle-check",
      });
    } else {
      toast.add({
        title: "Succès",
        description: "service désactivé avec succès.",
        color: "warning",
        icon: "i-tabler-eye-off",
      });
    }
  } catch (error) {
    toast.add({
      title: "Erreur",
      description: isPublishing
        ? "Impossible d'activer le service. Veuillez réessayer."
        : "Impossible de désactiver le service. Veuillez réessayer.",
      color: "error",
      icon: "i-tabler-circle-x",
    });
  } finally {
    loading.value = false;
  }
};
</script>
