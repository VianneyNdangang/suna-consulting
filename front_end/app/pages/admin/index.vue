<template>
  <div class="admin">
    <h1 class="text-rust-900">Admin - Dashboard</h1>
    <nuxt-link to="/admin/users">Gérer les utilisateurs</nuxt-link>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' });
</script>

<style scoped>
.admin { max-width: 1000px; margin: 2rem auto; }
</style>
