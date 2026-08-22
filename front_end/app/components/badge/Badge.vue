<template>
  <UBadge
    icon="i-lucide-rocket"
    :size="size"
    :color="color"
    :variant="variant"
    >{{ message }}</UBadge
  >
</template>

<script setup lang="ts">
const props = defineProps<{
  message: string;
  size?: "lg" | "md" | "sm";
  variant: "solid" | "subtle";
  color: "success" | "info" | "warning" | "error";
}>();
</script>
