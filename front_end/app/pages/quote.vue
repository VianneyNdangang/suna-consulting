<script setup lang="ts">
import { computed, onMounted } from 'vue';
import FAQSection from '~/components/faqSection/FAQSection.vue';
import DataSkeleton from '~/components/loading/DataSkeleton.vue';
import QuoteForm from '~/components/forms/QuoteForm.vue';

useHead({
  title: 'Demande de Devis Express | Súna Consulting Cameroun',
  meta: [
    {
      name: 'description',
      content: 'Demandez un devis gratuit et personnalisé sous 24h pour vos démarches administratives, vérifications foncières, et suivi de chantiers au Cameroun.',
    },
    { property: 'og:title', content: 'Demande de Devis Express | Súna Consulting Cameroun' },
    {
      property: 'og:description',
      content: 'Estimation claire et réponse garantie sous 24 heures pour vos projets au Cameroun.',
    },
    { property: 'og:url', content: 'https://sunaconsulting.com/quote' },
  ],
  link: [{ rel: 'canonical', href: 'https://sunaconsulting.com/quote' }],
});

const faqStore = useFaqStore();
const loading = computed(() => faqStore.loading);
const faqs = computed(() => faqStore.faq || []);

onMounted(() => {
  if (!faqStore.faq || faqStore.faq.length === 0) {
    faqStore.fetchfaq().catch(() => {});
  }
});
</script>

<template>
  <div class="bg-sand-25">
    <!-- Header banner -->
    <div class="bg-linear-to-b from-ink-950 to-ink-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-gold-400/20 text-center">
      <div class="max-w-3xl mx-auto space-y-4">
        <UBadge
          color="primary"
          variant="subtle"
          size="md"
          class="bg-gold-400/20 text-gold-300 border border-gold-400/40 px-3.5 py-1 rounded-full font-medium text-xs tracking-wider uppercase backdrop-blur-sm"
        >
          <UIcon name="i-lucide-calculator" class="w-3.5 h-3.5 mr-1" />
          Devis Gratuit & Sans Engagement
        </UBadge>

        <h1 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Estimez votre mission au <span class="text-transparent bg-clip-text bg-linear-to-r from-gold-300 to-amber-200">Cameroun</span>
        </h1>

        <p class="text-base sm:text-lg text-sand-50/85 font-light leading-relaxed">
          Remplissez le formulaire ci-dessous et recevez une proposition détaillée avec calendrier d'exécution sous 24h ouvrées.
        </p>
      </div>
    </div>

    <!-- Quote Form Component -->
    <QuoteForm />

    <!-- FAQ Accordion -->
    <div v-if="loading" class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <DataSkeleton variant="list" :count="4" />
    </div>
    <FAQSection v-else :items="faqs" />
  </div>
</template>
