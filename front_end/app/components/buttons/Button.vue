<template>
  <UButton
    :type="props.type"
    :label="props.label"
    :loading="props.loading"
    :variant="props.variant === 'secondary' ? 'outline' : props.variant === 'ghost' ? 'ghost' : 'solid'"
    :class="[`w-${props.w}`, 'rounded-full font-semibold bg-rust-600']"
    @click="props.click"
  />
</template>
<script setup lang="ts">
// import VueIcon from "@kalimahapps/vue-icons/VueIcon";

const props = defineProps<{
  variant: 'primary' | 'secondary' | 'ghost' | 'dark';
  label: string;
  loading?: boolean;
  type: "submit" | "button";
  click?: () => any;
  w?: string;
}>();
</script>