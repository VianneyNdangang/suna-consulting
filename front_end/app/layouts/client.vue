<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue';

const colorMode = useColorMode()
</script>

<template>
    <div class="admin-layout">
        <AppHeader />
            <UMain class="h-full w-full bg-(--background) p-3 text-(--text-primary)">
                <slot />
            </UMain>
    </div>
</template>
<style src="../assets/css/adminStyle.css"></style>