<template>
  <header class="flex flex-col gap-4 border-b border-(--border) pb-5 sm:flex-row sm:items-end sm:justify-between">
    <div class="min-w-0">
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-(--secondary)">Espace client</p>
      <h1 class="mt-1 truncate text-2xl font-black text-(--text-primary) sm:text-3xl">{{ title }}</h1>
      <p v-if="subtitle" class="mt-2 max-w-2xl text-sm leading-relaxed text-(--text-secondary)">{{ subtitle }}</p>
    </div>
    <Button
      v-if="actionLabel"
      :to="actionTo"
      :label="actionLabel"
      type="button"
      variant="primary"
      :icon="actionIcon"
      class="shrink-0"
    />
  </header>
  
</template>

<script setup lang="ts">
import Button from "~/components/buttons/Button.vue";

const props = defineProps<{
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  actionTo?: string;
  actionIcon?: string;
}>();
</script>
