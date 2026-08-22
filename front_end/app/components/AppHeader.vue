<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { appMenus } from '../menu/menu';
import AuthModal from './modal/AuthModal.vue';

const route = useRoute();
const isMenuOpen = ref(false);
const isAuthModalOpen = ref(false);
const isScrolled = ref(false);

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 20;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div>
    <!-- Top banner with Cameroonian touch & direct contact info -->
    <div class="bg-linear-to-r from-rust-900 via-rust-800 to-rust-950 text-sand-50 text-xs py-1.5 px-4 hidden md:block">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-4">
          <span class="inline-flex items-center gap-1.5 text-gold-300">
            <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5" />
            Yaoundé & Douala, Cameroun
          </span>
          <span class="text-white/30">•</span>
          <span class="text-white/80">Accompagnement & Représentation de la Diaspora</span>
        </div>
        <div class="flex items-center gap-5">
          <a
            href="https://wa.me/237679188336"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <UIcon name="i-lucide-message-circle" class="w-3.5 h-3.5" />
            WhatsApp Direct: +237 679 188 336
          </a>
          <span class="text-white/30">•</span>
          <a
            href="mailto:sunaconsulting@gmail.com"
            class="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
          >
            <UIcon name="i-lucide-mail" class="w-3.5 h-3.5" />
            sunaconsulting@gmail.com
          </a>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar with Glassmorphism -->
    <header
      class="sticky top-0 z-40 transition-all duration-300 border-b"
      :class="isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-gold-400/20 py-2.5' : 'bg-sand-25/95 backdrop-blur-sm border-rust-900/10 py-3.5'"
    >
      <div class="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <NuxtImg
            src="/SC-H01.png"
            alt="Súna Consulting - Votre représentant de confiance au Cameroun"
            width="200"
            height="48"
            sizes="180px md:220px"
            quality="100"
            format="webp"
            class="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
          />
        </NuxtLink>

        <!-- Desktop Navigation Links -->
        <nav class="hidden lg:flex items-center">
          
          <UNavigationMenu
            :items="appMenus"
            orientation="horizontal"
            :ui="{
              link: 'px-3 py-2 text-sm font-medium text-ink-700 hover:text-rust-700',
              linkActive: 'text-rust-700 underline decoration-gold-500 decoration-2 underline-offset-8',
              linkLeadingIcon: 'text-rust-600'
            }"
          />
        </nav>

        <!-- Header Actions -->
        <div class="hidden sm:flex items-center gap-3">
          <!-- Auth / Client Space Button -->
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-user"
            size="sm"
            class="text-rust-900 hover:text-rust-600 hover:bg-gold-400/15"
            @click="isAuthModalOpen = true"
          >
            Espace Client
          </UButton>

          <!-- Quote CTA Button -->
          <UButton
            to="/quote"
            color="primary"
            variant="solid"
            icon="i-lucide-calculator"
            size="sm"
            class="bg-rust-600 hover:bg-rust-700 text-white shadow-md shadow-rust-600/20 font-medium px-4 py-2"
          >
            Demander un devis
          </UButton>
        </div>

        <!-- Mobile Burger Menu Button -->
        <div class="flex items-center gap-2 lg:hidden">
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-user"
            size="sm"
            class="text-rust-900"
            @click="isAuthModalOpen = true"
            aria-label="Espace Client"
          />

          <UButton
            color="neutral"
            variant="ghost"
            :icon="isMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            size="md"
            class="text-rust-900"
            @click="isMenuOpen = !isMenuOpen"
            aria-label="Menu"
          />
        </div>
      </div>

      <!-- Mobile Slideover / Dropdown Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isMenuOpen"
          class="lg:hidden border-t border-gold-200/70 bg-sand-25 px-4 pb-5 pt-3 shadow-lg"
        >
          <nav class="flex flex-col">
            <NuxtLink
              v-for="menu in appMenus"
              :key="menu.to"
              :to="menu.to"
              @click="isMenuOpen = false"
              class="flex items-center justify-between border-b border-gold-200/50 px-1 py-3 text-sm font-medium transition-colors"
              :class="
                route.path === menu.to
                  ? 'text-rust-700 underline decoration-gold-500 decoration-2 underline-offset-4'
                  : 'text-ink-700 hover:text-rust-600'
              "
            >
              <span>{{ menu.label }}</span>
              <UIcon name="i-lucide-arrow-up-right" class="h-4 w-4 text-gold-600" />
            </NuxtLink>
          </nav>

          <div class="mt-3 flex flex-col gap-2.5 border-t border-gold-200/70 pt-4">
            <UButton
              to="/quote"
              @click="isMenuOpen = false"
              block
              class="bg-rust-600 hover:bg-rust-700 text-white font-semibold py-2.5"
              icon="i-lucide-calculator"
            >
              Demander un devis
            </UButton>

            <a
              href="https://wa.me/237679188336"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <UIcon name="i-lucide-message-circle" class="w-4 h-4 text-emerald-600" />
              WhatsApp Direct
            </a>
          </div>
        </div>
      </Transition>
    </header>

    <!-- Client Auth Modal -->
    <AuthModal v-model="isAuthModalOpen" />
  </div>
</template>
