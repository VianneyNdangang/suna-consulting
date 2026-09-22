<script setup lang="ts">
import { computed } from 'vue';
import Card from '~/components/card/Card.vue';
import DataSkeleton from '~/components/loading/DataSkeleton.vue';
import BottomBanner from '~/components/banners/BottomBanner.vue';

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

const store = useServiceStore();
const loading = computed(() => store.loading);
const services = computed(() => {
  const datas = [] as any[];
  if (store.services && store.services.length > 0) {
    store.services.forEach((service: any) => {
      if (service.is_active) {
        datas.push(service);
      }
    });
  }
  return  datas 
  });

  onMounted(() => {
    store.fetchServices();
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
          v-for="(service, index) in services"
          :key="index"
          :item="service"
        />
      </div>
      <!-- Custom CTA Box -->
      <BottomBanner
        subtitle="Vous avez une demande non répertoriée ?"
        description="Notre équipe sur le terrain prend en charge les missions personnalisées."
      />
    </div>
  </div>
</template>
