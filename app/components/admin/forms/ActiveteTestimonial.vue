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
              testimonial.is_published
                ? `Masquer le témoignage`
                : `Publier le témoignage ?`
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
            testimonial.is_published
              ? `Êtes-vous sûr de vouloir masquer ce témoignage ? Il ne sera plus visible
          publiquement sur le site.`
              : `Êtes-vous sûr de vouloir publier ce témoignage ? Il sera visible
          publiquement sur le site.`
          }}
        </p>

        <UAlert
          icon="i-tabler-info-circle"
          color="warning"
          variant="soft"
          title="Attention"
          :description="
            testimonial.is_published
              ? `Une fois masqué, le témoignage ne pourra plus être consulté par les visiteurs du site.`
              : `Une fois publié, le témoignage pourra être consulté par les visiteurs du site.`
          "
        />

        <div
          v-if="testimonial"
          class="rounded-lg border border-(--border) bg-(--card) p-3 flex flex-col gap-2"
        >
          <p
            v-if="testimonial.author_name"
            class="mb-2 font-medium text-(--text-primary)"
          >
            {{ testimonial.author_name }}
          </p>
          <div class="flex items-center gap-1">
            <UIcon
              v-for="n in 5"
              :key="n"
              name="i-tabler-star-filled"
              class="h-4 w-4"
              :class="
                n <= testimonial.rating ? 'text-gold-400' : 'text-slate-200'
              "
            />
          </div>

          <p
            v-if="testimonial.content"
            class="line-clamp-3 text-sm italic text-(--text-secondary)"
          >
            « {{ testimonial.content }} »
          </p>
        </div>
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
          :label="testimonial.is_published?`Masquer`:`Publier`"
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
  testimonial: any;
}>();

const store = useTestimonialstore();
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

  const isPublishing = !props.testimonial.is_published;

  try {
    await store.updateTestominials(props.testimonial.id, {
      is_published: isPublishing,
    });
    store.fetchTestimonials();
    emit("update:modelValue", false);

    if (isPublishing) {
      toast.add({
        title: "Succès",
        description: "Témoignage publié avec succès.",
        color: "success",
        icon: "i-tabler-circle-check",
      });
    } else {
      toast.add({
        title: "Succès",
        description: "Témoignage masqué avec succès.",
        color: "warning",
        icon: "i-tabler-eye-off",
      });
    }
  } catch (error) {
    toast.add({
      title: "Erreur",
      description: isPublishing
        ? "Impossible de publier le témoignage. Veuillez réessayer."
        : "Impossible de masquer le témoignage. Veuillez réessayer.",
      color: "error",
      icon: "i-tabler-circle-x",
    });
  } finally {
    loading.value = false;
  }
};
</script>
