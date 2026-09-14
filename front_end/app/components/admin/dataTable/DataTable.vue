<template>
  <UTable
    sticky
    v-model:expanded="props.expanded"
    :data="data"
    :columns="columns"
    :loading="loading"
    loading-color="primary"
    loading-animation="carousel"
    :ui="{
      tr: `
      hover:bg-(--hover)
      data-[expanded=true]:bg-(--surface)
      transition-colors duration-200
    `,
      th: 'text-(--text-muted) bg-(--card) font-bold',
    }"
    class="flex-1 max-h-200"
    debug-headers
  >
    <template #expanded="{ row }" v-if="expanded">
      <pre><p>{{ row.original.date }}</p></pre>
    </template>
  </UTable>
  <div class="flex justify-between items-center">
    <p class="text-sm text-(--text-muted) whitespace-nowrap">
      Page {{ page }} sur {{ totalPages }}
    </p>
    <UPagination :total="total" :items-per-page="limit" :sibling-count="3" />
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  data: any[];
  columns?: TableColumn<any>[];
  loading?: boolean;
  expanded?: { number: boolean };
  maxH?: string;
  page?: number;
  total?: number;
  limit?: number;
  totalPages?: number;
}>();
// import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from "@nuxt/ui";

// const expanded = ref({ 1: true })
</script>
