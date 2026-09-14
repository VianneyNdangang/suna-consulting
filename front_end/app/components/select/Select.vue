<template>
  <UFormField
    :label="label"
    :error="error"
    :ui="{ label: labelClass }"
    class="w-full"
  >
    <USelect
      v-model="model"
      :name="name"
      :options="options"
      :placeholder="placeholder || 'Sélectionner'"
      :color="error ? 'error' : 'neutral'"
      :id="name"
      class="w-full rounded"
    />
  </UFormField>
</template>

<script setup lang="ts">
const model = defineModel<string | number>();

const props = withDefaults(defineProps<{
  label?: string;
  name: string;
  placeholder?: string;
  error?: string;
  labelClass?: string;
  options: {
    label: string;
    value: string | number;
  }[];
}>(), {
  labelClass: 'text-sm font-semibold text-slate-700'
});

</script>