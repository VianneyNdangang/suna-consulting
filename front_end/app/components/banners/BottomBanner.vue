<template>
    <div class="mt-14 rounded-2xl bg-linear-to-r from-ink-900 via-rust-950 to-ink-900 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-gold-400/30">
        <div class="space-y-1 text-center sm:text-left">
          <div class="flex items-center justify-center sm:justify-start gap-2 text-gold-300 text-xs font-bold uppercase tracking-wider">
            <UIcon :name="icon" class="w-4 h-4" />
            {{ title }}
            
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-white">
            {{ subtitle }}
           
          </h3>
          <p class="text-xs sm:text-sm text-sand-50/80">
            {{ description }}
          </p>
        </div>

        <div class="flex shrink-0 items-center gap-3">
          <Button
            to="/quote"
            type="button"
            size="md"
            variant="primary"
            class="bg-rust-600 hover:bg-rust-500 text-white font-semibold px-5 py-2.5 shadow-md"
            icon="i-lucide-calculator"
          
            label="Devis personnalisé"
          />
         <a
              href="https://wa.me/237679188336"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-3 py-2 max-h-8 rounded bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-colors"
            >
              <UIcon
                :name="IconWhatsApp"
                class="w-4 h-4"
              />
              WhatsApp
            </a>
        </div>
      </div>
</template>

<script setup lang="ts">
import Button from '../buttons/Button.vue';
import { IconWhatsApp } from '../svg/svg';
 
const props = defineProps<{
 title?: string;
 subtitle?: string;
 description?: string;
 icon?: any
}>()

</script>