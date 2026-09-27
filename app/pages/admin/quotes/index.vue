<template>
  <div class="flex flex-col gap-3">
    <PageHeader
      title="Commandes"
      subtitle="Manage client, permissions, and access"
      :refresh="() => store.fetchquotes()"
      :loading="loading"
    />
    <div class="grid grid-cols-2 gap-3 lg:grid-cols-5 mb-4">
        <DataSommary
          v-for="stat in stats"
          :key="stat.title"
          :icon="stat.icon"
          :title="stat.title"
          :value="stat.value"
          :description="stat.description"
          :state="stat.state"
        />
      </div>
      <QuotesFilter/>
    <div class="flex">
      <Card
      >
        <DataTable :data="quotes" :columns="columns" :loading="store.loading"/>
      </Card>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "admin",
  roles: ['ADMIN', 'SUPER_ADMIN'],
  middleware: ['role']
});

import { ref, onMounted, h } from "vue";
import { storeToRefs } from "pinia";
import type { TableColumn } from "@nuxt/ui";
import DataTable from "~/components/admin/dataTable/DataTable.vue";
import PageHeader from "~/components/admin/pageHeader/PageHeader.vue";
import Card from "~/components/Card/Card.vue";
import DataSommary from "~/components/admin/dataSommary/DataSommary.vue";
import { formatDate, statusColor, statusLabel, urgencyColor, urgencyLabel } from "~/helpers/formateData";
import QuotesFilter from "~/components/admin/filter/QuotesFilter.vue";

const isUpdateStatus = ref(false);

const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UUser = resolveComponent("UUser");

const selectedQuote = ref();
const store = usequotestore();
const { quotes, loading} = storeToRefs(store);

onMounted(async () => {
  await store.fetchquotes();
});

const stats = computed(() => {
  const total = quotes.value.length;

  const pending = quotes.value.filter(
    (quote: any) => quote.status === "pending"
  ).length;

  const inProgress = quotes.value.filter(
    (quote: any) => quote.status === "in_progress"
  ).length;

  const completed = quotes.value.filter(
    (quote: any) => quote.status === "ended"
  ).length;

  const canceled = quotes.value.filter(
    (quote: any) => quote.status === "canceled"
  ).length;

  return [
     {
      title: "Total des commandes",
      value: total,
      description: "Ensemble des commandes enregistrées",
      state: "primary" as const,
      icon: "i-lucide-shopping-bag",
    },
    {
      title: "Commandes en attente",
      value: pending,
      description: "Commandes en attente de traitement",
      state: "warning" as const,
      icon: "i-lucide-clock-3",
    },
    {
      title: "Commandes en cours",
      value: inProgress,
      description: "Commandes actuellement traitées",
      state: "primary" as const,
      icon: "i-lucide-loader-circle",
    },
    {
      title: "Commandes terminées",
      value: completed,
      description: "Commandes finalisées",
      state: "success" as const,
      icon: "i-lucide-circle-check",
    },
    {
      title: "Commandes annulées",
      value: completed,
      description: "Commandes annulées",
      state: "danger" as const,
      icon: "i-tabler-trash",
    },
  ]
})

const columns: TableColumn<any>[] = [
  {
    accessorKey: "number",
    header: "Numéro",
    cell: ({ row }) => `#${row.getValue("number")}`,
    meta: {
      class: {
        td: "text-(--text-secondary) font-bold",
      },
    },
  },
  {
    header: "Client",
    cell: ({ row }) => {
      const user = row.original;
      
      return h(UUser, {
        name: user.full_name,
        description: user.email,
        // email: user.to,
        avatar: { src: user.avatar, alt: user.full_name },
      });
    },
  },
  {
    accessorKey: "urgency",
    header: "Urgence",
    cell: ({ row }) => h(UBadge, {
      color: urgencyColor(row.getValue("urgency") as string),
      variant: "subtle",
      class: "capitalize",
    }, () => urgencyLabel(row.getValue("urgency") as string)),
  },
  {
    header: "Localisation",
    cell: ({ row }) =>{
      const user = row.original;
      const location = user.city + `, `+user.country
      return location
    },
    meta: {
      class: {
        td: "text-(--text-secondary) font-bold",
      },
    },
  },
  {
    accessorKey: "phone",
    header: "Téléphone",
    meta: {
      class: {
        td: "text-(--text-secondary) font-bold",
      },
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => h(UBadge, {
      color: statusColor(row.getValue("status") as string),
      variant: "subtle",
      class: "capitalize",
    }, () => statusLabel(row.getValue("status") as string)),
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
      label: "Voir les détails",
      class: 'cursor-pointer',
      onSelect() {
        navigateTo(`quotes/${row.original.id}`)
      },
    },
    {
      label: "Modifier le statut",
      class: 'cursor-pointer',
      onselect() {
        selectedQuote.value = row.original;
        isUpdateStatus.value = true;
        console.log("row.originalrow.original",row.original)
      },
    },
  ];
}
</script>
