<script setup lang="ts">
import type { servicesType } from '~/types/types';

const services = ref<servicesType[]>();
const store = useServiceStore()
onMounted(async()=>{
  await store.fetchServices()
  services.value = store.services

})

</script>

<template>
  <div class="bg-[#fffdf9]">
    <section class="mx-auto w-full px-4 py-20 lg:px-20">
      <div class="max-w-3xl">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-rust-600">Services</p>
        <h1 class="mt-3 text-4xl font-semibold text-ink-900 sm:text-5xl">Des services organisés pour donner de la clarté aux démarches les plus importantes</h1>
        <p class="mt-6 text-lg leading-8 text-slate-600">Nous proposons un accompagnement structuré pour aider les particuliers et les entreprises à avancer avec confiance, quel que soit leur lieu de résidence.</p>
      </div>

      <div class="mt-10 grid gap-6 lg:grid-cols-3">
        <article v-for="service in services" :key="service.title" class="flex justify-center items-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div v-if="service?.icon" class="p-2 border-r-2 border-rust-600 mr-1 "><Icon :name="'tabler:'+service.icon" size="80" class="text-rust-900"/></div>
          <div><h2 class="text-md md:text-xl font-semibold text-ink-900">{{ service.title }}</h2>
          <p class="mt-4 text-slate-600">{{ service.short_description }}</p></div>
          <!-- <ul class="mt-6 space-y-3">
            <li v-for="feature in service.features" :key="feature" class="rounded-2xl bg-sand-50 px-4 py-3 text-sm text-slate-700">
              {{ feature }}
            </li>
          </ul> -->
        </article>
      </div>
    </section>
  </div>
</template>
