<script setup lang="ts">
import Button from '../buttons/Button.vue';
import Counter from '../counter/Counter.vue';
import HeroVideo from '../heroVideo/HeroVideo.vue';


interface StatItem {
  label: string;
  value: number;
}

const props = defineProps<{
  eyebrow?: string;
  title: string;
  subtitle: string;
  stats: StatItem[];
}>();
</script>

<template>
  <HeroVideo><section class="relative overflow-hidden text-white">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,162,78,0.22),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(138,62,18,0.32),transparent_34%)]" />
    <div class="relative mx-auto grid w-full gap-10 px-4 py-15 md:grid-cols-[1.1fr_0.9fr] md:px-20 md:py-20">
      <div class=" w-full">
        <p v-if="props.eyebrow" class="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm uppercase tracking-[0.3em] text-sand-50">
          {{ props.eyebrow }}
        </p>
        <h1 class="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          {{ props.title }}
        </h1>
        <p class="mt-6 text-lg leading-8 text-sand-50/90 sm:text-xl">
          {{ props.subtitle }}
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <NuxtLink to="/contact">
            <Button label="Demmandez un devis" variant="primary" type="button"/>
          </NuxtLink>
          <NuxtLink to="/services">
            <Button label="Voir nos services" variant="secondary" type="button"/>
          </NuxtLink>
        </div>
        <div v-if="props.stats?.length" class="mt-10 grid gap-4 sm:grid-cols-3">
          <div v-for="stat in props.stats" :key="stat.label" class="rounded-2xl border border-white/10 bg-white/10 flex flex-col justify-center items-center p-4 backdrop-blur">
            <p class="text-2xl font-semibold text-gold-400"><Counter :value="stat.value"/> </p>
            <p class="mt-1 text-sm text-sand-50/80">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
        <div class="rounded-xl p-6 text-ink-900">
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-rust-600">Mission en 3 étapes</p>
          <div class="mt-6 space-y-4">
            <div class="rounded-lg border border-gold-400/30 bg-white p-4 shadow-sm">
              <p class="font-semibold">1. Comprendre votre besoin</p>
              <p class="mt-1 text-sm text-slate-600">Analyse de votre contexte et définition des priorités.</p>
            </div>
            <div class="rounded-lg border border-gold-400/30 bg-white p-4 shadow-sm">
              <p class="font-semibold">2. Déployer une solution fiable</p>
              <p class="mt-1 text-sm text-slate-600">Organisation claire, suivi fiable et communication continue.</p>
            </div>
            <div class="rounded-lg border border-gold-400/30 bg-white p-4 shadow-sm">
              <p class="font-semibold">3. Piloter avec transparence</p>
              <p class="mt-1 text-sm text-slate-600">Rapports réguliers et recommandations concrètes pour avancer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section></HeroVideo>
  
</template>
