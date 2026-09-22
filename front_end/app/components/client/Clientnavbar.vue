<template>
  <div class="sticky top-0 z-100 bg-(--surface) text-(--text-primary)">
    <!-- Top banner with Cameroonian touch & direct contact info -->
    <div
      class="bg-linear-to-r from-rust-900 via-rust-800 to-rust-950 text-sand-50 text-xs py-1.5 px-4 hidden md:block"
    >
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-4">
          <span class="inline-flex items-center gap-1.5 text-gold-300">
            <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5" />
            Douala, Cameroun
          </span>
          <span class="text-white/30">•</span>
          <span class="text-white/80"
            >Accompagnement & Représentation de la Diaspora</span
          >
        </div>
        <div class="flex items-center gap-5">
          <a
            href="https://wa.me/237679188336"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <UIcon :name="IconWhatsApp" class="w-3.5 h-3.5" />
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
      class="sticky top-0 z-100 transition-all duration-300 border-b"
      :class="
        isScrolled
          ? 'backdrop-blur-md shadow-sm border-gold-400/20 py-2.5'
          : 'backdrop-blur-sm border-rust-900/10 py-3.5'
      "
    >
      <div
        class="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <UColorModeImage
            light="/SC-H01.png"
            dark="/SC-H03.png"
            :width="200"
            :height="48"
            class="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
          />
        </NuxtLink>

        <!-- Desktop Navigation Links -->
        <nav v-if="!serviceStore.loading" class="hidden lg:flex items-center">
          <UNavigationMenu
            :items="appMenus"
            orientation="horizontal"
            disableHoverTrigger
            :ui="{
              link: 'px-3 py-2 text-sm font-medium text-(--text-secondary) hover:text-(--secondary)',
            }"
          />
        </nav>
        <div class="flex items-center gap-3">
          <!-- Header Actions -->
          <div class="flex items-center gap-3">
            <span
              class="hidden lg:flex text-(--text-secondary) p-1 rounded-md border border-(--border) hover:bg-(--hover)"
            >
              <UIcon name="i-lucide-user" size="20" />
            </span>
            <LocaleButton />
            <UColorModeButton class="border border-(--border)" />
          </div>

          <!-- Mobile Burger Menu Button -->
          <div class="flex items-center gap-2 lg:hidden">
            <Button
              type="button"
              variant="ghost"
              :icon="isMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
              @click="isMenuOpen = !isMenuOpen"
              aria-label="Menu"
            />
          </div>
        </div>
      </div>
      <!-- <div class="bg-rust-600 w-full p-2"> -->
      <!-- </div> -->
      <!-- Mobile Slideover / Dropdown Menu -->
      <UDrawer title="Menu" v-model:open="isMenuOpen" direction="top">
        <template #body>
          <USeparator />
          <UNavigationMenu
            :items="appMenus"
            orientation="vertical"
            :ui="{
              link: 'px-3 py-2 text-sm font-medium text-ink-700 hover:text-rust-700',
              linkLeadingIcon: 'text-rust-600',
            }"
          />
          <USeparator />
          <div class="mt-3 flex flex-col gap-3">
            <Button
              to="/quote"
              variant="primary"
              type="button"
              icon="i-lucide-calculator"
              size="sm"
              label="Demander un devis"
              @click="isMenuOpen = false"
            />
            <Button
              to="https://wa.me/237679188336"
              variant="ghost"
              type="button"
              color="success"
              :icon="IconWhatsApp"
              size="sm"
              label="WhatsApp Direct"
            />
          </div>
        </template>
      </UDrawer>
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { IconWhatsApp } from "../svg/svg";
import Button from "../buttons/Button.vue";
import { useAppMenus } from "~/menu/menu";
import LocaleButton from "../locale/LocaleButton.vue";

const isMenuOpen = ref(false);
const isScrolled = ref(false);
const serviceStore = useServiceStore();
const appMenus = useAppMenus().appMenus;

const handleScroll = () => {
  if (typeof window !== "undefined") {
    isScrolled.value = window.scrollY > 20;
  }
};
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
