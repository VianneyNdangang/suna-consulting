<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  details: '',
});

const submitted = ref(false);

function submitForm() {
  submitted.value = true;
}
</script>

<template>
  <section class="bg-ink-900 px-2 py-6 md:py-10 text-white md:px-6 rounded-lg">
    <div class="flex flex-col mx-auto w-full gap-10">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-gold-400">Demande de devis</p>
        <h2 class="mt-3 text-3xl font-semibold sm:text-4xl">Décrivez votre besoin et nous vous recontacterons</h2>
        <p class="mt-5 max-w-xl text-lg leading-8 text-white/80">Le formulaire est pensé pour recueillir rapidement les informations importantes et vous proposer une première réponse adaptée.</p>
      </div>

      <form class="rounded-xl border border-white/10 bg-white/10 p-2 md:p-6 backdrop-blur" @submit.prevent="submitForm">
        <div class="grid gap-4 md:grid-cols-2">
          <label class="text-sm font-medium text-sand-50">
            Nom complet
            <input v-model="form.name" class="mt-2 w-full rounded-lg border border-white/15 bg-white/90 px-4 py-3 text-ink-900 outline-none" placeholder="Jean Mbala" />
          </label>
          <label class="text-sm font-medium text-sand-50">
            Email
            <input v-model="form.email" type="email" class="mt-2 w-full rounded-lg border border-white/15 bg-white/90 px-4 py-3 text-ink-900 outline-none" placeholder="vous@email.com" />
          </label>
          <label class="text-sm font-medium text-sand-50">
            Téléphone
            <input v-model="form.phone" class="mt-2 w-full rounded-lg border border-white/15 bg-white/90 px-4 py-3 text-ink-900 outline-none" placeholder="+237 6xx xx xx xx" />
          </label>
          <label class="text-sm font-medium text-sand-50">
            Service concerné
            <input v-model="form.service" class="mt-2 w-full rounded-lg border border-white/15 bg-white/90 px-4 py-3 text-ink-900 outline-none" placeholder="Accompagnement immobilier" />
          </label>
        </div>

        <label class="mt-4 block text-sm font-medium text-sand-50">
          Décrivez votre besoin
          <textarea v-model="form.details" rows="5" class="mt-2 w-full rounded-lg border border-white/15 bg-white/90 px-4 py-3 text-ink-900 outline-none" placeholder="Expliquez votre contexte et ce que vous souhaitez obtenir." />
        </label>

        <button type="submit" class="mt-6 inline-flex items-center justify-center rounded-full bg-rust-600 px-6 py-3 font-semibold text-white transition hover:bg-rust-900">
          Envoyer la demande
        </button>
      </form>
    </div>
  </section>
</template>
