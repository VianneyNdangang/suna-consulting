<template>
  <section
    id="devis"
    class="py-16 md:py-24 bg-linear-to-br from-ink-900 via-ink-800 to-rust-900 text-white relative overflow-hidden"
  >
    <!-- Ambient mesh lighting -->
    <div
      class="absolute -top-32 -right-32 w-96 h-96 bg-gold-400/15 rounded-full blur-3xl pointer-events-none"
    />
    <div
      class="absolute -bottom-32 -left-32 w-96 h-96 bg-rust-600/20 rounded-full blur-3xl pointer-events-none"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <!-- Left Side: Pitch & Information -->
        <div class="lg:col-span-5 space-y-6">
          <UBadge
            color="primary"
            variant="subtle"
            size="md"
            class="bg-gold-400/20 text-gold-300 border border-gold-400/40 px-3.5 py-1 rounded-full font-medium text-xs tracking-wider uppercase backdrop-blur-md"
          >
            <UIcon name="i-lucide-calculator" class="w-3.5 h-3.5 mr-1" />
            {{ t('quoteForm.badge') }}
          </UBadge>

          <h2
            class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
          >
            {{ t('quoteForm.heading') }}
          </h2>

          <p class="text-base text-sand-50/85 leading-relaxed font-light">
            {{ t('quoteForm.description') }}
          </p>

          <!-- Why trust this process -->
          <div class="pt-4 space-y-4">
            <div class="flex items-start gap-3.5">
              <div
                class="h-9 w-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-gold-400 shrink-0"
              >
                <UIcon name="i-lucide-badge-percent" class="w-5 h-5" />
              </div>
              <div>
                <h4 class="text-sm font-bold text-white">
                  {{ t('quoteForm.clearPricing') }}
                </h4>
                <p class="text-xs text-sand-50/75 mt-0.5">
                  {{ t('quoteForm.clearPricingDescription') }}
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3.5">
              <div
                class="h-9 w-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-emerald-400 shrink-0"
              >
                <UIcon name="i-lucide-shield-check" class="w-5 h-5" />
              </div>
              <div>
                <h4 class="text-sm font-bold text-white">
                  {{ t('quoteForm.dedicatedAdvisor') }}
                </h4>
                <p class="text-xs text-sand-50/75 mt-0.5">
                  {{ t('quoteForm.dedicatedAdvisorDescription') }}
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3.5">
              <div
                class="h-9 w-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-rose-400 shrink-0"
              >
                <UIcon name="i-lucide-lock" class="w-5 h-5" />
              </div>
              <div>
                <h4 class="text-sm font-bold text-white">
                  {{ t('quoteForm.confidentiality') }}
                </h4>
                <p class="text-xs text-sand-50/75 mt-0.5">
                  {{ t('quoteForm.confidentialityDescription') }}
                </p>
              </div>
            </div>
          </div>

          <!-- Fast contact -->
          <div class="pt-6 border-t border-white/10">
            <p class="text-xs text-sand-50/70 mb-2">
              {{ t('quoteForm.directMessage') }}
            </p>
            <a
              href="https://wa.me/237679188336"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-colors"
            >
              <UIcon
                :name="IconWhatsApp"
                class="w-4 h-4 text-emerald-400"
              />
              WhatsApp Direct : +237 679 188 336
            </a>
          </div>
        </div>

        <!-- Right Side: The Form -->
        <div class="lg:col-span-7">
          <!-- Success State -->
          <div
            v-if="isSubmitted"
            class="glass-panel-d rounded-2xl p-8 sm:p-10 border border-emerald-500/40 text-center space-y-6 backdrop-blur-xl animate-fade-in"
          >
            <div
              class="h-16 w-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-400"
            >
              <UIcon name="i-lucide-check-circle" class="w-8 h-8" />
            </div>

            <div class="space-y-2">
              <h3 class="text-2xl font-bold text-white">
                {{ t('quoteForm.successTitle') }}
              </h3>
              <p
                class="text-sm text-sand-50/80 max-w-md mx-auto leading-relaxed"
              >
                {{ name || t('quoteForm.dearClient') }}. {{ t('quoteForm.successDescription') }}
              </p>
            </div>

            <div
              class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
            >
              <UButton
                color="primary"
                class="bg-rust-600 hover:bg-rust-500 text-white font-semibold px-6 py-2.5"
                @click="resetQuoteForm"
              >
                {{ t('quoteForm.anotherRequest') }}
              </UButton>
              <a
                href="https://wa.me/237679188336"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition-colors"
              >
                <UIcon :name="IconWhatsApp" class="w-4 h-4" />
                {{ t('quoteForm.accelerateWhatsapp') }}
              </a>
            </div>
          </div>

          <!-- Form State -->
          <div
            v-else
            class="glass-panel rounded-2xl p-6 sm:p-8 border border-gold-400/30 backdrop-blur-xl"
          >
            <form @submit.prevent="submitQuote" class="space-y-4">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  v-model="name"
                  name="name"
                  icon="i-tabler-user"
                  :label="t('quoteForm.name')"
                  type="text"
                  :placeholder="t('quoteForm.namePlaceholder')"
                  label-class="text-sm font-semibold text-white"
                  :error="formErrors.name"
                />
                <Input
                  v-model="email"
                  name="email"
                  icon="i-tabler-mail"
                  :label="t('auth.email')"
                  type="email"
                  :placeholder="t('quoteForm.emailPlaceholder')"
                  label-class="text-sm font-semibold text-white"
                  :error="formErrors.email"
                />
                <Input
                  v-model="phone"
                  name="phone"
                  icon="i-tabler-phone"
                  :label="t('auth.phone')"
                  type="tel"
                  :placeholder="t('quoteForm.phonePlaceholder')"
                  label-class="text-sm font-semibold text-white"
                  :error="formErrors.phone"
                />
                <Combobox
                  v-model="residenceCountry"
                  url="https://countries.dev/name"
                  option-value="name"
                  option-label="name"
                  icon="i-tabler-map-pin"
                  name="residence_country"
                  :label="t('quoteForm.residenceCountry')"
                  :placeholder="t('quoteForm.residencePlaceholder')"
                  label-class="text-sm font-semibold text-white"
                  :error="formErrors.residence_country"
                />
              </div>
              <Select
                v-model="service_slug"
                name="service"
                :label="t('quoteForm.service')"
                :placeholder="t('quoteForm.servicePlaceholder')"
                label-class="text-sm font-semibold text-white"
                :options="serviceOptions"
                :error="formErrors.service_slug"
              />

              <!-- Urgency radio tags -->
              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-sand-50"
                  >{{ t('quoteForm.deadline') }}</label
                >
                <div class="grid grid-cols-3 gap-2">
                  <button
                    v-for="urg in urgencyOptions"
                    :key="urg.value"
                    type="button"
                    class="py-2 px-2 text-xs font-medium rounded border text-center transition-all duration-200"
                    :class="
                      urgency === urg.value
                        ? 'bg-rust-600 text-white border-rust-500 shadow-md'
                        : 'bg-white/5 text-sand-50/80 border-white/10 hover:bg-white/10'
                    "
                    @click="urgency = urg.value"
                  >
                    {{ urg.label }}
                  </button>
                </div>
                <p
                  v-if="formErrors.urgency"
                  class="text-xs font-medium text-rose-300"
                  role="alert"
                >
                  {{ formErrors.urgency }}
                </p>
              </div>

              <Textarea
                v-model="description"
                name="details"
                :label="t('quoteForm.details')"
                :placeholder="t('quoteForm.detailsPlaceholder')"
                label-class="text-sm font-semibold text-white"
                :error="formErrors.details"
              />

              <!-- Submit Button -->
              <div class="pt-2">
                <Button
                  type="submit"
                  :loading="isSubmitting"
                  variant="primary"
                  w="full"
                  icon="i-lucide-send"
                  :label="t('quoteForm.send')"
                />
              </div>

              <p class="text-center text-[11px] text-sand-50/60 pt-1">
                {{ t('quoteForm.privacy') }}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { servicesType } from "~/types/types";
import { quoteSchema } from "~/schemas/forms.schema";
import Textarea from "~/components/textarea/Textarea.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import Button from "../buttons/Button.vue";
import Input from "~/components/input/Input.vue";
import Combobox from "../combobox/Combobox.vue";
import Select from "../select/Select.vue";
import { IconWhatsApp } from "../svg/svg.js";

const props = defineProps<{
  services?: servicesType[];
}>();
const { t } = useI18n();
const authStore = useAuthStore();

const toast = useToast();
const route = useRoute();
const serviceStore = useServiceStore();

const serviceOptions = computed(() =>
  serviceStore.services
    .filter((service: servicesType) => service.is_active !== false)
    .map((service: servicesType) => ({
      label: service.title,
      value: service.slug,
    })),
);

const urgencyOptions = computed(() => [
  { label: t("quoteForm.normal"), value: "normal" },
  { label: t("quoteForm.urgent"), value: "urgent" },
  { label: t("quoteForm.veryUrgent"), value: "tres_urgent" },
]);

const {
  defineField,
  errors: formErrors,
  handleSubmit,
  resetForm: veeResetForm,
} = useForm({
  validationSchema: toTypedSchema(quoteSchema),
  initialValues: {
    name: "",
    email: "",
    phone: "",
    residence_country: "",
    service_slug: serviceOptions.value[0]?.value,
    urgency: "normal",
    details: "",
  },
});

const [name] = defineField("name");
const [email] = defineField("email");
const [phone] = defineField("phone");
const [residenceCountry] = defineField("residence_country");
const [service_slug] = defineField("service_slug");
const [urgency] = defineField("urgency");
const [description] = defineField("details");
const isSubmitting = ref(false);
const isSubmitted = ref(false);

const prefillFromUser = (user: any) => {
  if (!user) return;
  if (!name.value && user.full_name) name.value = user.full_name;
  if (!email.value && user.email) email.value = user.email;
  if (!phone.value && user.phone) phone.value = user.phone;
  if (!residenceCountry.value && user.country) residenceCountry.value = user.country;
};

watch(() => authStore.user, prefillFromUser, { immediate: true });

watch(
  serviceOptions,
  (options) => {
    if (!service_slug.value && options.length) {
      const requestedService = route.query.service;
      const selected = typeof requestedService === "string"
        ? options.find((service) => service.value === requestedService || service.value.includes(requestedService))
        : undefined;
      service_slug.value = selected?.value ?? options[0]?.value;
    }
  },
  { immediate: true },
);

onMounted(() => {
  if (!serviceStore.services.length) {
    serviceStore.fetchServices();
  }
  if (route.query.service && typeof route.query.service === "string") {
    const match = serviceOptions.value.find(
      (s) =>
        s.value === route.query.service ||
        s.value.includes(route.query.service as string),
    );
    if (match) {
      service_slug.value = match.value;
    }
  }
});

const submitQuote = handleSubmit(async (values) => {
  isSubmitting.value = true;

  // Simulate API transmission
  setTimeout(() => {
    isSubmitting.value = false;
    isSubmitted.value = true;
    toast.add({
      title: t('quoteForm.sentToast'),
      color: "success",
      description: t('quoteForm.sentDescription'),
    });
  }, 1200);
});

const resetQuoteForm = () => {
  veeResetForm();
  isSubmitted.value = false;
};
</script>
