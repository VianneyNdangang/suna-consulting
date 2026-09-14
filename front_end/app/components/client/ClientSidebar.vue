<template>
  <div class="flex h-screen overflow-hidden">
    <USidebar
      v-model:open="open"
      collapsible="none"
      rail
      :ui="{
        container: 'mt-25 w-100',
        inner: ' divide-transparent',
        body: 'py-0'
      }"
    >
      <template #header>
        Historique
      </template>

      <template #footer>
      </template>
    </USidebar>

    <div class="flex-1 flex flex-col h-screen overflow-hidden">
        <slot />
      </div>
  </div>
</template>

<script setup lang="ts">
const open = ref(false)
</script>