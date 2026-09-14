<template>
  <UModal
    :open="props.modelValue"
    @update:open="(val: any) => emit('update:modelValue', val)"
    :title="service ? 'Modifier le service' : 'Créer un service'"
    :description="
      service
        ? 'Modifier les informations du service'
        : 'Remplissez le formulaire pour créer un nouveau service'
    "
    :ui="{
      title: 'text-xl'
    }"
  >
    <template #body>
      <div class="space-y-4 py-2">
        <!-- Formulaire -->
        <form @submit.prevent="onSubmit" class="space-y-3.5">
          <section>
            <div class="mt-2 flex flex-col gap-3">
              <Input
                v-model="slug"
                type="text"
                placeholder="Slug"
                class="w-full"
                label="Slug"
                name="slug"
                :error="errors.slug"
                label-class="text-(--text-secondary)"
              />
              <Input
                v-model="title"
                type="text"
                placeholder="Titre du service"
                class="w-full"
                label="Titre"
                name="title"
                :error="errors.title"
                label-class="text-(--text-secondary)"
              />
              <Textarea
                v-model="description"
                placeholder="Donnez une description a ce service"
                label="Description"
                name="description"
                :error="errors.description"
                label-class="text-(--text-secondary)"
              />
            </div>
          </section>
          <section class="flex justify-end items-center gap-3">
            <Button
              name="cancel"
              type="button"
              variant="ghost"
              :icon="'i-tabler-x'"
              label="Annuler"
              @click="
                () => {
                  (emit('update:modelValue', false), resetForm());
                }
              "
            />

            <Button
              name="submitform"
              type="submit"
              variant="primary"
              :loading="loading"
              :icon="service ? 'i-tabler-device-floppy' : 'i-tabler-plus'"
              :label="service ? 'Enregistrer' : 'Créer'"
            />
          </section>
        </form>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import { serviceFormSchema } from "~/schemas/forms.schema";
import Textarea from "~/components/textarea/Textarea.vue";
import Button from "~/components/buttons/Button.vue";

const props = defineProps<{
  modelValue: boolean;
  service?: any;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
// const isOpen = computed({
//   get: () => props.modelValue,
//   set: (value) => {
//     emit("update:modelValue", value);
//   },
// });

console.log("service", props.service);
const toast = useToast();
const loading = ref(false);

const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema: computed(() => toTypedSchema(serviceFormSchema)),
  initialValues: {
    slug: "",
    title: "",
    description: "",
    is_active: true,
  },
});

watch(
  () => props.service,
  (service) => {
    if (service) {
      resetForm({
        values: {
          slug: service.slug ?? "",
          title: service.title ?? "",
          description: service.description ?? "",
          is_active: service.is_active ?? true,
        },
      });
    } else {
      resetForm({
        values: {
          slug: "",
          title: "",
          description: "",
          is_active: true,
        },
      });
    }
  },
  { immediate: true },
);
const [title] = defineField("title");
const [slug] = defineField("slug");
const [description] = defineField("description");

const store = useServiceStore();

const onSubmit = handleSubmit(async (values: any) => {
  try {
    loading.value = true;
    await store.createServices(values, props.service?.id);
    store.fetchServices();
    resetForm();
    emit("update:modelValue", false);
    toast.add({
      title: `Opperation effectuee avec success`,
      description: `Le service ${values.slug} vient d'etre créé`,
      color: "success",
      icon: `i-tabler-check`,
    });
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>
