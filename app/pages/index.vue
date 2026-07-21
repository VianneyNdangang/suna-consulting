<script setup lang="ts">
import HeroSection from '~/components/organisms/HeroSection.vue';
import ServiceList from '~/components/organisms/ServiceList.vue';
import TestimonialSection from '~/components/organisms/TestimonialSection.vue';
import WhyChooseUs from '~/components/organisms/WhyChooseUs.vue';
import FAQSection from '~/components/organisms/FAQSection.vue';
import QuoteForm from '~/components/organisms/QuoteForm.vue';
import CallToAction from '~/components/organisms/CallToAction.vue';
import BackgroundAnimatio from '~/components/organisms/BackgroundAnimatio.vue';

const services = [
  {
    slug: 'assistance-administrative',
    title: 'Assistance administrative',
    short_description: 'Démarches, dépôts de documents et suivi de dossiers pour gagner du temps depuis l’étranger.',
    icon: '🧾',
  },
  {
    slug: 'accompagnement-immobilier-foncier',
    title: 'Accompagnement immobilier et foncier',
    short_description: 'Vérification de parcelles, suivi de transactions et conseils pour sécuriser vos projets.',
    icon: '🏠',
  },
  {
    slug: 'gestion-de-projets',
    title: 'Gestion de projets',
    short_description: 'Organisation de missions, reporting régulier et coordination avec les parties prenantes.',
    icon: '📈',
  },
  {
    slug: 'assistance-administrative',
    title: 'Assistance administrative',
    short_description: 'Démarches, dépôts de documents et suivi de dossiers pour gagner du temps depuis l’étranger.',
    icon: '🧾',
  },
  {
    slug: 'accompagnement-immobilier-foncier',
    title: 'Accompagnement immobilier et foncier',
    short_description: 'Vérification de parcelles, suivi de transactions et conseils pour sécuriser vos projets.',
    icon: '🏠',
  },
  {
    slug: 'gestion-de-projets',
    title: 'Gestion de projets',
    short_description: 'Organisation de missions, reporting régulier et coordination avec les parties prenantes.',
    icon: '📈',
  },
];

const testimonials = [
  {
    author_name: 'Carine N.',
    author_location: 'Toronto, Canada',
    content: 'Súna a géré la rénovation de la maison de mes parents sans que j’aie à me déplacer.',
    rating: 5,
  },
  {
    author_name: 'Jean M.',
    author_location: 'Montréal, Canada',
    content: 'Le suivi a été transparent et très rassurant, même à distance.',
    rating: 5,
  },
  {
    author_name: 'Aïcha B.',
    author_location: 'Douala, Cameroun',
    content: 'Une équipe à l’écoute qui transforme les démarches les plus complexes en étapes simples.',
    rating: 5,
  },
];

const whyChooseUsPoints = [
  'Professionnalisme et discrétion dans chaque mission.',
  'Communication régulière et comptes rendus détaillés.',
  'Un accompagnement local et international adapté à votre contexte.',
  'Des solutions pratiques pour agir vite depuis l’étranger.',
];

const faqs = [
  {
    question: 'Comment se déroule un premier échange ?',
    answer: 'Nous commençons par une discussion pour comprendre votre besoin, votre délai et les contraintes locales.',
  },
  {
    question: 'Pouvez-vous intervenir depuis l’étranger ?',
    answer: 'Oui. L’essentiel de notre accompagnement est pensé pour fonctionner à distance avec une vraie réactivité.',
  },
  {
    question: 'Quels types de dossiers pouvez-vous suivre ?',
    answer: 'Nous accompagnons les démarches administratives, immobilières, foncières et les projets de coordination locale.',
  },
];
</script>

<template>
  <div>
    <HeroSection
      eyebrow="Súna Consulting"
      title="Plus proche du pays, malgré la distance"
      subtitle="Nous accompagnons les particuliers et les entreprises avec rigueur, discrétion et proximité pour transformer les démarches complexes en actions simples."
      :stats="[
        { label: 'Années d’expérience', value: 8 },
        { label: 'Dossiers traités', value: 500 },
        { label: 'Pays couverts', value: 12 },
      ]"
    />

    <ServiceList :services="services" />
    <WhyChooseUs :points="whyChooseUsPoints" />
    <TestimonialSection :testimonials="testimonials" />
      <CallToAction/>    
    <FAQSection :items="faqs" />
    <QuoteForm />
  </div>
</template>