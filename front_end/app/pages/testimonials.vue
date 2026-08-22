<script setup lang="ts">
import { computed, onMounted } from 'vue';
import TestimonialSection from '~/components/testimonial/TestimonialSection.vue';
import CallToAction from '~/components/callToAction/CallToAction.vue';

useHead({
  title: 'Témoignages & Avis Clients Diaspora | Súna Consulting',
  meta: [
    {
      name: 'description',
      content: 'Consultez les avis et retours d’expérience de nos clients installés au Canada, en France, aux USA et en Europe sur leurs missions au Cameroun avec Súna Consulting.',
    },
    { property: 'og:title', content: 'Témoignages & Avis Clients Diaspora | Súna Consulting' },
    {
      property: 'og:description',
      content: 'Ce que la diaspora dit de l’expérience Súna Consulting au Cameroun.',
    },
    { property: 'og:url', content: 'https://sunaconsulting.com/testimonials' },
  ],
  link: [{ rel: 'canonical', href: 'https://sunaconsulting.com/testimonials' }],
});

const testimonialStore = useTestimonialstore();
const loading = computed(() => testimonialStore.loading);
const testimonials = computed(() => testimonialStore.Testimonials || []);

onMounted(() => {
  if (!testimonialStore.Testimonials || testimonialStore.Testimonials.length === 0) {
    testimonialStore.fetchTestimonials().catch(() => {});
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
          <UIcon name="i-lucide-star" class="w-3.5 h-3.5 mr-1" />
          Avis Vérifiés Diaspora
        </UBadge>

        <h1 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          La satisfaction de <span class="text-transparent bg-clip-text bg-linear-to-r from-gold-300 to-amber-200">nos clients à distance</span>
        </h1>

        <p class="text-base sm:text-lg text-sand-50/85 font-light leading-relaxed">
          De Toronto à Paris, en passant par Montréal et Dallas, découvrez comment nous accompagnons au quotidien les Camerounais du monde entier.
        </p>
      </div>
    </div>

    <!-- Testimonials List -->
    <div v-if="loading" class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <DataSkeleton variant="cards" :count="3" />
    </div>
    <TestimonialSection v-else :testimonials="testimonials" />

    <!-- CTA -->
    <CallToAction />
  </div>
</template>
