<script setup lang="ts">
const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6'
]
const isLoadingImage = ref(false)
</script>

<template>
  <section id="pourquoi-nous" class="relative overflow-hidden border-y border-gold-200/70 bg-sand-50 py-12 text-ink-900 md:py-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-7 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
        <div class="max-w-2xl">
          <span class="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-rust-600">
            <span class="h-px w-8 bg-gold-500" aria-hidden="true" />
            Sur le terrain
          </span>
          <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl">
            Les réalisations de Suna Consulting
          </h2>
        </div>
        <p class="max-w-md text-sm leading-7 text-ink-700 md:text-right">
          Des projets suivis avec attention, au plus près des réalités du terrain et de vos ambitions.
        </p>
      </div>

      <UCarousel
        v-slot="{ item }"
        loop
        arrows
        :autoplay="{ delay: 3500 }"
        wheel-gestures
        :prev="{ variant: 'solid' }"
        :next="{ variant: 'solid' }"
        :items="items"
        aria-label="Réalisations de Suna Consulting sur le terrain"
        :ui="{
          item: 'basis-full ps-0 sm:basis-1/2 lg:basis-1/3',
          prev: 'start-2 sm:start-4',
          next: 'end-2 sm:end-4',
          container: 'ms-0',
          viewport: 'overflow-hidden'
        }"
      >
        <div class="group relative overflow-hidden rounded-2xl mx-1 border border-gold-200/80 bg-white p-2 shadow-[0_16px_36px_rgba(67,27,5,0.14)] transition duration-300 hover:-translate-y-1">
          <div class="pointer-events-none absolute inset-3 z-10 rounded-xl border border-white/40" aria-hidden="true" />
          <img
            :src="`/suna_loadingImage.png`"
            width="640"
            height="640"
            alt="Réalisation de Suna Consulting sur le terrain"
            class="aspect-4/3 w-full rounded object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
            @loadeddata="isLoadingImage = true"
          >
          <div class="pointer-events-none absolute inset-x-2 bottom-2 rounded-b-xl bg-linear-to-t from-ink-950/80 via-ink-950/25 to-transparent px-5 pb-4 pt-12">
            <span class="text-xs font-semibold uppercase tracking-[0.16em] text-white/90">Projet suivi sur le terrain</span>
          </div>
        </div>
      </UCarousel>
    </div>
  </section>
</template>

