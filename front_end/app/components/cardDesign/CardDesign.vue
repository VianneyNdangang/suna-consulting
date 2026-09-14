<template>
  <UCard
    :title="title"
    :description="description"
    variant="solid"
    class="bg-(--card) text-(--text-primary) shadow"
    :class="props.w ? `w-${props.w} max-h-${maxH}` : `w-full max-h-${maxH}`"
  >
    <template v-if="$slots.header" #header>
      <slot name="header"/>
    </template>
    <slot />
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps<{
  w?: string
  title?: string
  description?: string,
  maxH?: string,
}>()
</script>