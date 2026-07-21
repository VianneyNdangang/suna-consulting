<script setup lang="ts">
import Carrousel from '../molecules/carrousel.vue';

export interface ServiceItem {
  slug: string;
  title: string;
  short_description: string;
  icon: string;
  image_url?: string;
}

const props = defineProps<{
  services: ServiceItem[];
}>();
</script>

<template>
  <section class="mx-auto w-full px-6 py-10 mt-5 lg:px-8">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-rust-600">Nos services</p>
        <h2 class="mt-2 text-3xl font-semibold text-ink-900 sm:text-4xl">Des accompagnements pensés pour des décisions plus sûres</h2>
      </div>
      <p class="max-w-2xl text-lg text-slate-600">Chaque mission combine expertise locale, rigueur administrative et accompagnement humain pour simplifier les démarches à distance.</p>
    </div>
    <Carrousel :items="services"/>
  </section>
</template>
