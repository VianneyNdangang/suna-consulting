<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  title: string;
  description?: string;
  type: "success" | "danger" | "warning" | "info";
}>();

const variants = computed(() => ({
  success: "border-success",
  danger: "border-danger",
  warning: "border-warning",
  info: "border-info",
})[props.type]);
</script>

<template>
  <div
    class="w-96 rounded bg-sand-50 border-l-4 shadow-lg p-2 transition-all"
    :class="variants"
  >
    <p class="font-semibold text-rust-900">
      {{ title }}
    </p>

    <p
      v-if="description"
      class="text-sm text-rust-600"
    >
      {{ description }}
    </p>
  </div>
</template>