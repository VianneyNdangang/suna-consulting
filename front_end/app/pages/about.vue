

<template>
  <div class="bg-sand-25 py-12 md:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <!-- Top Story Section -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-6 space-y-6">
          <UBadge
            color="primary"
            variant="subtle"
            size="md"
            class="bg-rust-100 text-rust-800 border border-rust-200 px-3.5 py-1 rounded-full font-medium text-xs tracking-wider uppercase"
          >
            <UIcon name="i-lucide-users" class="w-3.5 h-3.5 mr-1" />
            Notre Histoire & Vision
          </UBadge>

          <h1
            class="text-3xl sm:text-5xl font-extrabold text-ink-900 tracking-tight leading-tight"
          >
            Votre partenaire de confiance
            <span class="text-rust-600">sur le sol camerounais</span>
          </h1>

          <p
            class="text-base sm:text-lg text-slate-700 leading-relaxed font-normal"
          >
            Súna Consulting est née d’une conviction profonde : permettre à
            chaque membre de la diaspora camerounaise de piloter ses démarches,
            ses investissements fonciers et ses projets familiaux avec la même
            tranquillité d’esprit que s’il était sur place.
          </p>

          <p
            class="text-sm sm:text-base text-slate-600 leading-relaxed font-light"
          >
            Basés à Douala, nous mettons à votre disposition une
            équipe de professionnels fiables, réactifs et discrets, garantissant
            des comptes-rendus rigoureux et une exécution irréprochable.
          </p>

          <div class="pt-2 flex items-center gap-4">
            <Button
              to="/contact"
              variant="primary"
              type="button"
              icon="i-lucide-calculator"
              size="sm"
              label="Prendre contact"
            />
            <Button
              to="https://wa.me/237679188336"
              variant="secondary"
              type="button"
              color="success"
              :icon="IconWhatsApp"
              size="sm"
              label="WhatsApp Direct"
            />
          </div>
        </div>

        <div class="lg:col-span-6">
          <div
            class="relative rounded-3xl overflow-hidden border border-gold-400/30"
          >
            <NuxtImg
              src="/logo_primary.png"
              alt="Súna Consulting Équipe et Présence au Cameroun"
              sizes="600px"
              quality="90"
              format="webp"
              class="w-full h-auto object-cover"
            />
            <div
              class="absolute inset-0 bg-linear-0 from-ink-950 via-20% via-transparent to-transparent"
            />
            <div class="absolute bottom-6 left-6 right-6 text-gold-300">
              <span
                class="text-xs uppercase tracking-widest text-white font-bold"
                >Présence Terrain</span
              >
              <p class="text-base font-semibold mt-1">
                Interventions à Yaoundé, Douala et dans les 10 régions du
                Cameroun.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-2xl bg-linear-to-br from-ink-900 to-rust-900 p-8 sm:p-12 text-white border border-gold-400/30"
      >
        <div class="text-center md:text-left space-y-1">
          <div class="text-4xl sm:text-5xl font-black text-gold-400">8+</div>
          <h3 class="text-lg font-bold text-white">Années d'expérience</h3>
          <p class="text-xs text-sand-50/75">
            Au service de la diaspora camerounaise mondiale.
          </p>
        </div>
        <div class="text-center md:text-left space-y-1">
          <div class="text-4xl sm:text-5xl font-black text-gold-400">500+</div>
          <h3 class="text-lg font-bold text-white">Missions réussies</h3>
          <p class="text-xs text-sand-50/75">
            Dossiers administratifs, fonciers et chantiers livrés.
          </p>
        </div>
        <div class="text-center md:text-left space-y-1">
          <div class="text-4xl sm:text-5xl font-black text-gold-400">12+</div>
          <h3 class="text-lg font-bold text-white">Pays de résidence</h3>
          <p class="text-xs text-sand-50/75">
            Canada, France, USA, Belgique, Allemagne, Suisse...
          </p>
        </div>
      </div>

      <!-- Values & 15% Social Impact -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          class="rounded-2xl bg-white p-8 border border-gold-400/20 shadow-sm space-y-4"
        >
          <h3 class="text-xl font-bold text-ink-900 flex items-center gap-2">
            <UIcon name="i-lucide-shield-check" class="w-5 h-5 text-rust-600" />
            Nos 4 Principes Fondamentaux
          </h3>
          <ul class="space-y-3 text-sm text-slate-700">
            <li class="flex items-start gap-2.5">
              <span class="text-gold-500 font-bold">•</span>
              <span
                ><strong>Confiance :</strong> Nous agissons dans le strict
                respect de vos intérêts privés et financiers.</span
              >
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-gold-500 font-bold">•</span>
              <span
                ><strong>Transparence :</strong> Chaque mission fait l’objet de
                photos, vidéos et rapports détaillés en direct.</span
              >
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-gold-500 font-bold">•</span>
              <span
                ><strong>Rigueur :</strong> Une méthode éprouvée pour éviter les
                lenteurs administratives et les litiges.</span
              >
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-gold-500 font-bold">•</span>
              <span
                ><strong>Proximité :</strong> Vos yeux, vos oreilles et vos
                mains sur place au pays.</span
              >
            </li>
          </ul>
        </div>

        <div
          class="rounded-2xl bg-linear-to-br from-rust-800 to-ink-900 p-8 text-white border border-rust-600/40 space-y-4"
        >
          <div
            class="inline-flex items-center gap-1.5 text-xs font-bold text-gold-300 uppercase tracking-widest"
          >
            Engagement Sociétal
          </div>
          <h3 class="text-xl font-bold text-white">
            15% réinvestis dans le développement local
          </h3>
          <p class="text-sm text-sand-50/85 leading-relaxed">
            Nous consacrons 15% de nos ressources à des forages d’eau potable,
            l’acquisition de tables-bancs scolaires et l’aide aux orphelinats
            dans les villages et quartiers au Cameroun.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import Button from "~/components/buttons/Button.vue";
import { IconWhatsApp } from "~/components/svg/svg";

useHead({
  title: "À Propos de Súna Consulting | Notre Histoire & Engagements",
  meta: [
    {
      name: "description",
      content:
        "Découvrez la mission de Súna Consulting : être le représentant de confiance et le partenaire opérationnel de la diaspora camerounaise dans le monde entier.",
    },
    {
      property: "og:title",
      content: "À Propos de Súna Consulting | Notre Histoire & Engagements",
    },
    {
      property: "og:description",
      content:
        "Votre représentant de confiance au Cameroun : transparence, discrétion, présence à Yaoundé et Douala.",
    },
    { property: "og:url", content: "https://sunaconsulting.com/about" },
  ],
  link: [{ rel: "canonical", href: "https://sunaconsulting.com/about" }],
});

const siteContentStore = usesite_contentStore()
const {site_content} = storeToRefs(siteContentStore)

onMounted( async ()=>{
  await siteContentStore.fetchsite_content()
})
</script>