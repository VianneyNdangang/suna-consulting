<script setup lang="ts">
import ToastContainer from '~/components/toast/ToastContainer.vue';

const colorMode = useColorMode()
colorMode.preference = 'light'
</script>

<template>
  <div>
    <AppHeader />
    <main class="min-h-screen">
      <slot />
    </main>
    <ToastContainer/>
    <AppFooter />
  </div>
</template>