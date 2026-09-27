<script setup lang="ts">
import type { ToasterProps } from '@nuxt/ui';

const toaster: ToasterProps = {
  position: 'top-right',
  expand: true,
  duration: 5000,
  ui: {
    // viewport: 'fixed top-4 right-4 z-[100]',
    base: 'rounded-mg shadow-xl',
  },
}</script>
<template>
  <UApp :toaster="toaster">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ScrollToTop />
  </UApp>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>