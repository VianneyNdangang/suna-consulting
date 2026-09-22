<template>
  <div class="min-h-screen bg-(--background) text-(--text-primary)">
    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div v-if="loading && !service" class="space-y-6">
        <USkeleton class="h-10 w-40 rounded-md" />
        <USkeleton class="h-20 w-full max-w-3xl rounded-md" />
        <USkeleton class="h-60 w-full rounded-md" />
      </div>

      <div
        v-else-if="!service"
        class="rounded-md border border-dashed border-(--border) bg-(--card) px-6 py-16 text-center"
      >
        <div
          class="mx-auto flex size-14 items-center justify-center rounded-md bg-(--muted) text-(--secondary)"
        >
          <UIcon name="i-lucide-search-x" class="size-7" />
        </div>
        <h1 class="mt-5 text-2xl font-black text-(--text-primary)">
          Service introuvable
        </h1>
        <p class="mx-auto mt-2 max-w-md text-sm text-(--text-secondary)">
          Ce service n'est plus disponible ou le lien a expiré.
        </p>
        <Button
          to="/services"
          type="button"
          class="mt-6"
          variant="primary"
          icon="i-lucide-arrow-left"
          label="Retour aux services"
        />
      </div>

      <template v-else>
        <NuxtLink
          to="/services"
          class="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-rust-700"
        >
          <UIcon name="i-lucide-arrow-left" class="size-4" /> Tous les services
        </NuxtLink>

        <section
          class="relative mt-6 overflow-hidden rounded-md border border-(--border) bg-(--surface) px-6 py-8 shadow-sm sm:px-10 sm:py-12 lg:px-14"
        >
          <div
            class="relative grid items-center gap-10 lg:grid-cols-[1fr_18rem]"
          >
            <div class="max-w-3xl">
              <div
                class="flex size-14 items-center justify-center rounded-md border border-(--border) bg-(--muted) text-(--secondary)"
              >
                <UIcon :name="getIcon(service.icon)" class="size-7" />
              </div>
              <p
                class="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-(--secondary)"
              >
                Service d'accompagnement
              </p>
              <h1
                class="mt-3 text-3xl font-black tracking-tight text-(--text-primary) sm:text-5xl"
              >
                {{ service.title }}
              </h1>
              <p
                class="mt-5 text-base leading-relaxed text-(--text-secondary) sm:text-lg"
              >
                {{ service.description }}
              </p>
              <div class="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="primary"
                  type="button"
                  icon="i-lucide-calculator"
                  @click="isQuoteOpen = true"
                  label="Demander un devis"
                />
                <a
                  href="https://wa.me/237679188336"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-white text-emerald-600 hover:bg-emerald-600/10 rounded shadow-sm transition-colors"
                >
                  <UIcon :name="IconWhatsApp" class="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
            <div
              class="hidden rounded-md border border-(--border) bg-(--card) p-5 lg:block"
            >
              <p
                class="text-xs font-bold uppercase tracking-wider text-(--secondary)"
              >
                Ce que vous gagnez
              </p>
              <ul class="mt-4 space-y-4 text-sm text-(--text-secondary)">
                <li class="flex gap-3">
                  <UIcon
                    name="i-lucide-check-circle-2"
                    class="mt-0.5 size-4 shrink-0 text-(--success)"
                  />
                  Une présence locale fiable
                </li>
                <li class="flex gap-3">
                  <UIcon
                    name="i-lucide-check-circle-2"
                    class="mt-0.5 size-4 shrink-0 text-(--success)"
                  />
                  Des informations vérifiées
                </li>
                <li class="flex gap-3">
                  <UIcon
                    name="i-lucide-check-circle-2"
                    class="mt-0.5 size-4 shrink-0 text-(--success)"
                  />
                  Un suivi sans surprise
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section class="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p
              class="text-xs font-bold uppercase tracking-wider text-(--secondary)"
            >
              Notre méthode
            </p>
            <h2
              class="mt-2 text-2xl font-black text-(--text-primary) sm:text-3xl"
            >
              Une mission claire, du premier échange au compte-rendu
            </h2>
            <div class="mt-6 space-y-3">
              <div
                v-for="step in steps"
                :key="step.number"
                class="flex gap-4 rounded-md border border-(--border) bg-(--card) p-5 shadow-sm"
              >
                <span
                  class="flex size-10 shrink-0 items-center justify-center rounded-md bg-(--muted) text-sm font-black text-(--secondary)"
                  >{{ step.number }}</span
                >
                <div>
                  <h3 class="font-bold text-(--text-primary)">
                    {{ step.title }}
                  </h3>
                  <p
                    class="mt-1 text-sm leading-relaxed text-(--text-secondary)"
                  >
                    {{ step.text }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="rounded border border-(--border) bg-(--card) p-6 shadow-sm sm:p-8"
          >
            <div
              class="flex size-11 items-center justify-center rounded-md bg-(--muted) text-(--success)"
            >
              <UIcon name="i-lucide-shield-check" class="size-6" />
            </div>
            <h2 class="mt-5 text-xl font-black text-(--text-primary)">
              Un accompagnement pensé pour la distance
            </h2>
            <p class="mt-3 text-sm leading-relaxed text-(--text-secondary)">
              Vous gardez la visibilité sur chaque étape pendant que notre
              équipe s'occupe de l'exécution au Cameroun.
            </p>
            <div
              class="mt-6 border-t border-(--border) pt-5 text-sm text-(--text-secondary)"
            >
              <span class="font-bold text-(--text-primary)"
                >Besoin d'un conseil ?</span
              ><br />Réponse sous 24 heures ouvrées.
            </div>
            <NuxtLink
              to="/contact"
              class="mt-5 inline-flex items-center gap-2 text-sm font-bold text-(--secondary) hover:underline"
              >Parler à un conseiller
              <UIcon name="i-lucide-arrow-up-right" class="size-4"
            /></NuxtLink>
          </div>
        </section>
      </template>
    </main>
    <QuoteFormModal v-if="service" v-model="isQuoteOpen" :service="service" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { servicesType } from "~/types/types";
import QuoteFormModal from "~/components/forms/QuoteFormModal.vue";
import Button from "~/components/buttons/Button.vue";
import { IconWhatsApp } from "~/components/svg/svg";

const route = useRoute();
const serviceStore = useServiceStore();
const isQuoteOpen = ref(false);

const service = computed<any>(() =>
  serviceStore.services.find(
    (item: any) =>
      String(item.slug) === String(route.params.slug)
  ),
);

const loading = computed(() => serviceStore.loading);

const getIcon = (iconName?: string) => {
  if (!iconName) return "i-lucide-briefcase-business";
  if (iconName.includes("shield") || iconName.includes("doc"))
    return "i-lucide-file-check-2";
  if (iconName.includes("home") || iconName.includes("building"))
    return "i-lucide-land-plot";
  if (iconName.includes("chart") || iconName.includes("trending"))
    return "i-lucide-line-chart";
  if (iconName.includes("user") || iconName.includes("heart"))
    return "i-lucide-users";
  if (iconName.includes("car") || iconName.includes("hotel"))
    return "i-lucide-key-round";
  return "i-lucide-check-circle-2";
};

const steps = [
  {
    number: "01",
    title: "Cadrage de votre besoin",
    text: "Nous clarifions votre objectif, les contraintes et le résultat attendu.",
  },
  {
    number: "02",
    title: "Intervention sur le terrain",
    text: "Notre équipe locale agit avec un interlocuteur dédié et un suivi précis.",
  },
  {
    number: "03",
    title: "Compte-rendu sécurisé",
    text: "Vous recevez les éléments utiles pour décider et suivre la suite de la mission.",
  },
];

onMounted(() => {
  if (!serviceStore.services.length) serviceStore.fetchServices();
});

useHead(() => ({
  title: service.value
    ? `${service.value.title} | Súna Consulting`
    : "Détail du service | Súna Consulting",
  meta: [
    {
      name: "description",
      content:
        service.value?.description ||
        "Découvrez un service d’accompagnement Súna Consulting au Cameroun.",
    },
  ],
}));
</script>
