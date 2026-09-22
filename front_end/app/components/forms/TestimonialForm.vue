```vue
<template>
  <UModal
    :open="props.modelValue"
    :ui="{ content: 'sm:max-w-xl' }"
    @update:open="(val: boolean) => emit('update:modelValue', val)"
  >
    <!-- Header -->
    <template #title>
      <div class="flex items-start gap-3">
        <div
          class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-rust-600/10 text-rust-600"
        >
          <UIcon
            name="i-tabler-message-star"
            class="size-5"
          />
        </div>

        <div class="min-w-0">
          <h2 class="text-base font-bold text-rust-600 sm:text-lg">
            {{ t('testimonialForm.title') }}
          </h2>

          <p class="mt-0.5 text-sm text-rust-500">
            {{ t('testimonialForm.subtitle') }}
          </p>
        </div>
      </div>
    </template>

    <template #body>
      <form
        @submit.prevent="submitTestimonial"
        class="flex flex-col gap-4"
      >
        <!-- Introduction -->
        <UAlert
          color="info"
          variant="subtle"
          icon="i-tabler-info-circle"
          :description="t('testimonialForm.intro')"
        />

        <!-- Informations -->
        <section class="space-y-2">
          <div>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-tabler-user"
                class="size-4 text-rust-600"
              />

              <h3 class="text-sm font-semibold text-rust-600">
                {{ t('testimonialForm.information') }}
              </h3>
            </div>

            <p class="hidden text-xs text-rust-500 sm:block">
              {{ t('testimonialForm.informationDescription') }}
            </p>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">

            <!-- Nom -->
            <Input
              v-model="authorName"
              name="author_name"
              icon="i-tabler-user"
              :label="t('auth.fullName')"
              type="text"
              :placeholder="t('auth.fullNamePlaceholder')"
              :error="formErrors.author_name"
            />

            <!-- Localisation -->
             <Combobox
                v-model="authorLocation"
                url="https://countries.dev/name/"
                option-value="name"
                option-label="name"
                name="country"
                :label="t('testimonialForm.location')"
                :placeholder="t('testimonialForm.locationPlaceholder')"
                :error="formErrors.author_location"
              />
            <!-- <Input
              v-model="authorLocation"
              name="author_location"
              icon="i-tabler-map-pin"
              :label="t('testimonialForm.location')"
              type="text"
              :placeholder="t('testimonialForm.locationPlaceholder')"
              :error="formErrors.author_location"
            /> -->

          </div>
        </section>

        <!-- Service -->
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <Select
            v-model="serviceUsed"
            name="service_used"
            :label="t('testimonialForm.service')"
            :placeholder="t('testimonialForm.servicePlaceholder')"
            :options="serviceOptions"
            :error="formErrors.service_used"
          />

          <div class="flex items-center gap-2 rounded-md border border-gold-400/20 px-3 py-2 sm:h-10">
            <span class="text-xs font-semibold text-rust-600">{{ t('testimonialForm.rating') }}</span>
            <UInputRating v-model="rating" icon="i-tabler-star-filled" size="sm" />
            <span class="text-xs font-semibold text-rust-600">{{ rating }}/5</span>
          </div>
        </div>

        <!-- Témoignage -->
        <section class="space-y-2">
          <div>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-tabler-message-2"
                class="size-4 text-rust-600"
              />

              <h3 class="text-sm font-semibold text-rust-600">
                {{ t('testimonialForm.testimonial') }}
              </h3>
            </div>

            <p class="hidden text-xs text-rust-500 sm:block">
              {{ t('testimonialForm.testimonialDescription') }}
            </p>
          </div>

          <Textarea
            v-model="content"
            name="content"
            :label="t('testimonialForm.review')"
            :placeholder="t('testimonialForm.reviewPlaceholder')"
            :error="formErrors.content"
          />
        </section>

        <USeparator />

        <!-- Action -->
        <div class="space-y-2 pt-1">
          <Button
            type="submit"
            :loading="loading"
            variant="primary"
            w="full"
            icon="i-tabler-send"
            :label="t('testimonialForm.send')"
          />

          <div class="flex items-center justify-center gap-1.5 text-center">
            <UIcon
              name="i-tabler-shield-check"
              class="size-3.5 text-slate-400"
            />

            <p class="text-[11px] text-slate-500">
              {{ t('testimonialForm.privacy') }}
            </p>
          </div>
        </div>
      </form>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import { testimonialFormSchema } from "~/schemas/forms.schema";

import Button from "../buttons/Button.vue";
import Input from "../input/Input.vue";
import Textarea from "../textarea/Textarea.vue";
import Select from "../select/Select.vue";
import type { servicesType } from "~/types/types";
import type { AxiosInstance } from "axios";

const props = defineProps<{
  modelValue: boolean;
}>();
const { t } = useI18n();
const authStore = useAuthStore();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const store = useTestimonialstore()
const serviceStore = useServiceStore();
const toast = useToast();
const loading = ref(false);

const {
  defineField,
  errors: formErrors,
  handleSubmit,
  resetForm,
} = useForm({
  validationSchema: toTypedSchema(testimonialFormSchema),

  initialValues: {
    author_name: "",
    author_location: "",
    service_used: "",
    rating: 5,
    content: "",
    // photo_url: "",
    is_published: false,
    flag: ""
  },
});

const [authorName] = defineField("author_name");
const [authorLocation] = defineField("author_location");
const [serviceUsed] = defineField("service_used");
const [rating] = defineField("rating");
const [content] = defineField("content");
const [flag] = defineField("flag");

const { $axios} = useNuxtApp();
const api = $axios as AxiosInstance;

const handleGetFlag = async (country: string) => {
  if (!authorLocation.value?.trim()) {
    flag.value = "";
    return;
  }

  try {
    const response = await api.get(
      `https://countries.dev/name/${encodeURIComponent(country)}`
    );
    flag.value = response.data[0]?.flags.png ?? "";
  } catch (error) {
    console.error("Erreur lors de la récupération du drapeau :", error);
    flag.value = "";
  }
};

watch(
  authorLocation,
  (newCountry) => {
    if (newCountry) {
      handleGetFlag(newCountry)
    }
  },
  { immediate: true }
)


const serviceOptions = computed(() =>
  serviceStore.services
    .filter((service: servicesType) => service.is_active !== false)
    .map((service: servicesType) => ({
      label: service.title,
      value: service.slug,
    })),
);

onMounted(() => {
  if (!serviceStore.services.length) {
    serviceStore.fetchServices();
  }
});

const prefillFromUser = (user: any) => {
  if (!user) return;
  if (!authorName.value && user.full_name) authorName.value = user.full_name;
  if (!authorLocation.value && user.country) authorLocation.value = user.country;
  // if (!authorLocation.value) {
  //   const location = [user.city, user.country].filter(Boolean).join(', ');
  //   if (location) authorLocation.value = location;
  // }
};

watch(() => authStore.user, prefillFromUser, { immediate: true });

const submitTestimonial = handleSubmit(async (values) => {
  try {
    loading.value = true;
    await store.createTestimonials(values)
    toast.add({
      title: t('testimonialForm.success'),
      description: t('testimonialForm.successDescription'),
      color: "success",
      icon: "i-tabler-check",
    });

    resetForm();

    emit("update:modelValue", false);

  } catch (error) {
    console.error(error);

    toast.add({
      title: t('testimonialForm.error'),
      description: t('testimonialForm.errorDescription'),
      color: "error",
      icon: "i-tabler-x",
    });
  } finally {
    loading.value = false;
  }
});
</script>