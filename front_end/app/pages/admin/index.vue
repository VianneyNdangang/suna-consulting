<template>
  <div >
    <h1 class="text-rust-900">Admin - Dashboard</h1>
    <nuxt-link to="/admin/users">Gérer les utilisateurs</nuxt-link>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' });
</script>

