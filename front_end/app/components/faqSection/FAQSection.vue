<template>
  <section id="faq" class="py-16 md:py-24 bg-sand-25 relative">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center space-y-4 max-w-2xl mx-auto">
        <UBadge
          color="primary"
          variant="subtle"
          size="md"
          class="bg-rust-100 text-rust-800 border border-rust-200 px-3.5 py-1 rounded-full font-medium text-xs tracking-wider uppercase"
        >
          <UIcon name="i-lucide-help-circle" class="w-3.5 h-3.5 mr-1" />
          {{ t('faq.badge') }}
        </UBadge>

        <h2 class="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
          {{ t('faq.title') }}
        </h2>

        <p class="text-base text-slate-600 leading-relaxed font-normal">
          {{ t('faq.description') }}
        </p>

        <!-- Search Bar -->
        <div class="pt-2 max-w-md mx-auto">
          <Input
            v-model="searchQuery"
            icon="i-lucide-search"
            type="text"
            name="search"
            :placeholder="t('faq.search')"
            
          />
        </div>
      </div>

      <!-- FAQ Accordion with Nuxt UI -->
      <div class="mt-10 space-y-3">
        <UAccordion
          :items="accordionItems"
          size="lg"
          class="space-y-3"
          :ui="{
            item: 'rounded border border-gold-400/25 bg-white shadow-xs overflow-hidden transition-colors hover:border-gold-400/50',
            trigger: 'px-5 py-4 text-left font-bold text-ink-900 hover:text-rust-600 transition-colors flex items-center justify-between text-base',
            body: 'px-5 pb-5 pt-1 text-sm leading-relaxed text-slate-600 border-t border-slate-100/80 bg-sand-25/50',
          }"
        />
      </div>

      <!-- Help contact box -->
      <div class="mt-12 text-center rounded-lg bg-white p-6 border border-gold-400/20 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-left">
          <h4 class="text-base font-bold text-ink-900">
            {{ t('faq.specificQuestion') }}
          </h4>
          <p class="text-xs sm:text-sm text-slate-600 mt-0.5">
            {{ t('faq.answerToday') }}
          </p>
        </div>
        <div class="flex items-center gap-3">
          <UButton
            to="/contact"
            variant="outline"
            color="neutral"
            size="sm"
            icon="i-lucide-mail"
            class=" items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded shadow-sm"
          >
            {{ t('faq.writeUs') }}
          </UButton>
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

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { faqType } from '~/types/types';
import Input from '../input/Input.vue';
import { IconWhatsApp } from '../svg/svg.js';

const props = defineProps<{
  items?: faqType[];
}>();

const { t } = useI18n();

const defaultFaqs = [
  {
    label: 'Comment s’effectuent les paiements depuis l’étranger ?',
    content: 'Nous acceptons les règlements sécurisés par virement bancaire international (RIB européen / nord-américain), carte bancaire ou Mobile Money certifié. Chaque transaction fait l’objet d’une facture et d’un reçu horodaté.',
    icon: 'i-lucide-credit-card',
    category: 'Paiement & Tarifs',
  },
  {
    label: 'Comment puis-je suivre l’avancement de ma mission en direct ?',
    content: 'Dès le lancement, un canal de communication direct (WhatsApp / espace client) est ouvert avec votre chargé de mission. Vous recevez des photos horodatées, des vidéos haute définition et un compte-rendu d’étape régulier.',
    icon: 'i-lucide-smartphone',
    category: 'Suivi & Communication',
  },
  {
    label: 'Intervenez-vous partout au Cameroun ?',
    content: 'Oui ! Si nos bureaux permanents sont situés à Yaoundé et Douala, nous déployons des équipes de confiance sur l’ensemble des 10 régions du Cameroun (Ouest, Sud, Littoral, Centre, Nord...) selon les spécificités de votre demande.',
    icon: 'i-lucide-map-pin',
    category: 'Zone d’intervention',
  },
  {
    label: 'Comment sécurisez-vous une transaction foncière ou immobilière ?',
    content: 'Avant tout achat ou acompte, nous effectuons une réquisition au cadastre et aux services des domaines, vérifions l’authenticité du titre foncier, rencontrons les autorités traditionnelles et réalisons une visite géolocalisée sur place.',
    icon: 'i-lucide-land-plot',
    category: 'Immobilier & Foncier',
  },
  {
    label: 'Quels sont les délais moyens de traitement ?',
    content: 'Le premier cadrage s’effectue sous 24 heures. Pour les démarches administratives courantes, comptez 3 à 7 jours ouvrés. Les missions de suivi de chantier s’inscrivent dans la durée de votre planning de construction.',
    icon: 'i-lucide-clock',
    category: 'Délais & Planning',
  },
  {
    label: 'Quelle est la garantie de confidentialité de mes démarches ?',
    content: 'Toutes nos interventions sont couvertes par une stricte clause de confidentialité. Nous ne divulguons aucune information sur vos acquisitions, vos démarches personnelles ou l’identité de vos proches.',
    icon: 'i-lucide-lock',
    category: 'Confidentialité',
  },
];

const searchQuery = ref('');

const accordionItems = computed(() => {
  let source = defaultFaqs;
  if (props.items && props.items.length > 0) {
    source = props.items.map(item => ({
      label: item.question,
      content: item.answer,
      icon: 'i-lucide-help-circle',
      category: item.category || 'Général',
    }));
  }

  if (!searchQuery.value.trim()) return source;
  const q = searchQuery.value.toLowerCase();
  return source.filter(
    item => item.label.toLowerCase().includes(q) || item.content.toLowerCase().includes(q)
  );
});
</script>