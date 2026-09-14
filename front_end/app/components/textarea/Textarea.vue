<template>

      <UFormField
    :label="label"
    :error="error"
    :ui="{ label: labelClass }"
    class="w-full"
  >
      <UTextarea
        v-model="model"
        :name="props.name"
        :placeholder="props.placeholder"
        :id="props.name"
        class="w-full rounded"
      />
      </UFormField>
</template>
<script setup lang="ts">
const model = defineModel<string>();
const props = withDefaults(defineProps<{
  label?: string;
  name: string;
  placeholder?: string;
  error?: string;
  icon?: any;
  labelClass?: string;
}>(), {
  labelClass: 'text-sm font-semibold text-slate-700'
});

</script>
