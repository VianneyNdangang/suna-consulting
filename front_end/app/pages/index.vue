<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { testimonialsType, faqType, servicesType, site_contentType } from '~/types/types';
import HeroSection from '~/components/heroSection/HeroSection.vue';
import WhyChooseUs from '~/components/whyChooseUs/WhyChooseUs.vue';
import TestimonialSection from '~/components/testimonial/TestimonialSection.vue';
import CallToAction from '~/components/callToAction/CallToAction.vue';
import FAQSection from '~/components/faqSection/FAQSection.vue';
import DataSkeleton from '~/components/loading/DataSkeleton.vue';
import ServiceList from '~/components/serviceListe/ServiceList.vue';
import QuoteForm from '~/components/forms/QuoteForm.vue';

// SEO & Meta
useHead({
  title: 'Súna Consulting | Votre représentant de confiance au Cameroun',
  meta: [
    {
      name: 'description',
      content: 'Súna Consulting accompagne la diaspora au Cameroun : démarches administratives, vérification foncière au cadastre, suivi de chantiers et gestion de projets avec rigueur et transparence.',
    },
    { property: 'og:title', content: 'Súna Consulting | Votre représentant de confiance au Cameroun' },
    {
      property: 'og:description',
      content: 'Pilotez vos démarches administratives, vérifications foncières et projets au Cameroun en toute sérénité depuis l’étranger.',
    },
    { property: 'og:url', content: 'https://sunaconsulting.com/' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://sunaconsulting.com/logo_primary.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Súna Consulting | Votre représentant de confiance au Cameroun' },
    {
      name: 'twitter:description',
      content: 'Pilotez vos démarches, foncier et chantiers au Cameroun depuis l’étranger avec des rapports photos/vidéos en direct.',
    },
    { name: 'twitter:image', content: 'https://sunaconsulting.com/logo_primary.png' },
  ],
  link: [
    { rel: 'canonical', href: 'https://sunaconsulting.com/' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'LocalBusiness',
            '@id': 'https://sunaconsulting.com/#organization',
            'name': 'Súna Consulting',
            'url': 'https://sunaconsulting.com',
            'logo': 'https://sunaconsulting.com/logo_primary.png',
            'image': 'https://sunaconsulting.com/logo_primary.png',
            'description': 'Représentation et accompagnement opérationnel de la diaspora au Cameroun pour démarches administratives, vérifications foncières et suivi de chantiers.',
            'telephone': '+237679188336',
            'email': 'sunaconsulting@gmail.com',
            'priceRange': '$$',
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': 'Yaoundé',
              'addressRegion': 'Centre',
              'addressCountry': 'CM'
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 3.8480,
              'longitude': 11.5021
            },
            'areaServed': ['Cameroun', 'France', 'Canada', 'États-Unis', 'Belgique', 'Royaume-Uni', 'Allemagne'],
            'sameAs': [
              'https://facebook.com/sunaconsulting',
              'https://instagram.com/sunaconsulting'
            ]
          },
          {
            '@type': 'FAQPage',
            '@id': 'https://sunaconsulting.com/#faq',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': 'Comment s’effectuent les paiements depuis l’étranger ?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Nous acceptons les règlements sécurisés par virement bancaire international, carte bancaire ou Mobile Money certifié avec reçu horodaté.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Comment puis-je suivre l’avancement de ma mission en direct ?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Un canal de communication direct est mis en place avec votre chargé de mission pour recevoir des photos et vidéos horodatées ainsi que des rapports d’étape réguliers.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Comment sécurisez-vous une transaction foncière ou immobilière ?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Nous réalisons une réquisition au cadastre, vérifions l’authenticité du titre foncier, rencontrons les autorités locales et effectuons une visite géolocalisée sur place.'
                }
              }
            ]
          }
        ]
      })
    }
  ]
});

// Stores
const faqStore = useFaqStore();
const siteContentStore = usesite_contentStore();
const serviceStore = useServiceStore();
const testimonialStore = useTestimonialstore();

// State
const faqs = ref<faqType[]>([]);
const { site_content } = storeToRefs(siteContentStore);
const {testimonials} = storeToRefs(testimonialStore);
const isDataLoaded = ref(false);
const services = computed(() => {
  const datas = [] as servicesType[];
  if (serviceStore.services && serviceStore.services.length > 0) {
    serviceStore.services.forEach((service: any) => {
      if (service.is_active) {
        datas.push(service);
      }
    });
  }
  return datas;
})

onMounted(async () => {
  try {
    await Promise.allSettled([
      faqStore.fetchfaq(),
      testimonialStore.fetchTestimonials(),
    ]);
  } catch (e) {
    // Defaults take over seamlessly without breaking the UI
  } finally {
    isDataLoaded.value = true;
  }
});
</script>

<template>
  <div class="relative overflow-hidden selection:bg-rust-600 selection:text-white">
    
    <!-- Hero Section -->
    <HeroSection
      eyebrow="Súna Consulting • Partenaire Diaspora"
      :title="site_content?.hero_title"
      :subtitle="site_content?.hero_subtitle"
      :stats="site_content?.stats"
    />

    <!-- Services Showcase -->
    <ServiceList :services="services" :loading="serviceStore.loading" />

    <Carrousel/>
    <div v-if="!isDataLoaded" class="space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <DataSkeleton :count="6" />
      <DataSkeleton variant="list" :count="4" />
      <DataSkeleton variant="list" :count="4" />
    </div>
    <template v-else>
      <WhyChooseUs :points="site_content?.why_choose_us" />

      <TestimonialSection :testimonials="testimonials" />

      <!-- FAQ Accordion -->
      <FAQSection :items="faqs" />
    </template>

    <!-- Call to Action Banner -->
    <CallToAction />

    <!-- Quote Estimator Form -->
    <QuoteForm :services="services" />

  </div>
</template>
