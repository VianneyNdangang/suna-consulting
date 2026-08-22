<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { servicesType, site_contentType } from '~/types/types';
import { appMenus } from '../menu/menu';

const SCstore = usesite_contentStore();
const serviceStore = useServiceStore();
const toast = useToastStore();

const siteContent = computed(() => SCstore.site_content);
const services = computed(() => serviceStore.services);
const newsletterEmail = ref('');
const isSubscribing = ref(false);

onMounted(() => {
  // Only trigger fetch if data is not already loaded
  if (!SCstore.site_content) {
    SCstore.fetchsite_content().catch(() => {});
  }
  if (!serviceStore.services || serviceStore.services.length === 0) {
    serviceStore.fetchServices().catch(() => {});
  }
});

const handleNewsletter = () => {
  if (!newsletterEmail.value) return;
  isSubscribing.value = true;
  setTimeout(() => {
    isSubscribing.value = false;
    newsletterEmail.value = '';
    toast.show(
      'Inscription confirmée !',
      'success',
      'Merci ! Vous recevrez nos actualités et conseils sur le Cameroun.'
    );
  }, 1000);
};
</script>

<template>
  <footer class="bg-linear-to-b from-ink-950 to-black text-white relative overflow-hidden border-t border-gold-400/20">
    
    <!-- Newsletter Strip -->
    <div class="border-b border-white/10 bg-rust-950/60 py-10 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        <div class="space-y-1 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 text-gold-300 text-xs font-bold uppercase tracking-wider">
            <UIcon name="i-lucide-mail" class="w-4 h-4" />
            Lettre d'information Diaspora
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-white">
            Restez informé des opportunités et démarches au Cameroun
          </h3>
          <p class="text-xs sm:text-sm text-sand-50/75 font-light">
            Conseils fonciers, actualités administratives et guides pratiques directement dans votre boîte mail.
          </p>
        </div>

        <form @submit.prevent="handleNewsletter" class="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
          <UInput
            v-model="newsletterEmail"
            type="email"
            placeholder="votre.email@domaine.com"
            icon="i-lucide-mail"
            size="md"
            class="w-full sm:w-80 shadow-sm"
            required
          />
          <UButton
            type="submit"
            size="md"
            color="primary"
            :loading="isSubscribing"
            class="w-full sm:w-auto bg-rust-600 hover:bg-rust-500 text-white font-semibold px-6 py-2.5 shadow-md justify-center"
          >
            S’abonner
          </UButton>
        </form>
      </div>
    </div>

    <!-- Main Footer Links Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
        
        <!-- Col 1: Brand & Bio -->
        <div class="lg:col-span-2 space-y-4">
          <NuxtLink to="/" class="inline-block">
            <NuxtImg
              src="/logo_white.png"
              alt="Súna Consulting - Votre représentant de confiance au Cameroun"
              width="200"
              height="56"
              sizes="200px"
              quality="100"
              format="webp"
              class="h-14 w-auto object-contain"
            />
          </NuxtLink>

          <p class="text-xs sm:text-sm text-sand-50/80 leading-relaxed font-light max-w-sm">
            Súna Consulting est l’agence de référence pour la diaspora camerounaise dans le monde. Nous assurons la représentation, le suivi et la sécurisation de vos intérêts sur place avec une rigueur absolue.
          </p>

          <!-- Social Links -->
          <div class="flex items-center gap-3 pt-2">
            <a
              href="https://facebook.com/sunaconsulting"
              target="_blank"
              rel="noopener noreferrer"
              class="h-9 w-9 rounded-full bg-white/10 hover:bg-rust-600 border border-white/15 flex items-center justify-center text-white transition-colors"
              aria-label="Facebook"
            >
              <UIcon name="i-lucide-facebook" class="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/sunaconsulting"
              target="_blank"
              rel="noopener noreferrer"
              class="h-9 w-9 rounded-full bg-white/10 hover:bg-rust-600 border border-white/15 flex items-center justify-center text-white transition-colors"
              aria-label="Instagram"
            >
              <UIcon name="i-lucide-instagram" class="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/237679188336"
              target="_blank"
              rel="noopener noreferrer"
              class="h-9 w-9 rounded-full bg-white/10 hover:bg-emerald-600 border border-white/15 flex items-center justify-center text-white transition-colors"
              aria-label="WhatsApp"
            >
              <UIcon name="i-lucide-message-circle" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Col 2: Services -->
        <div class="space-y-4">
          <h4 class="text-sm font-bold uppercase tracking-wider text-gold-400">
            Nos Services
          </h4>
          <ul class="space-y-2.5 text-xs sm:text-sm text-sand-50/80">
            <li>
              <NuxtLink to="/services#administratif" class="hover:text-gold-300 transition-colors">
                Démarches administratives
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services#immobilier" class="hover:text-gold-300 transition-colors">
                Vérification foncière
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services#immobilier" class="hover:text-gold-300 transition-colors">
                Suivi de chantiers
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services#evenements" class="hover:text-gold-300 transition-colors">
                Événements familiaux (Dot)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services" class="hover:text-gold-300 transition-colors font-semibold text-gold-400">
                Tous les services →
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Col 3: Navigation -->
        <div class="space-y-4">
          <h4 class="text-sm font-bold uppercase tracking-wider text-gold-400">
            Navigation
          </h4>
          <ul class="space-y-2.5 text-xs sm:text-sm text-sand-50/80">
            <li v-for="item in appMenus" :key="item.to">
              <NuxtLink :to="item.to" class="hover:text-gold-300 transition-colors">
                {{ item.label }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/#faq" class="hover:text-gold-300 transition-colors">
                FAQ & Aide
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Col 4: Contact & Office -->
        <div class="space-y-4">
          <h4 class="text-sm font-bold uppercase tracking-wider text-gold-400">
            Contact & Bureaux
          </h4>
          <div class="space-y-3 text-xs sm:text-sm text-sand-50/80">
            <div class="flex items-start gap-2.5">
              <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
              <span>Yaoundé & Douala, Cameroun</span>
            </div>

            <div class="flex items-start gap-2.5">
              <UIcon name="i-lucide-phone" class="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
              <div class="space-y-0.5">
                <p>+237 679 188 336</p>
                <p>+237 691 948 056</p>
              </div>
            </div>

            <div class="flex items-start gap-2.5">
              <UIcon name="i-lucide-mail" class="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
              <a href="mailto:sunaconsulting@gmail.com" class="hover:text-gold-300 transition-colors">
                sunaconsulting@gmail.com
              </a>
            </div>

            <div class="flex items-start gap-2.5">
              <UIcon name="i-lucide-message-circle" class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <a href="https://wa.me/237679188336" target="_blank" rel="noopener noreferrer" class="text-emerald-400 hover:underline">
                WhatsApp 7j/7
              </a>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand-50/60">
        <p>
          &copy; {{ new Date().getFullYear() }} Súna Consulting. Tous droits réservés.
        </p>
        <div class="flex items-center gap-6">
          <NuxtLink to="/about" class="hover:text-gold-300 transition-colors">Mentions Légales</NuxtLink>
          <NuxtLink to="/about" class="hover:text-gold-300 transition-colors">Confidentialité</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-gold-300 transition-colors">Support Client</NuxtLink>
        </div>
      </div>

    </div>
  </footer>
</template>
