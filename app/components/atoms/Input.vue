<script setup lang="ts">
const props = defineProps<
    {
        type: string,
        name: string,
        placeholder: string,
        icon: any,
    }>()
</script>

<template>
    <div>
        <input :placeholder=$props.placeholder name=[props.name]/> 
    </div>
</template>
