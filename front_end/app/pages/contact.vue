<script setup lang="ts">
import { motion } from 'motion-v';
import QuoteForm from '~/components/quoteForm/QuoteForm.vue';
import { type site_contentType } from '~/types/types';

const store = usesite_contentStore()

const siteContent = ref<site_contentType>()
onMounted(async()=>{
  await store.fetchsite_content()
  siteContent.value = store.site_content
})
</script>

<template>
  <div>
    <section class="mx-auto w-full px-6 py-20 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-rust-600">Contact</p>
          <h1 class="mt-3 text-4xl font-semibold text-link-900 sm:text-5xl">Nous sommes à votre écoute pour préparer
            votre prochaine étape</h1>
          <p class="mt-6 text-lg leading-8 text-slate-600">Vous pouvez nous écrire pour un premier échange, un besoin
            précis ou une demande de suivi.</p>

          <div class="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <p class="text-sm font-semibold mb-2 uppercase tracking-[0.2em] text-rust-600">Téléphone</p>
              <p v-for="phon in siteContent?.contact_phone" class=" text-lg text-slate-700">{{phon}}</p>
            </div>
            <div>
              <p class="text-sm font-semibold mb-2 uppercase tracking-[0.2em] text-rust-600">Email</p>
              <p class=" text-lg text-slate-700">sunaconsulting@gmail.com</p>
            </div>
            <div>
              <p class="text-sm font-semibold mb-2 uppercase tracking-[0.2em] text-rust-600">WhatsApp</p>
              <p v-for="what in siteContent?.contact_whatsapp" class="text-lg text-slate-700">{{what}}</p>
            </div>
          </div>
        </div>

        <div class=" md:border-l md:px-4 border-ink-900">
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-gold-400">Prendre rendez-vous</p>
          <p class="mt-4 text-lg leading-8 text-black/80">Décrivez votre besoin et précisez si vous souhaitez un échange
            rapide ou un accompagnement plus complet.</p>
          <div class="mt-2 md:mt-4">
            <motion.div :initial="{ opacity: 0, scale: 0 }" :animate="{ opacity: 1, scale: 1 }" :transition="{
              duration: 0.4,
              scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 }
            }">
              <QuoteForm />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>