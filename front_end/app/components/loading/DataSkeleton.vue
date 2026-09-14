<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'cards' | 'text' | 'list' | 'table'
  count?: number
}>(), {
  variant: 'cards',
  count: 3
})
</script>

<template>
  <div v-if="variant === 'cards'" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Chargement">
    <div v-for="index in count" :key="index" class="rounded border border-gold-200/60 bg-white p-5 shadow-xs">
      <USkeleton class="mb-5 h-12 w-12 rounded" />
      <USkeleton class="mb-3 h-5 w-4/5" />
      <USkeleton class="mb-2 h-4 w-full" />
      <USkeleton class="h-4 w-2/3" />
    </div>
  </div>

  <div v-else-if="variant === 'text'" class="space-y-3" aria-busy="true" aria-label="Chargement">
    <USkeleton class="h-5 w-32" />
    <USkeleton class="h-10 w-full max-w-2xl" />
    <USkeleton class="h-4 w-full max-w-xl" />
    <USkeleton class="h-4 w-4/5 max-w-lg" />
  </div>

  <div v-else-if="variant === 'list'" class="space-y-4" aria-busy="true" aria-label="Chargement">
    <div v-for="index in count" :key="index" class="flex items-center gap-4 rounded-2xl border border-gold-200/60 bg-white p-4 shadow-sm">
      <USkeleton class="h-11 w-11 shrink-0 rounded-xl" />
      <div class="min-w-0 flex-1 space-y-2">
        <USkeleton class="h-4 w-2/5" />
        <USkeleton class="h-3 w-4/5" />
      </div>
    </div>
  </div>

  <div v-else class="space-y-3" aria-busy="true" aria-label="Chargement">
    <USkeleton v-for="index in count" :key="index" class="h-12 w-full rounded-lg" />
  </div>
</template>
