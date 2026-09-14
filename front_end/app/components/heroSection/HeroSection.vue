<script setup lang="ts">
import HeroVideo from '../heroVideo/HeroVideo.vue';
import Counter from '../counter/Counter.vue';
import Button from '../buttons/Button.vue';

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  icon?: string;
}

const props = withDefaults(
  defineProps<{
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    stats?: StatItem[];
  }>(),
  {
    eyebrow: 'Súna Consulting • Partenaire Diaspora',
    title: 'Plus proche du pays, malgré la distance',
    subtitle: 'Votre représentant de confiance au Cameroun pour vos démarches administratives, investissements fonciers, suivi de chantiers et coordination de projets.',
    stats: () => [
      { label: "Années d'expérience", value: 8, suffix: '+', icon: 'i-lucide-award' },
      { label: 'Dossiers traités', value: 500, suffix: '+', icon: 'i-lucide-check-circle' },
      { label: 'Pays couverts', value: 12, suffix: '+', icon: 'i-lucide-globe' },
    ],
  }
);

const steps = [
  {
    num: '01',
    title: 'Cadrage & Écoute',
    desc: 'Analyse précise de votre besoin et plan d’action sur-mesure.',
    icon: 'i-lucide-file-search',
  },
  {
    num: '02',
    title: 'Intervention Terrain',
    desc: 'Déploiement rapide sur place à Yaoundé, Douala et régions.',
    icon: 'i-lucide-map-pin',
  },
  {
    num: '03',
    title: 'Reporting & Transparence',
    desc: 'Photos horodatées, vidéos et livrables sécurisés en direct.',
    icon: 'i-lucide-shield-check',
  },
];
</script>

<template>
  <HeroVideo>
    <section class="relative text-white overflow-hidden py-12 md:py-20 lg:py-24">
      <!-- Ambient light effect -->
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl pointer-events-none" />
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-rust-600/25 rounded-full blur-3xl pointer-events-none" />

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Left Column: Pitch & CTAs -->
          <div class="lg:col-span-7 space-y-6 text-left">
            
            <!-- Eyebrow Badge -->
            <div class="inline-flex items-center gap-2">
              <UBadge
                color="primary"
                variant="subtle"
                size="md"
                class="bg-gold-400/20 text-gold-300 border border-gold-400/40 px-3.5 py-1 rounded-full font-medium text-xs tracking-wider uppercase backdrop-blur-md"
              >
                <UIcon name="i-lucide-sparkles" class="w-3.5 h-3.5 text-gold-300" />
                {{ props.eyebrow }}
              </UBadge>
            </div>

            <!-- Main Heading -->
            <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              {{ props.title || 'Plus proche du pays,' }}
              <span class="block text-transparent bg-clip-text bg-linear-to-r from-gold-300 via-amber-200 to-rust-400">
                malgré la distance.
              </span>
            </h1>

            <!-- Subtitle -->
            <p class="text-base sm:text-lg text-sand-50/90 leading-relaxed max-w-2xl font-light">
              {{ props.subtitle }}
            </p>

            <!-- CTA Buttons with Nuxt UI -->
            <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <UButton
                to="/quote"
                size="lg"
                color="primary"
                icon="i-lucide-calculator"
                class="bg-rust-600 hover:bg-rust-500 text-white font-semibold px-6 py-3.5 justify-center"
              >
                Demander un devis gratuit
              </UButton>

              <UButton
                to="/services"
                size="lg"
                variant="outline"
                color="neutral"
                icon="i-lucide-arrow-right"
                trailing
                class="border-white/30 text-white bg-transparent hover:bg-white/10 font-semibold px-6 py-3.5 backdrop-blur-sm justify-center"
              >
                Voir nos services
              </UButton>
            </div>

            <!-- Trust highlights -->
            <div class="pt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-sand-50/80">
              <span class="inline-flex items-center gap-1.5">
                <UIcon name="i-lucide-check-circle-2" class="w-4 h-4 text-emerald-400" />
                100% Confidentialité
              </span>
              <span class="inline-flex items-center gap-1.5">
                <UIcon name="i-lucide-shield-alert" class="w-4 h-4 text-gold-300" />
                Comptes-rendus horodatés
              </span>
              <span class="inline-flex items-center gap-1.5">
                <UIcon name="i-lucide-zap" class="w-4 h-4 text-amber-400" />
                Réponse sous 24h
              </span>
            </div>

            <!-- Stats Bar -->
            <div class="pt-6 grid grid-cols-3 gap-3 sm:gap-4">
              <div
                v-for="stat in (props.stats?.length ? props.stats : [
                  { label: 'Années d’expérience', value: 8, suffix: '+' },
                  { label: 'Missions traitées', value: 500, suffix: '+' },
                  { label: 'Pays de diaspora', value: 12, suffix: '+' }
                ])"
                :key="stat.label"
                class="glass-panel rounded-xl p-3 sm:p-4 text-center border border-white/10 backdrop-blur-md transition-transform hover:scale-105 duration-200"
              >
                <div class="text-2xl sm:text-3xl font-black text-gold-400 flex items-center justify-center gap-0.5">
                  <Counter :value="stat.value" />
                  <span>{{ stat.suffix || '+' }}</span>
                </div>
                <p class="mt-1 text-[11px] sm:text-xs text-sand-50/75 leading-tight font-medium">
                  {{ stat.label }}
                </p>
              </div>
            </div>

          </div>

          <!-- Right Column: Interactive 3-Step Process Card -->
          <!-- <div class="lg:col-span-5">
            <div class="glass-panel-dark rounded-2xl p-6 sm:p-8 border border-gold-400/30 backdrop-blur-xl relative overflow-hidden">
              
              <div class="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span class="text-xs uppercase tracking-widest font-semibold text-gold-400">
                    Garantie d'exécution
                  </span>
                  <h3 class="text-lg font-bold text-white mt-0.5">
                    Votre mission en 3 étapes
                  </h3>
                </div>
                <div class="h-10 w-10 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center text-gold-300">
                  <UIcon name="i-lucide-shield-check" class="w-5 h-5" />
                </div>
              </div>

              <div class="space-y-4">
                <div
                  v-for="(step, idx) in steps"
                  :key="step.num"
                  class="group relative flex items-start gap-4 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
                >
                  <div class="shrink-0 w-10 h-10 rounded-lg bg-rust-600/80 border border-gold-400/30 flex items-center justify-center text-white font-bold text-sm">
                    {{ step.num }}
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <h4 class="text-sm font-semibold text-white group-hover:text-gold-300 transition-colors">
                        {{ step.title }}
                      </h4>
                      <UIcon :name="step.icon" class="w-4 h-4 text-gold-400/70" />
                    </div>
                    <p class="mt-1 text-xs text-sand-50/80 leading-relaxed">
                      {{ step.desc }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span class="text-xs text-emerald-300 font-medium">Équipe active au Cameroun</span>
                </div>
                <NuxtLink
                  to="/quote"
                  class="text-xs font-semibold text-gold-300 hover:text-gold-200 inline-flex items-center gap-1 group"
                >
                  Lancer une mission
                  <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </NuxtLink>
              </div>

            </div>
          </div> -->

        </div>
      </div>
    </section>
  </HeroVideo>
</template>
