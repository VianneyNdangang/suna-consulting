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
            Devis Gratuit & Sans Engagement
          </UBadge>

          <h2
            class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
          >
            Décrivez votre besoin, nous vous répondons
            <span
              class="text-transparent bg-clip-text bg-linear-to-r from-gold-300 to-amber-200"
              >sous 24 heures</span
            >
          </h2>

          <p class="text-base text-sand-50/85 leading-relaxed font-light">
            Ce formulaire permet de recueillir les paramètres essentiels de
            votre mission pour vous transmettre une estimation claire et un
            calendrier d’exécution réaliste.
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
                  Tarification claire et sans frais cachés
                </h4>
                <p class="text-xs text-sand-50/75 mt-0.5">
                  Nos devis détaillent chaque poste de dépense et frais de
                  déplacement.
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
                  Interlocuteur dédié à Yaoundé / Douala
                </h4>
                <p class="text-xs text-sand-50/75 mt-0.5">
                  Un chargé de dossier suit votre projet de A à Z avec
                  comptes-rendus.
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
                  Confidentialité garantie
                </h4>
                <p class="text-xs text-sand-50/75 mt-0.5">
                  Vos informations personnelles et démarches restent strictement
                  protégées.
                </p>
              </div>
            </div>
          </div>

          <!-- Fast contact -->
          <div class="pt-6 border-t border-white/10">
            <p class="text-xs text-sand-50/70 mb-2">
              Vous préférez un échange direct par messagerie ?
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
                Demande reçue avec succès !
              </h3>
              <p
                class="text-sm text-sand-50/80 max-w-md mx-auto leading-relaxed"
              >
                Merci {{ name || "cher client" }}. Votre demande pour
                <strong>{{ service_slug }}</strong> a bien été prise en charge. Un
                conseiller Súna vous recontactera sous 24h ouvrées.
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
                Envoyer une autre demande
              </UButton>
              <a
                href="https://wa.me/237679188336"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition-colors"
              >
                <UIcon :name="IconWhatsApp" class="w-4 h-4" />
                Accélérer sur WhatsApp
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
                  label="Nom complet"
                  type="text"
                  placeholder="ex: Paul Biya / Carine N."
                  label-class="text-sm font-semibold text-white"
                  :error="formErrors.name"
                />
                <Input
                  v-model="email"
                  name="email"
                  icon="i-tabler-mail"
                  label="Adresse email"
                  type="email"
                  placeholder="votre.email@domaine.com"
                  label-class="text-sm font-semibold text-white"
                  :error="formErrors.email"
                />
                <Input
                  v-model="phone"
                  name="phone"
                  icon="i-tabler-phone"
                  label="WhatsApp / Téléphone"
                  type="tel"
                  placeholder="+1 (514) ... ou +33 6 ..."
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
                  label="Pays de résidence"
                  placeholder="ex: Canada, France, USA, Belgique..."
                  label-class="text-sm font-semibold text-white"
                  :error="formErrors.residence_country"
                />
              </div>
              <Select
                v-model="service_slug"
                name="service"
                label="Service ou besoin principal"
                placeholder="Sélectionner un service"
                label-class="text-sm font-semibold text-white"
                :options="
                  serviceOptions
                "
                :error="formErrors.service_slug"
              />

              <!-- Urgency radio tags -->
              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-sand-50"
                  >Délai souhaité pour la mission</label
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
                label="Détails de votre mission"
                placeholder="Indiquez la localisation, l’objectif de la mission et toute contrainte particulière..."
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
                  label="Envoyer ma demande de devis"
                />
              </div>

              <p class="text-center text-[11px] text-sand-50/60 pt-1">
                🔒 Vos données restent strictement confidentielles et ne seront
                jamais partagées avec des tiers.
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
import Select from "~/components/select/Select.vue";
import Textarea from "~/components/textarea/Textarea.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import Button from "../buttons/Button.vue";
import Input from "~/components/input/Input.vue";
import Combobox from "../combobox/Combobox.vue";
import { IconWhatsApp } from "../svg/svg.js";

const props = defineProps<{
  services?: servicesType[];
}>();

const toast = useToast();
const route = useRoute();

const serviceOptions = [
  {
    label: "Démarches administratives & formalités",
    value: "assistance-administrative",
  },
  {
    label: "Vérification foncière & Titre foncier",
    value: "verification-fonciere",
  },
  {
    label: "Suivi de chantier de construction",
    value: "suivi-chantier",
  },
  {
    label: "Achat & livraison de biens pour proches",
    value: "achats-proches",
  },
  {
    label: "Organisation d’événements familiaux (Dot, Mariage)",
    value: "evenements-familiaux",
  },
  {
    label: "Réservation séjours & véhicules",
    value: "logistique-sejours",
    icon: "i-lucide-car",
  },
  {
    label: "Mission personnalisée / Autre besoin",
    value: "sur-mesure",
  },
];

const urgencyOptions = [
  { label: "Normal (1-2 semaines)", value: "normal" },
  { label: "Urgent (dans la semaine)", value: "urgent" },
  { label: "Très urgent (48h-72h)", value: "tres_urgent" },
];

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
    service_slug: serviceOptions[0]?.value,
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
onMounted(() => {
  if (route.query.service && typeof route.query.service === "string") {
    const match = serviceOptions.find(
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
      title: "Demande de devis transmise !",
      color: "success",
      description:  "Votre dossier a été enregistré. Un conseiller Súna vous contactera sous 24h.",
    });
  }, 1200);
});

const resetQuoteForm = () => {
  veeResetForm();
  isSubmitted.value = false;
};
</script>
