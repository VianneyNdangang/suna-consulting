<template>
  <UButton
    :type="type"
    :label="label"
    :loading="loading"
    :variant="
      variant === 'secondary'
        ? 'outline'
        : variant === 'ghost'
          ? 'ghost'
          : 'solid'
    "
    :class="[
      `w-${w}`,
      'rounded font-bold py-2 px-3 flex justify-center items-center max-h-8',
      variant === 'secondary'
        ? (color ?? ` text-rust-600`)
        : variant === 'primary'
          ? `bg-rust-600 text-white  `
          : (color ?? `text-rust-600`),
    ]"
    :icon="icon"
    :color="color"
    @click="props.click"
  >
    <span class="whitespace-nowrap">
      {{ loading ? "Loading..." : label }}
    </span>
  </UButton>
</template>
<script setup lang="ts">
// import VueIcon from "@kalimahapps/vue-icons/VueIcon";

const props = defineProps<{
  variant: "primary" | "secondary" | "ghost";
  label?: string;
  loading?: boolean;
  type: "submit" | "button";
  click?: () => any;
  w?: string;
  icon?: any;
  color?: "error" | "success" | "warning";
}>();
</script>
