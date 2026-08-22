<template>
    <UCard class="overflow-auto" :class="props.w ? `w-${props.w}` : 'w-full'">
        <slot />
    </UCard>
</template>
<script setup lang="ts">
const props = defineProps<{w?:string}>()
</script>