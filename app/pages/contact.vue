<script setup lang="ts">
import { icons } from '@tabler/icons-vue';
import { computed, onMounted } from 'vue';
import QuoteForm from '~/components/forms/QuoteForm.vue';
import { IconGmail, IconLinkedin, IconWhatsApp } from '~/components/svg/svg';
const { t } = useI18n();

useHead({
  title: 'Contactez Súna Consulting | Yaoundé, Douala & Diaspora',
  meta: [
    {
      name: 'description',
      content: 'Contactez l’équipe Súna Consulting au Cameroun. Échangez par WhatsApp, téléphone ou formulaire pour vos démarches administratives, foncières et projets.',
    },
    { property: 'og:title', content: 'Contactez Súna Consulting | Yaoundé, Douala & Diaspora' },
    {
      property: 'og:description',
      content: 'Prenez contact avec un conseiller Súna au Cameroun. Réponse sous 24h ouvrées.',
    },
    { property: 'og:url', content: 'https://sunaconsulting.com/contact' },
  ],
  link: [{ rel: 'canonical', href: 'https://sunaconsulting.com/contact' }],
});

const store = usesite_contentStore();
const loading = computed(() => store.loading);
const siteContent = computed(() => store.site_content);

onMounted(() => {
  if (!store.site_content) {
    store.fetchsite_content().catch(() => {});
  }
});
</script>

<template>
  <div class="bg-sand-25 py-12 md:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col gap-5">
        
        <!-- Contact Info Left Column -->
        <div class="lg:col-span-5 space-y-6">
          <UBadge
            color="primary"
            variant="subtle"
            size="md"
            class="bg-rust-100 text-rust-800 border border-rust-200 px-3.5 py-1 rounded-full font-medium text-xs tracking-wider uppercase"
          >
            <UIcon name="i-lucide-mail" class="w-3.5 h-3.5 mr-1" />
            {{ t('contact.badge') }}
          </UBadge>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-900 tracking-tight leading-tight">
            {{ t('contact.title') }}
          </h1>

          <p class="text-base text-slate-600 leading-relaxed font-light">
            {{ t('contact.description') }}
          </p>

          <!-- Contact Cards -->
          <div class="space-y-4 pt-2">
            
            <div class="rounded-2xl bg-white p-5 border border-gold-400/20 shadow-sm flex items-start gap-4">
              <div class="h-11 w-11 rounded-xl bg-rust-50 border border-rust-200/60 flex items-center justify-center text-rust-600 shrink-0">
                <UIcon name="i-lucide-phone" class="w-5 h-5" />
              </div>
              <div>
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">{{ t('contact.phone') }}</h3>
                <USkeleton v-if="loading" class="mt-2 h-5 w-40" />
                <div v-else class="text-sm font-semibold text-ink-900 mt-1 space-y-0.5">
                  <p v-for="phon in (siteContent?.contact_phone || ['+237 679 188 336', '+237 691 948 056'])" :key="phon">
                    <a :href="`tel:${phon.replace(/\s+/g, '')}`" class="hover:text-rust-600 transition-colors">
                      {{ phon }}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div class="rounded-2xl bg-white p-5 border border-gold-400/20 shadow-sm flex items-start gap-4">
              <div class="h-11 w-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                <UIcon :name="IconWhatsApp" class="w-5 h-5" />
              </div>
              <div>
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">{{ t('contact.whatsapp') }}</h3>
                <p class="text-sm font-semibold text-emerald-700 mt-1">
                  <a
                    href="https://wa.me/237679188336"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:underline flex items-center gap-1"
                  >
                    +237 679 188 336 ({{ t('contact.instantChat') }})
                  </a>
                </p>
              </div>
            </div>

            <div class="rounded-2xl bg-white p-5 border border-gold-400/20 shadow-sm flex items-start gap-4">
              <div class="h-11 w-11 rounded-xl bg-gold-50 border border-gold-400/30 flex items-center justify-center text-gold-600 shrink-0">
                <UIcon :name="IconGmail" class="w-5 h-5" />
              </div>
              <div>
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">{{ t('contact.officialEmail') }}</h3>
                <p class="text-sm font-semibold text-ink-900 mt-1">
                  <a :href="`mailto:${siteContent?.contact_email || 'sunaconsulting@gmail.com'}`" class="hover:text-rust-600 transition-colors">
                    {{ siteContent?.contact_email || 'sunaconsulting@gmail.com' }}
                  </a>
                </p>
              </div>
            </div>

             <div class="rounded-2xl bg-white p-5 border border-gold-400/20 shadow-sm flex items-start gap-4">
              <div class="h-11 w-11 rounded-xl bg-gold-50 border border-gold-400/30 flex items-center justify-center text-gold-600 shrink-0">
                <UIcon :name="IconLinkedin" class="w-5 h-5" />
              </div>
              <div>
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">{{ t('contact.officialLinkedin') }}</h3>
                <p class="text-sm font-semibold text-ink-900 mt-1">
                  <a :href="`mailto:${siteContent?.contact_email || 'sunaconsulting@gmail.com'}`" class="hover:text-rust-600 transition-colors">
                    {{ siteContent?.contact_email || 'sunaconsulting@gmail.com' }}
                  </a>
                </p>
              </div>
            </div>

            <div class="rounded-2xl bg-white p-5 border border-gold-400/20 shadow-sm flex items-start gap-4">
              <div class="h-11 w-11 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0">
                <UIcon name="i-lucide-map-pin" class="w-5 h-5" />
              </div>
              <div>
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">{{ t('contact.offices') }}</h3>
                <p class="text-sm font-semibold text-ink-900 mt-1">
                  Douala, Cameroun
                </p>
                <p class="text-xs text-slate-500 mt-0.5">{{ t('contact.regions') }}</p>
              </div>
            </div>

          </div>
        </div>

        <!-- Form Right Column -->
        <div class="lg:col-span-7">
          <QuoteForm />
        </div>

      </div>

    </div>
  </div>
</template>