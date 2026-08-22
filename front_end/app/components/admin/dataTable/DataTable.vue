<template>
  <CardDesign>
    <div v-if="loading" class="space-y-3 p-2" aria-busy="true" aria-label="Chargement">
      <USkeleton v-for="index in 6" :key="index" class="h-10 w-full" />
    </div>
    <EmptyState v-else-if="!records.length" title="Aucune utilisateur" message="Aucune donné de ce tableau n'a été trouvé"/>
    <div v-else><p class="mt-2 text-lg font-semibold text-(--text-secondary)">
      List of {{ totalRecords }} {{ title }}.
    </p>

    <table class="w-full">
      <thead class="h-10 text-(--text-thirdly) text-sm font-semibold border-b border-(--border)">
        <tr>
          <th
            v-for="header in props.headers"
            :key="header.accessor"
            :class="`whitespace-nowrap text-${header.textAlign} px-3 py-4 max-w-${header.width || 'auto'} border-b border-(--border)`"
          >
            {{ header.name }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in paginatedRecords"
          :key="item.id"
          class="hover:bg-(--hover) h-10"
        >
          <td
            v-for="header in props.headers"
            :key="header.accessor"
            :class="`px-3 py-2 border-b text-${header.textAlign} text-(--text-secondary) border-(--border)`"
          >
            <component
              v-if="isVNode(header.render(item))"
              :is="header.render(item)"
            />

            <template v-else>
              {{ header.render(item) }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-5">
      <p class="text-sm text-(--text-third)">
        Page {{ currentPage }} sur {{ totalPages }}
      </p>

      <div class="flex gap-2">
        <Button
          :click="()=>{changePage(currentPage - 1)}"
          label="Previous"
         type="button"
         variant="ghost"
         :disabled="currentPage != totalPages"
        />
          
        <!-- </Button> -->

        <button
          v-for="page in pages"
          :key="page"
          @click="changePage(page)"
          :class="[
            'px-3 py-1 rounded border',
            page === currentPage
              ? 'bg-(--primary) text-white'
              : 'border-(--border)',
          ]"
        >
          {{ page }}
        </button>

        <Button
          :click="()=>{changePage(currentPage + 1)}"
          label="Next"
         type="button"
         variant="ghost"
         :disabled="currentPage === totalPages"
        />
      </div>
    </div>
    </div>
  </CardDesign>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { isVNode } from "vue";
import Card from "../card/Card.vue";
import EmptyState from "../emptyState/EmptyState.vue";
import CardDesign from "../cardDesign/CardDesign.vue";


export type TTableheaders = {
  textAlign: "left" | "right" | "center";
  accessor: string;
  name: string;
  render: (param: any) => any;
  width?: "28" | "32" | "36" | "38" | "40" | "44" | "auto";
};

export type TDatatableProps = {
  headers: TTableheaders[];
  records: any[];
  title: string;
  loading?: boolean

  itemsperPage?: number;
  page?: number;
};

const props = defineProps<TDatatableProps>();

const emit = defineEmits<{
  (e: "changePage", page: number): void;
}>();

const currentPage = ref(props.page || 1);

const itemsPerPage = computed(() => props.itemsperPage || 10);

const totalRecords = computed(() => props.records.length);

const totalPages = computed(() =>
  Math.ceil(totalRecords.value / itemsPerPage.value),
);

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;

  return props.records.slice(start, start + itemsPerPage.value);
});

// Génération des numéros de pages
const pages = computed(() => {
  return Array.from({ length: totalPages.value }, (_, i) => i + 1);
});

function changePage(page: number) {
  if (page < 1 || page > totalPages.value) return;

  currentPage.value = page;

  emit("changePage", page);
}
</script>
