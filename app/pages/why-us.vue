<script setup lang="ts">
import WhyChooseUs from '~/components/whyChooseUs/WhyChooseUs.vue';
import CallToAction from '~/components/callToAction/CallToAction.vue';
import { computed, onMounted } from 'vue';
import DataSkeleton from '~/components/loading/DataSkeleton.vue';

useHead({
  title: 'Pourquoi Choisir Súna Consulting | Transparence & Impact Diaspora',
  meta: [
    {
      name: 'description',
      content: 'Découvrez pourquoi la diaspora camerounaise fait confiance à Súna Consulting : transparence avec preuves photos/vidéos, réactivité terrain, et 15% réinvestis au Cameroun.',
    },
    { property: 'og:title', content: 'Pourquoi Choisir Súna Consulting | Transparence & Impact Diaspora' },
    {
      property: 'og:description',
      content: 'Découvrez nos 4 piliers de confiance et notre engagement sociétal au Cameroun.',
    },
    { property: 'og:url', content: 'https://sunaconsulting.com/why-us' },
  ],
  link: [{ rel: 'canonical', href: 'https://sunaconsulting.com/why-us' }],
});

const siteContentStore = usesite_contentStore();
const loading = computed(() => siteContentStore.loading);
const siteContent = computed(() => siteContentStore.site_content);

onMounted(() => {
  if (!siteContentStore.site_content) {
    siteContentStore.fetchsite_content().catch(() => {});
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
          <UIcon name="i-lucide-shield-check" class="w-3.5 h-3.5 mr-1" />
          Nos Engagements de Confiance
        </UBadge>

        <h1 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Pourquoi la diaspora choisit <span class="text-transparent bg-clip-text bg-linear-to-r from-gold-300 to-amber-200">Súna Consulting</span>
        </h1>

        <p class="text-base sm:text-lg text-sand-50/85 font-light leading-relaxed">
          Gérer des projets et des démarches au pays exige des garanties absolues. Découvrez notre méthode de travail éprouvée et nos engagements sur le terrain.
        </p>
      </div>
    </div>

    <!-- Why Choose Us Component -->
    <div v-if="loading" class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <DataSkeleton variant="list" :count="4" />
    </div>
    <WhyChooseUs v-else :points="siteContent?.why_choose_us" />

    <!-- Call to action -->
    <CallToAction />
  </div>
</template>
