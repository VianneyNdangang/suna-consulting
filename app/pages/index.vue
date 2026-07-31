<script setup lang="ts">
// import BackgroundAnimatio from '~/components/organisms/BackgroundAnimatio.vue';
import { useToastStore } from "~/stores/toastStore";
import { type testimonialsType, type faqType, type servicesType, type site_contentType } from "~/types/types";
import Login from "~/components/login/Login.vue";
import Button from "~/components/buttons/Button.vue";
import HeroSection from "~/components/heroSection/HeroSection.vue";
import ServiceList from "~/components/serviceListe/ServiceList.vue";
import WhyChooseUs from "~/components/whyChooseUs/WhyChooseUs.vue";
import TestimonialSection from "~/components/testimonial/TestimonialSection.vue";
import CallToAction from "~/components/callToAction/CallToAction.vue";
import FAQSection from "~/components/faqSection/FAQSection.vue";
import QuoteForm from "~/components/quoteForm/QuoteForm.vue";

// const services = [
//   {
//     slug: "assistance-administrative",
//     title: "Assistance administrative",
//     short_description:
//       "Démarches, dépôts de documents et suivi de dossiers pour gagner du temps depuis l’étranger.",
//     icon: "🧾",
//   },
//   {
//     slug: "accompagnement-immobilier-foncier",
//     title: "Accompagnement immobilier et foncier",
//     short_description:
//       "Vérification de parcelles, suivi de transactions et conseils pour sécuriser vos projets.",
//     icon: "🏠",
//   },
//   {
//     slug: "gestion-de-projets",
//     title: "Gestion de projets",
//     short_description:
//       "Organisation de missions, reporting régulier et coordination avec les parties prenantes.",
//     icon: "📈",
//   },
//   {
//     slug: "assistance-administrative",
//     title: "Assistance administrative",
//     short_description:
//       "Démarches, dépôts de documents et suivi de dossiers pour gagner du temps depuis l’étranger.",
//     icon: "🧾",
//   },
//   {
//     slug: "accompagnement-immobilier-foncier",
//     title: "Accompagnement immobilier et foncier",
//     short_description:
//       "Vérification de parcelles, suivi de transactions et conseils pour sécuriser vos projets.",
//     icon: "🏠",
//   },
//   {
//     slug: "gestion-de-projets",
//     title: "Gestion de projets",
//     short_description:
//       "Organisation de missions, reporting régulier et coordination avec les parties prenantes.",
//     icon: "📈",
//   },
// ];

// const testimonials = [
//   {
//     author_name: "Carine N.",
//     author_location: "Toronto, Canada",
//     content:
//       "Súna a géré la rénovation de la maison de mes parents sans que j’aie à me déplacer.",
//     rating: 5,
//   },
//   {
//     author_name: "Jean M.",
//     author_location: "Montréal, Canada",
//     content: "Le suivi a été transparent et très rassurant, même à distance.",
//     rating: 5,
//   },
//   {
//     author_name: "Aïcha B.",
//     author_location: "Douala, Cameroun",
//     content:
//       "Une équipe à l’écoute qui transforme les démarches les plus complexes en étapes simples.",
//     rating: 5,
//   },
// ];

const whyChooseUsPoints = [
  "Professionnalisme et discrétion dans chaque mission.",
  "Communication régulière et comptes rendus détaillés.",
  "Un accompagnement local et international adapté à votre contexte.",
  "Des solutions pratiques pour agir vite depuis l’étranger.",
];

// Stores
const faqStore = useFaqStore();
const siteContentStore = usesite_contentStore();
const serviceStore = useServiceStore();
const testimonialStore = useTestimonialstore();

// datas
const faqs = ref<faqType[]>([]);
const siteContent = ref<site_contentType | any>();
const services = ref<servicesType[]>([]);
const testimonials = ref<testimonialsType[]>([])

// Fetching datas 
onMounted(async () => {
  await faqStore.fetchfaq();
  await siteContentStore.fetchsite_content();
  await serviceStore.fetchServices();
  await testimonialStore.fetchTestimonials();

  faqs.value = faqStore.faq;
  siteContent.value = siteContentStore.site_content;
  services.value = serviceStore.services;
  testimonials.value = testimonialStore.Testimonials;
})

</script>

<template>
  <div>
    <HeroSection
      eyebrow="Súna Consulting"
      :title="siteContent?.hero_title"
      :subtitle="siteContent?.hero_subtitle"
      :stats="siteContent?.stats"
    />

    <ServiceList :services="services" />
    <WhyChooseUs :points="siteContent?.why_choose_us" />
    <TestimonialSection :testimonials="testimonials" />
    <CallToAction />
    <FAQSection :items="faqs" />

    <QuoteForm />
    <Login />
  </div>
</template>
