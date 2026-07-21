<script setup lang="ts">
const services = [
  {
    title: 'Assistance administrative',
    description: 'Gestion de dossiers, dépôt de documents, suivi des démarches et coordination des formalités.',
    features: ['Démarches administratives', 'Suivi de dossiers', 'Reporting régulier'],
  },
  {
    title: 'Accompagnement immobilier et foncier',
    description: 'Analyse des besoins, vérification de parcelles et préparation des étapes clés.',
    features: ['Vérification de parcelles', 'Conseil sur les transactions', 'Accompagnement local'],
  },
  {
    title: 'Gestion de projets',
    description: 'Organisation, pilotage et communication pour garder un projet clair et maitrisé.',
    features: ['Planification', 'Coordination', 'Pilotage opérationnel'],
  },
];
</script>

<template>
  <div class="bg-[#fffdf9]">
    <section class="mx-auto w-full px-6 py-20 lg:px-8">
      <div class="max-w-3xl">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-rust-600">Services</p>
        <h1 class="mt-3 text-4xl font-semibold text-ink-900 sm:text-5xl">Des services organisés pour donner de la clarté aux démarches les plus importantes</h1>
        <p class="mt-6 text-lg leading-8 text-slate-600">Nous proposons un accompagnement structuré pour aider les particuliers et les entreprises à avancer avec confiance, quel que soit leur lieu de résidence.</p>
      </div>

      <div class="mt-10 grid gap-6 lg:grid-cols-3">
        <article v-for="service in services" :key="service.title" class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 class="text-2xl font-semibold text-ink-900">{{ service.title }}</h2>
          <p class="mt-4 text-slate-600">{{ service.description }}</p>
          <ul class="mt-6 space-y-3">
            <li v-for="feature in service.features" :key="feature" class="rounded-2xl bg-sand-50 px-4 py-3 text-sm text-slate-700">
              {{ feature }}
            </li>
          </ul>
        </article>
      </div>
    </section>
  </div>
</template>
