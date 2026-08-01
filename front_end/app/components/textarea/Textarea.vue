<template>
  <div class="space-y-1">
    <label :for="props.name" class="text-sm font-medium text-rust-600">
      {{ props.label }}
    </label>

    <div class="relative">
      <textarea
        v-model="model"
        :name="props.name"
        :placeholder="props.placeholder"
        class="w-full rounded-md border-2 focus:border-rust-600 py-2 pl-3 placeholder:text-gray-500 focus:outline-none"
        :class="props.error ? 'border-danger' : 'border-rust-600'"
      />
    </div>

    <p class="text-xs text-(--danger)">
      {{ props.error }}
    </p>
  </div>
</template>
<script setup lang="ts">
const model = defineModel<string>();
const props = defineProps<{
  label?: string;
  name: string;
  placeholder: string;
  error?: string;
  icon?: any;
}>();
</script>
