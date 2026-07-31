<template>
  <span
    class=" flex justify-center items-center rounded-full px-3 py-1 text-xs font-medium"
    :class="variants[props.type], `w-${props.w}`"
  >
    {{ props.message }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: string;
  type: "danger" | "success" | "primary" | "warning";
  w?: string
}>();

const variants = {
  danger: "bg-danger/50 text-danger",
  success: "bg-success/50 text-success",
  primary: "bg-primary/50 text-primary",
  warning: "bg-warning/50 text-warning",
} as const;
</script>