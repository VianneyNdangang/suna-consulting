<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { servicesType } from '~/types/types';
import Card from '~/components/card/Card.vue';

useHead({
  title: 'Nos Services d’Accompagnement au Cameroun | Súna Consulting',
  meta: [
    {
      name: 'description',
      content: 'Découvrez tous nos services pour la diaspora : démarches administratives, vérification foncière au cadastre, suivi de chantier, logistique et conciergerie au Cameroun.',
    },
    { property: 'og:title', content: 'Nos Services d’Accompagnement au Cameroun | Súna Consulting' },
    {
      property: 'og:description',
      content: 'Démarches administratives, vérification foncière, suivi de chantiers et conciergerie au Cameroun pour la diaspora.',
    },
    { property: 'og:url', content: 'https://sunaconsulting.com/services' },
  ],
  link: [{ rel: 'canonical', href: 'https://sunaconsulting.com/services' }],
});

const defaultServices: any[] = [
  {
    id: 'b1',
    slug: 'assistance-administrative',
    title: 'Démarches administratives & formalités',
    short_description: 'Obtention d’actes d’état civil, légalisations, dépôts de dossiers et suivi rigoureux auprès des ministères et administrations au Cameroun.',
    icon: 'shield-doc',
  },
  {
    id: 'b2',
    slug: 'accompagnement-immobilier-foncier',
    title: 'Vérification foncière & suivi de chantiers',
    short_description: 'Contrôle préalable des titres fonciers au cadastre, visite de parcelles avec rapport vidéo et suivi régulier de vos constructions.',
    icon: 'home',
  },
  {
    id: 'b3',
    slug: 'achats-livraisons-proches',
    title: 'Achat & livraison de biens pour vos proches',
    short_description: 'Achat de vivres, matériaux, médicaments ou cadeaux et livraison en mains propres à vos familles à Yaoundé, Douala et environs.',
    icon: 'heart',
  },
  {
    id: 'b4',
    slug: 'logistique-reservations',
    title: 'Réservations de séjours & véhicules',
    short_description: 'Organisation complète de vos séjours au Cameroun : appartements meublés sécurisés, hôtels et location de véhicules avec chauffeur.',
    icon: 'car',
  },
  {
    id: 'b5',
    slug: 'evenements-familiaux',
    title: 'Organisation d’événements familiaux',
    short_description: 'Coordination locale pour vos dots, mariages coutumiers, baptêmes, anniversaires ou obsèques avec respect strict de votre budget.',
    icon: 'users',
  },
  {
    id: 'b6',
    slug: 'sur-mesure',
    title: 'Assistance personnalisée & conciergerie',
    short_description: 'Missions spéciales sur le terrain selon votre cahier des charges avec un interlocuteur dédié et des rapports réguliers.',
    icon: 'trending',
  },
];

const store = useServiceStore();
const loading = computed(() => store.loading);
const services = computed(() => {
  if (store.services && store.services.length > 0) return store.services;
  return defaultServices;
});

onMounted(() => {
  if (!store.services || store.services.length === 0) {
    store.fetchServices().catch(() => {});
  }
});
</script>

<template>
  <div class="bg-sand-25 py-12 md:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Page Header -->
      <div class="max-w-3xl space-y-4">
        <UBadge
          color="primary"
          variant="subtle"
          size="md"
          class="bg-rust-100 text-rust-800 border border-rust-200 px-3.5 py-1 rounded-full font-medium text-xs tracking-wider uppercase"
        >
          <UIcon name="i-lucide-briefcase" class="w-3.5 h-3.5 mr-1" />
          Nos Solutions Complètes
        </UBadge>

        <h1 class="text-3xl sm:text-5xl font-extrabold text-ink-900 tracking-tight leading-tight">
          Des services organisés pour donner de la clarté à <span class="text-rust-600">vos démarches au Cameroun</span>
        </h1>

        <p class="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
          Nous proposons un accompagnement structuré pour aider la diaspora et les entreprises à avancer avec confiance, quel que soit votre lieu de résidence.
        </p>
      </div>

      <!-- Services Grid -->
      <div v-if="loading" class="mt-12">
        <DataSkeleton :count="6" />
      </div>
      <div v-else class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <Card
          v-for="service in services"
          :key="service.id || service.title"
          :item="service"
        />
      </div>

      <!-- Custom CTA Box -->
      <div class="mt-16 rounded-2xl bg-linear-to-r from-ink-950 via-rust-950 to-ink-900 p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-gold-400/30 shadow-xl">
        <div class="space-y-1 text-center md:text-left">
          <h3 class="text-xl font-bold text-white">Vous avez une demande non répertoriée ?</h3>
          <p class="text-sm text-sand-50/80">Notre équipe sur le terrain prend en charge les missions personnalisées.</p>
        </div>
        <div class="flex items-center gap-3">
          <UButton
            to="/#devis"
            size="lg"
            color="primary"
            class="bg-rust-600 hover:bg-rust-500 text-white font-semibold px-6 py-3"
            icon="i-lucide-calculator"
          >
            Demander un devis
          </UButton>
          <a
            href="https://wa.me/237679188336"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
          >
            <UIcon name="i-lucide-message-circle" class="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </div>

    </div>
  </div>
</template>
