<script setup lang="ts">
import Avatar from './Avatar.vue';

const props = defineProps<{
    items: any[]
    size: 'sm'|'md'|'lg'
}>()
</script>

<template>
    <UAvatarGroup size="size">
        <Avatar v-for="item in items" :name="item.name" :src="item.src"/>
    </UAvatarGroup>
</template>