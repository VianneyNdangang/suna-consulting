<script setup lang="ts">

const props = defineProps<{
  title: string;
  description?: string;
  type: "success" | "danger" | "warning" | "info";
}>();

const colors = {
  success: "success",
  danger: "error",
  warning: "warning",
  info: "info",
} as const;
</script>

<template>
  <UAlert
    :title="title"
    :description="description"
    :color="colors[type]"
    variant="subtle"
    class="w-96 shadow-lg"
  />
</template>