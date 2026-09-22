<template>
  <div class="admin-layout">
    <!-- <AppHeader /> -->
    <Clientnavbar/>
    <UMain class="h-full w-full  bg-(--bacgroung)">
      <NuxtPage />
    </UMain>
  </div>
</template>
<script setup lang="ts">
import Clientnavbar from '~/components/client/Clientnavbar.vue';

// const colorMode = useColorMode();
// colorMode.preference = "dark";
</script>
<!-- <style src="../assets/css/main.css"></style> -->
<style src="../assets/css/adminStyle.css"></style>
