<script setup lang="ts">
const route = useRoute()
// Récupère le paramètre 'id' de l'URL
const serviceId = route.params.id 
</script>

<template>
  <div>
    <h1>Service numéro : {{ serviceId }}</h1>
  </div>
</template>