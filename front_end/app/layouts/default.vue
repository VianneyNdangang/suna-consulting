<script setup lang="ts">
import ToastContainer from '~/components/toast/ToastContainer.vue';

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