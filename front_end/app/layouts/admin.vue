<script setup lang="ts">
const colorMode = useColorMode()
</script>

<template>
    <div class="admin-layout" :class="{ dark: colorMode.value === 'dark' }">
        <AdminSidebar>
            <UMain class="h-full w-full bg-(--background) p-3 text-(--text-primary)">
                <slot />
            </UMain>
        </AdminSidebar>
    </div>

</template>
<style src="../assets/css/adminStyle.css"></style>


