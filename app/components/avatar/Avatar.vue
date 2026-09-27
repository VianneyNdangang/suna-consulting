<template>
  <UAvatar :src="src" :size="size" :alt="name" loading="lazy" />
</template>
<script setup lang="ts">

const props = defineProps<{
    src?: any,
    size?: 'sm'|'md'|'lg'
    name?: string
}>()
</script>