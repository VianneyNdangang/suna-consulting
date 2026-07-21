<script setup lang="ts">
const highlights = [
  'Accompagnement humain pour les démarches sensibles et complexes.',
  'Coordination fiable avec les administrations et partenaires locaux.',
  'Transparence dans les suivis et communication attentive.',
];
</script>

<template>
  <div class="bg-[#fffdf9]">
    <section class="mx-auto w-full px-6 py-20 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-[#b5651d]">À propos</p>
          <h1 class="mt-3 text-4xl font-semibold text-[#171310] sm:text-5xl">Une structure de confiance au service des projets de longue haleine</h1>
          <p class="mt-6 text-lg leading-8 text-slate-600">Súna Consulting est née d’une conviction simple : les personnes vivant à l’étranger doivent pouvoir agir avec sérénité sur des sujets importants, sans perdre de temps ni d’énergie.</p>
        </div>
        <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-[#b5651d]">Notre approche</p>
          <ul class="mt-6 space-y-4">
            <li v-for="item in highlights" :key="item" class="rounded-2xl border border-[#d4a24e]/20 bg-[#f7f1e8] p-4 text-slate-700">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="mx-auto w-full px-6 pb-20 lg:px-8">
      <div class="grid gap-6 rounded-[2rem] border border-slate-200 bg-[#171310] p-8 text-white lg:grid-cols-3 lg:p-10">
        <div>
          <p class="text-3xl font-semibold text-[#d4a24e]">8+</p>
          <p class="mt-2 text-slate-300">années d’expérience</p>
        </div>
        <div>
          <p class="text-3xl font-semibold text-[#d4a24e]">500+</p>
          <p class="mt-2 text-slate-300">dossiers accompagnés</p>
        </div>
        <div>
          <p class="text-3xl font-semibold text-[#d4a24e]">12</p>
          <p class="mt-2 text-slate-300">pays couverts</p>
        </div>
      </div>
    </section>
  </div>
</template>