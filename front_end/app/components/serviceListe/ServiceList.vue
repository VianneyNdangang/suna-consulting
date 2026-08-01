<script setup lang="ts">
import Carrousel from '../carrousel/Carrousel.vue';



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
  <section class="mx-auto w-full px-4 py-5 md:px-20">
    <div class="flex flex-col gap-4 items-start ">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-rust-600">Nos services</p>
        <h2 class="mt-2 text-3xl font-semibold text-ink-900 sm:text-4xl">Des accompagnements pensés pour des décisions plus sûres</h2>
      </div>
      <p class="max-w-2xl text-lg text-slate-600">Chaque mission combine expertise locale, rigueur administrative et accompagnement humain pour simplifier les démarches à distance.</p>
    </div>
    <Carrousel :items="services"/>
  </section>
</template>
