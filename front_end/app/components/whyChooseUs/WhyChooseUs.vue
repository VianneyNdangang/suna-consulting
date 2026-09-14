<script setup lang="ts">
interface Pillar {
  title: string;
  description: string;
  icon: string;
  tag?: string;
  color?: string;
}

const props = defineProps<{
  points?: string[];
}>();

const pillars: Pillar[] = [
  {
    title: 'Transparence & Preuves Horodatées',
    description: 'Chaque mission fait l’objet de photos, vidéos et rapports détaillés en temps réel. Vous savez exactement ce qui se passe sur place.',
    icon: 'i-lucide-shield-check',
    tag: 'Zéro Mauvaise Surprise',
  },
  {
    title: 'Ancrage Local & Réactivité Terrain',
    description: 'Nos équipes basées à Yaoundé et Douala interviennent rapidement auprès des administrations, familles et chantiers.',
    icon: 'i-lucide-map-pin',
    tag: 'Yaoundé & Douala',
  },
  {
    title: 'Confidentialité & Sécurité Juridique',
    description: 'Nous agissons sous mandat strict avec une confidentialité absolue pour protéger vos avoirs, parcelles et démarches privées.',
    icon: 'i-lucide-lock',
    tag: 'Cadre Rigoureux',
  },
  {
    title: 'Impact Social Diaspora (15%)',
    description: '15% de nos bénéfices et actions sont réinvestis dans des forages d’eau potable, du mobilier scolaire et l’aide aux communautés locales.',
    icon: 'i-lucide-heart-handshake',
    tag: 'Entreprise Engagée',
  },
];
</script>

<template>
  <section id="pourquoi-nous" class="py-16 md:py-24 bg-ink-950 text-white relative overflow-hidden">
    <!-- Ambient glowing backgrounds -->
    <div class="absolute top-1/4 -left-32 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
    <div class="absolute bottom-10 -right-32 w-96 h-96 bg-rust-600/15 rounded-full blur-3xl pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-white/10 pb-12">
        <div class="lg:col-span-8 space-y-3">
          <UBadge
            color="primary"
            variant="subtle"
            size="md"
            class="bg-gold-400/20 text-gold-300 border border-gold-400/40 px-3.5 py-1 rounded-full font-medium text-xs tracking-wider uppercase backdrop-blur-sm"
          >
            <UIcon name="i-lucide-check-circle" class="w-3.5 h-3.5 mr-1" />
            Pourquoi Choisir Súna
          </UBadge>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Une approche claire, humaine et <span class="text-transparent bg-clip-text bg-linear-to-r from-gold-300 to-amber-200">ancrée sur le terrain</span>
          </h2>
        </div>

        <div class="lg:col-span-4 lg:text-right">
          <p class="text-sm sm:text-base text-sand-50/80 leading-relaxed font-light">
            Nous comblons le fossé de la distance en devenant vos yeux, vos oreilles et votre bras droit opérationnel au pays.
          </p>
        </div>
      </div>

      <!-- Bento Grid of Trust Pillars -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="pillar in pillars"
          :key="pillar.title"
          class="glass-panel-dark rounded-2xl p-6 border border-white/10 duration-300 flex flex-col justify-between group"
        >
          <div>
            <div class="flex items-center justify-between mb-4">
              <div class="h-12 w-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center transition-colors duration-300">
                <UIcon :name="pillar.icon" class="w-6 h-6 text-gold-400 transition-colors" />
              </div>
              <span v-if="pillar.tag" class="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-gold-300 border border-gold-400/20">
                {{ pillar.tag }}
              </span>
            </div>

            <h3 class="text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
              {{ pillar.title }}
            </h3>

            <p class="mt-3 text-xs sm:text-sm text-sand-50/75 leading-relaxed">
              {{ pillar.description }}
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-white/10 flex items-center text-xs font-semibold text-gold-400 group-hover:text-gold-300">
            <span>Engagement garanti</span>
            <UIcon name="i-lucide-check" class="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>

      <!-- Social Commitment Banner -->
      <div class="mt-12 rounded-2xl bg-linear-to-r from-rust-800/90 via-rust-900 to-ink-800 p-6 sm:p-8 border border-rust-600/40 relative overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div class="lg:col-span-8 space-y-2">
            <div class="inline-flex items-center gap-1.5 text-xs font-bold text-gold-300 uppercase tracking-widest">
              Notre engagement sociétal au Cameroun
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-white">
              Chaque contrat avec la diaspora contribue directement au développement local.
            </h3>
            <p class="text-xs sm:text-sm text-sand-50/80 leading-relaxed">
              Forages d’eau potable, dons de tables-bancs aux écoles, soutien aux orphelinats : nous redistribuons 15% de nos ressources pour un impact durable au pays.
            </p>
          </div>

          <div class="lg:col-span-4 flex justify-start lg:justify-end">
            <UButton
              to="/about"
              variant="outline"
              size="md"
              class="border-gold-400/50 text-gold-300 hover:bg-gold-400/20 font-semibold px-5 py-2.5"
              icon="i-lucide-arrow-right"
              trailing
            >
              En savoir plus sur notre mission
            </UButton>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
