<template>
  <div class="flex flex-col gap-3 mb-3">
    <PageHeader
      title="Services"
      subtitle="Managez vos services."
      :loading="loading"
      :refresh="() => store.fetchServices()"
      :new="newData"
    />
    <FilterBar/>
    <section>
      <div
        v-if="loading"
        class="space-y-3"
        aria-busy="true"
        aria-label="Chargement des services"
      >
        <USkeleton v-for="index in 5" :key="index" class="h-10 w-full" />
      </div>
      <div v-else>
        <UCard class="bg-(--card) shadow-xs">
          <DataTable
            :data="store.services"
            maxH="200"
            :total="100"
            :page="1"
            :limit="10"
            :columns="columns"
          />
        </UCard>
      </div>
    </section>
    <ServiceForm
      :service="selectedService || null"
      v-model="isServiceForm"
      @update:model-value="
        (value) => {
          if (!value) {
            closeServiceForm();
          } else {
            isServiceForm = value;
          }
        }
      "
    />
    <ActiveteService :service="selectedService || null" v-model="isActiveForm"/>
  </div>
  
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  roles: ['ADMIN', 'SUPER_ADMIN'],
  middleware: ['role']
});
import type { TableColumn } from "@nuxt/ui";
import DataTable from "~/components/admin/dataTable/DataTable.vue";
import FilterBar from "~/components/admin/filter/FilterBar.vue";
import ActiveteService from "~/components/admin/forms/ActiveteService.vue";
import ServiceForm from "~/components/admin/forms/ServiceForm.vue";
import PageHeader from "~/components/admin/pageHeader/PageHeader.vue";
import { formatDate } from "~/helpers/formateData";
import { type servicesType } from "~/types/types";

const newData = {
  label: "Nouveau service",
  action: () => (isServiceForm.value = true),
  icon: "i-tabler-plus",
};

const store = useServiceStore();
const loading = computed(() => store.loading);

const selectedService = ref<servicesType | null>(null);
const isServiceForm = ref(false);
const isActiveForm = ref(false);
function closeServiceForm() {
  isServiceForm.value = false;
  selectedService.value = null;
}

onMounted(async () => {
  store.fetchServices();
});

const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const columns: TableColumn<any>[] = [
  {
    accessorKey: "title",
    header: "Titre",
     size: 250,
  minSize: 200,
  maxSize: 350,
    meta: {
      class: {
        td: "text-(--text-primary) font-semibold",
      },
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "display_order",
    header: "Niveau"
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      const color = {
        true: "success" as const,
        false: "error" as const,
      }[row.getValue("is_active") as string];

      return h(UBadge, { class: "capitalize", variant: "subtle", color }, () =>
        row.getValue("is_active") === true ? "Actif" : "Inactif",
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => formatDate(row.getValue("created_at") as string),
  },
  {
    id: "actions",
    header: "Actions",
    meta: {
      class: {
        td: "text-right",
      },
    },
    cell: ({ row }) => {
      return h(
        UDropdownMenu,
        {
          content: {
            align: "end",
          },
          items: getRowItems(row),
          "aria-label": "Actions dropdown",
        },
        () =>
          h(UButton, {
            icon: "i-lucide-ellipsis-vertical",
            color: "neutral",
            variant: "ghost",
            "aria-label": "Actions dropdown",
            class: 'cursor-pointer'
          }),
      );
    },
  },
];

function getRowItems(row: any) {
  return [
    {
      type: "label",
      label: "Actions",
    },
    {
      type: "separator",
    },
    {
      label: row.original.is_active? "Désactiver" : "Activer",
      class: 'cursor-pointer',
      onSelect() {
        selectedService.value = row.original;
        isActiveForm.value = true;
      },
    },
    {
      label: "Modifier",
      class: 'cursor-pointer',
      onSelect() {
        selectedService.value = row.original;
        isServiceForm.value = true;
      },
    },
  ];
}
</script>
