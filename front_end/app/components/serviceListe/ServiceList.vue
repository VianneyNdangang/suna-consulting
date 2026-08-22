<script setup lang="ts">
import { ref, computed } from 'vue';
import Card from '../card/Card.vue';
import type { servicesType } from '~/types/types';

export interface ServiceItem {
  id?: string;
  slug: string;
  title: string;
  short_description: string;
  icon: string;
  image_url?: string;
}

const props = defineProps<{
  services?: ServiceItem[];
}>();

const emit = defineEmits<{
  (e: 'selectService', item: ServiceItem): void;
}>();

// Default mock services for instant rendering & fallback
const defaultServices: ServiceItem[] = [
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

const selectedCategory = ref('all');

const categories = [
  { id: 'all', label: 'Tous nos services', icon: 'i-lucide-grid' },
  { id: 'admin', label: 'Administratif & Légal', icon: 'i-lucide-file-text' },
  { id: 'immo', label: 'Immobilier & Terrains', icon: 'i-lucide-home' },
  { id: 'projets', label: 'Projets & Famille', icon: 'i-lucide-heart-handshake' },
];

const allServices = computed(() => {
  if (props.services && props.services.length > 0) {
    return props.services;
  }
  return defaultServices;
});

const filteredServices = computed(() => {
  if (selectedCategory.value === 'all') return allServices.value;
  if (selectedCategory.value === 'admin') {
    return allServices.value.filter(s =>
      s.slug.includes('admin') || s.title.toLowerCase().includes('administr') || s.title.toLowerCase().includes('facture')
    );
  }
  if (selectedCategory.value === 'immo') {
    return allServices.value.filter(s =>
      s.slug.includes('immo') || s.slug.includes('foncier') || s.title.toLowerCase().includes('terrain') || s.title.toLowerCase().includes('chantier') || s.title.toLowerCase().includes('bien')
    );
  }
  if (selectedCategory.value === 'projets') {
    return allServices.value.filter(s =>
      !s.slug.includes('admin') && !s.slug.includes('immo') && !s.slug.includes('foncier')
    );
  }
  return allServices.value;
});
</script>

<template>
  <section id="services" class="py-16 md:py-24 bg-linear-to-b from-sand-25 via-sand-50/60 to-sand-25">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <UBadge
          color="primary"
          variant="subtle"
          size="md"
          class="bg-rust-100 text-rust-800 border border-rust-200 px-3.5 py-1 rounded-full font-medium text-xs tracking-wider uppercase"
        >
          <UIcon name="i-lucide-briefcase" class="w-3.5 h-3.5 mr-1" />
          Nos Domaines d'Expertise
        </UBadge>

        <h2 class="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
          Des accompagnements pensés pour des <span class="text-rust-600">décisions plus sûres</span>
        </h2>

        <p class="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Chaque mission combine rigueur administrative, présence locale vérifiée à Yaoundé et Douala, et un accompagnement humain sur-mesure pour vous simplifier la vie à distance.
        </p>

        <!-- Category Filters -->
        <div class="pt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200"
            :class="
              selectedCategory === cat.id
                ? 'bg-rust-600 text-white shadow-md shadow-rust-600/20'
                : 'bg-white text-slate-700 hover:text-rust-900 hover:bg-gold-400/10 border border-gold-400/20 shadow-sm'
            "
            @click="selectedCategory = cat.id"
          >
            <UIcon :name="cat.icon" class="w-4 h-4" />
            {{ cat.label }}
          </button>
        </div>
      </div>

      <!-- Services Grid -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <Card
          v-for="service in filteredServices"
          :key="service.id || service.title"
          :item="service"
          @select-service="(item) => emit('selectService', item)"
        />
      </div>

      <!-- Bottom Banner for custom request -->
      <div class="mt-14 rounded-2xl bg-linear-to-r from-ink-900 via-rust-950 to-ink-900 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-gold-400/30">
        <div class="space-y-1 text-center sm:text-left">
          <div class="flex items-center justify-center sm:justify-start gap-2 text-gold-300 text-xs font-bold uppercase tracking-wider">
            <UIcon name="i-lucide-sparkles" class="w-4 h-4" />
            Besoin d’une intervention particulière ?
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-white">
            Nous concevons des solutions sur-mesure adaptées à votre situation.
          </h3>
          <p class="text-xs sm:text-sm text-sand-50/80">
            Expliquez-nous votre contexte et nous vous proposerons une formule adaptée.
          </p>
        </div>

        <div class="flex shrink-0 items-center gap-3">
          <UButton
            to="/quote"
            size="md"
            color="primary"
            class="bg-rust-600 hover:bg-rust-500 text-white font-semibold px-5 py-2.5 shadow-md"
            icon="i-lucide-calculator"
          >
            Devis personnalisé
          </UButton>
          <a
            href="https://wa.me/237679188336"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 rounded-lg hover:bg-emerald-900/60 transition-colors"
          >
            <UIcon name="i-lucide-message-circle" class="w-4 h-4 text-emerald-400" />
            WhatsApp
          </a>
        </div>
      </div>

    </div>
  </section>
</template>
