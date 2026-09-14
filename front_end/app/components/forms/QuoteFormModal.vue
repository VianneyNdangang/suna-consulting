<template>
  <UModal
    :open="props.modelValue"
    :description="service?.description"
    :ui="{ content: 'sm:max-w-2xl' }"
    @update:open="(val: boolean) => emit('update:modelValue', val)"
  >
    <!-- Header -->
    <template #title>
      <div class="flex items-start gap-3">
        <div
          class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-rust-600/10 text-rust-600"
        >
          <UIcon name="i-tabler-file-invoice" class="size-5" />
        </div>

        <div class="min-w-0">
          <h2 class="text-base font-bold text-rust-600 sm:text-lg">
            Demander un devis
          </h2>

          <p class="mt-0.5 text-md text-rust-500">
            {{ service?.title }}
          </p>
        </div>
      </div>
    </template>

    <template #body>
      <form @submit.prevent="submitQuote" class="flex flex-col gap-5">
        <!-- Introduction -->
        <UAlert
          color="info"
          variant="subtle"
          description="Remplissez les informations ci-dessous afin que notre équipe
              puisse comprendre votre besoin et vous proposer une offre
              adaptée."
          icon="i-tabler-info-circle"
        />

        <!-- Coordonnées -->
        <section class="space-y-3">
          <div>
            <div class="flex items-center gap-2">
              <UIcon name="i-tabler-user" class="size-4 text-rust-600" />

              <h3 class="text-sm font-semibold text-rust-600">
                Vos coordonnées
              </h3>
            </div>

            <p class="mt-1 text-xs text-rust-500">
              Ces informations nous permettront de vous contacter.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              v-model="name"
              name="name"
              icon="i-tabler-user"
              label="Nom complet"
              type="text"
              placeholder="Ex. Paul Biya"
              :error="formErrors.name"
            />

            <Input
              v-model="email"
              name="email"
              icon="i-tabler-mail"
              label="Adresse email"
              type="email"
              placeholder="vous@exemple.com"
              :error="formErrors.email"
            />

            <Input
              v-model="phone"
              name="phone"
              icon="i-tabler-phone"
              label="Téléphone / WhatsApp"
              type="tel"
              placeholder="+237 6XX XXX XXX"
              :error="formErrors.phone"
            />

            <Combobox
              v-model="residenceCountry"
              url="https://countries.dev/name"
              option-value="name"
              option-label="name"
              icon="i-tabler-map-pin"
              name="residence_country"
              label="Pays de résidence"
              placeholder="Sélectionnez votre pays"
              :error="formErrors.residence_country"
            />
          </div>
        </section>

        <!-- Délai -->
        <section class="space-y-3">
          <div>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-tabler-calendar-time"
                class="size-4 text-rust-600"
              />

              <h3 class="text-sm font-semibold text-rust-600">
                Quand souhaitez-vous démarrer ?
              </h3>
            </div>

            <p class="mt-1 text-xs text-rust-500">
              Choisissez le délai qui correspond le mieux à votre besoin.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <button
              v-for="urg in urgencyOptions"
              :key="urg.value"
              type="button"
              class="group rounded-lg border px-3 py-3 text-left transition-all duration-200"
              :class="
                urgency === urg.value
                  ? 'border-rust-600 bg-rust-600 text-slate-100 ring-1 ring-rust-600/30'
                  : 'border-slate-300 bg-slate-100 hover:border-rust-600/50 hover:bg-rust-600/5'
              "
              @click="urgency = urg.value"
            >
              <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2">
                  <div
                    class="flex size-7 items-center justify-center rounded-md"
                    :class="
                      urgency === urg.value
                        ? 'bg-rust-400 text-white'
                        : 'bg-rust-600/10 text-rust-600 group-hover:text-rust-600'
                    "
                  >
                    <UIcon
                      :name="
                        urg.value === 'normal'
                          ? 'i-tabler-calendar'
                          : urg.value === 'urgent'
                            ? 'i-tabler-clock'
                            : 'i-tabler-bolt'
                      "
                      class="size-4"
                    />
                  </div>

                  <span
                    class="text-xs font-semibold"
                    :class="
                      urgency === urg.value
                        ? 'text-slate-100'
                        : 'text-rust-500 group-hover:text-rust-600'
                    "
                  >
                    {{ urg.label }}
                  </span>
                </div>

                <UIcon
                  v-if="urgency === urg.value"
                  name="i-tabler-circle-check-filled"
                  class="size-4 shrink-0"
                />
              </div>
            </button>
          </div>

          <p
            v-if="formErrors.urgency"
            class="text-xs font-medium text-rose-500"
            role="alert"
          >
            {{ formErrors.urgency }}
          </p>
        </section>

        <!-- Besoin -->
        <section class="space-y-3">
          <div>
            <div class="flex items-center gap-2">
              <UIcon name="i-tabler-message-2" class="size-4 text-rust-600" />

              <h3 class="text-sm font-semibold text-rust-600">Votre besoin</h3>
            </div>

            <p class="mt-1 text-xs text-rust-500">
              Plus votre demande est précise, mieux nous pourrons vous
              accompagner.
            </p>
          </div>

          <Textarea
            v-model="description"
            name="details"
            label="Décrivez votre projet"
            placeholder="Expliquez votre besoin, les objectifs, la localisation, les contraintes ou toute autre information utile..."
            :error="formErrors.details"
          />
        </section>
        <USeparator />
        <!-- Action -->
        <div class="space-y-3 pt-3">
          <Button
            type="submit"
            :loading="loading"
            variant="primary"
            w="full"
            icon="i-tabler-send"
            label="Envoyer ma demande"
          />

          <div class="flex items-center justify-center gap-1.5 text-center">
            <UIcon name="i-tabler-shield-check" class="size-3.5" />

            <p class="text-[11px] text-slate-500">
              Vos informations restent confidentielles.
            </p>
          </div>
        </div>
      </form>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { quoteSchema } from "~/schemas/forms.schema";
import Button from "../buttons/Button.vue";
import Combobox from "../combobox/Combobox.vue";
import Input from "../input/Input.vue";
import Textarea from "../textarea/Textarea.vue";

const props = defineProps<{
  service?: any;
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

const urgencyOptions = [
  { label: "Normal (1-2 semaines)", value: "normal" },
  { label: "Urgent (dans la semaine)", value: "urgent" },
  { label: "Très urgent (48h-72h)", value: "tres_urgent" },
];

const toast = useToast();
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
    service_slug: props.service.slug,
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
const loading = ref(false);
const isSubmitted = ref(false);
const store = usequotestore();
const submitQuote = handleSubmit(async (values) => {
  loading.value = true;
  console.log("valuesvalues", values);
  try {
    await store.createquotes(values);
    toast.add({
      title: `Demande de devis pour le service ${props.service.title} transmise !`,
      description:
        "Votre dossier a été enregistré. Un conseiller Súna vous contactera sous 24h.",
      color: "success",
      icon: `i-tabler-check`,
    });
  } catch (error) {
    toast.add({
      title: `Demande de devis pour le service ${props.service.title} transmise !`,
      description: "",
      color: "error",
      icon: `i-tabler-x`,
    });
    console.error(error);
  } finally {
    loading.value = false;
  }
});

const resetQuoteForm = () => {
  veeResetForm();
  isSubmitted.value = false;
};
</script>
