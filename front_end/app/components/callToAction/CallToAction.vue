<script setup lang="ts">
import { IconWhatsApp } from '../svg/svg';

// Modern CallToAction for Súna Consulting
</script>

<template>
  <section class="py-16 md:py-20 bg-sand-25 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="relative rounded-3xl bg-linear-to-br from-ink-900 via-rust-900 to-ink-800 p-8 sm:p-12 lg:p-16 text-white border border-gold-400/30 overflow-hidden text-center">
        
        <!-- Ambient lighting background circles -->
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl pointer-events-none" />
        <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-rust-600/30 rounded-full blur-3xl pointer-events-none" />

        <div class="relative z-10 max-w-3xl mx-auto space-y-6">
          
          <UBadge
            color="primary"
            variant="subtle"
            size="md"
            class="bg-gold-400/20 text-gold-300 border border-gold-400/40 px-4 py-1.5 rounded-full font-semibold text-xs uppercase tracking-widest backdrop-blur-md"
          >
            <UIcon name="i-lucide-zap" class="w-3.5 h-3.5 mr-1" />
            Passez à l'action dès aujourd'hui
          </UBadge>

          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Prêt à concrétiser vos projets au Cameroun <span class="text-transparent bg-clip-text bg-linear-to-r from-gold-300 via-amber-200 to-rust-400">sans stress ?</span>
          </h2>

          <p class="text-base sm:text-lg text-sand-50/90 leading-relaxed font-light">
            Échangez gratuitement avec un conseiller Súna et recevez un plan d’action détaillé sous 24 heures. Vous pilotez, nous exécutons avec rigueur sur le terrain.
          </p>

          <!-- CTAs -->
          <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <UButton
              to="/#devis"
              size="lg"
              color="primary"
              icon="i-lucide-calculator"
              class="w-full sm:w-auto bg-rust-600 hover:bg-rust-500 text-white font-bold px-8 py-3.5 justify-center text-base"
            >
              Demander mon devis gratuit
            </UButton>

            <a
              href="https://wa.me/237679188336"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors"
            >
              <UIcon :name="IconWhatsApp" class="w-5 h-5" />
              Échanger sur WhatsApp (+237)
            </a>
          </div>

          <!-- Trust points below CTAs -->
          <div class="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-sand-50/80">
            <span class="inline-flex items-center gap-1.5">
              <UIcon name="i-lucide-check-circle-2" class="w-4 h-4 text-gold-400" />
              100% Sans engagement
            </span>
            <span class="inline-flex items-center gap-1.5">
              <UIcon name="i-lucide-clock" class="w-4 h-4 text-gold-400" />
              Réponse garantie sous 24h
            </span>
            <span class="inline-flex items-center gap-1.5">
              <UIcon name="i-lucide-lock" class="w-4 h-4 text-gold-400" />
              Confidentialité absolue
            </span>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>
