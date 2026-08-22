<template>
  <UFormField :label="label" :error="error" class="w-full">
    <USelect
      v-model="model"
      :name="name"
      :options="options"
      :placeholder="placeholder || 'Sélectionner'"
      :color="error ? 'error' : 'neutral'"
      class="w-full"
    />
  </UFormField>
</template>

<script setup lang="ts">
const model = defineModel<string | number>();

const props = defineProps<{
  label?: string;
  name: string;
  placeholder?: string;
  error?: string;
  options: {
    label: string;
    value: string | number;
  }[];
}>();
</script>