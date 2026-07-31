<script setup lang="ts">
import { testimonialsType, type servicesType } from '~/types/types';


const serviceStore = useServiceStore()

const services = ref<servicesType[]>([]);
const testimonial = ref<testimonialsType[]>([])
onMounted(async()=>{
  await serviceStore.fetchServices()

  services.value = serviceStore.services
})

</script>

<template>
  <div class="bg-[#fffdf9] px-4 md:px-20">
    <section class="mx-auto w-full px-6 py-20 lg:px-8">
      <div class="flex flex-col items-center gap-10">
        <div class="flex justify-center items-center w-full gap-2">
        <NuxtImg src="https://i.postimg.cc/fyVH4Qq2/pexels-jopwell-2422294.jpg" class="rounded-lg"/>
        <div>
          <p
            class="text-sm font-semibold uppercase tracking-[0.3em] text-rust-600"
          >
            À propos
          </p>
          <h1 class="mt-3 text-4xl font-semibold text-ink-900 sm:text-5xl">
            <p class="text-rust-600">Súna Consulting</p> Votre partenaire de confiance au Cameroun
          </h1>
          <p class="mt-6 text-lg leading-8 text-slate-600 text-justify">
            Notre entreprise de conciergerie est née d'une conviction simple :
            permettre aux Camerounais de la diaspora de gérer efficacement leurs
            affaires, leurs projets et leurs engagements familiaux au Cameroun,
            sans les contraintes liées à la distance. <br />Nous mettons à la
            disposition de nos clients une équipe de professionnels fiables,
            réactifs et discrets, capables de prendre en charge une grande
            variété de missions, des plus simples aux plus complexes, partout au
            Cameroun.
          </p>
        </div>
        </div>
        <div class="rounded-2xl border border-slate-200 w-full bg-white p-8 shadow-sm">
          <p
            class="text-sm font-semibold uppercase tracking-[0.3em] text-rust-600"
          >
            Nos services
          </p>
          <ul class="mt-6 space-y-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <li
              v-for="item in services"
              :key="item.id"
              class="rounded-lg border border-gold-400/20 bg-sand-50 p-2 text-slate-700"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="mx-auto w-full px-6 pb-20 lg:px-8">
      <div
        class="grid gap-6 rounded-2xl border border-slate-200 bg-ink-900 p-8 text-white lg:grid-cols-3 lg:p-10"
      >
        <div>
          <p class="text-3xl font-semibold text-gold-400">8+</p>
          <p class="mt-2 text-slate-300">années d’expérience</p>
        </div>
        <div>
          <p class="text-3xl font-semibold text-gold-400">500+</p>
          <p class="mt-2 text-slate-300">dossiers accompagnés</p>
        </div>
        <div>
          <p class="text-3xl font-semibold text-gold-400">12</p>
          <p class="mt-2 text-slate-300">pays couverts</p>
        </div>
      </div>
    </section>
  </div>
</template>
