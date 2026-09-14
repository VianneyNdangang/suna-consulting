<template>
  <Splitter :items="items">
    <template #left>
      ...
    </template>

    <template #main>
      ...
    </template>

    <template #right>
      ...
    </template>
  </Splitter>
</template>

<script setup lang="ts">
// import type { SplitterItem } from '@nuxt/ui'

definePageMeta({
  layout: 'client'
})

const card =
  'bg-elevated/50 border border-default rounded-xl flex items-center justify-center text-muted font-medium'

const items= [
  {
    slot: 'left',
    defaultSize: 25,
    class: card
  },
  {
    slot: 'main',
    defaultSize: 50,
    class: card
  },
  {
    slot: 'right',
    defaultSize: 25,
    class: card
  }
]
</script>