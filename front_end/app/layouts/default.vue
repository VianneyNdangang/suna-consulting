

<template>
  <div>
    <AppHeader />
    <UMain class="min-h-screen">
      <slot />
    </UMain>
    <AppFooter />
  </div>
</template>
<script setup lang="ts">

const store = usesite_contentStore()
const serviceStore = useServiceStore()
onMounted(async ()=>{
  await store.fetchsite_content()
  await serviceStore.fetchServices()
})

const colorMode = useColorMode()
colorMode.preference = 'light'
</script>
<style src="../assets/css/main.css"></style>