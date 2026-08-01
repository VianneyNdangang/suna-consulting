<script setup lang="ts">
const props = defineProps<{
  points: string[];
}>();
</script>

<template>
  <section class="mx-auto w-full px-4 py-5 md:px-20">
    <div class="grid gap-10 rounded-2xl border border-slate-200 bg-ink-900 p-8 text-white lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-gold-400">Pourquoi nous choisir</p>
        <h2 class="mt-3 text-3xl font-semibold sm:text-4xl">Une approche claire, humaine et plus proche du terrain</h2>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div v-for="point in props.points" :key="point" class="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
          <p class="text-base leading-7 text-sand-50">{{ point }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
