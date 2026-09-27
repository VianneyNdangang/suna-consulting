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
      :items="options"
      :placeholder="placeholder || 'Sélectionner'"
      :id="name"
      class="w-full rounded"
      :ui="{
        base:'focus-visible:border-default focus-visible:ring-0'
      }"
    />
  </UFormField>
</template>

<script setup lang="ts">
const model = defineModel<string | number | boolean>();

const props = withDefaults(defineProps<{
  label?: string;
  name: string;
  placeholder?: string;
  error?: string;
  labelClass?: string;
  options: {
    label: string;
    value: string | number | boolean | undefined;
  }[];
}>(), {
  labelClass: 'text-sm font-semibold text-slate-700'
});

</script>