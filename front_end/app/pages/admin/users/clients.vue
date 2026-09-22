<template>
  <div class="flex flex-col gap-3">
    <PageHeader
      title="Clients"
      subtitle="Manage client, permissions, and access"
      :refresh="() => userStore.fetchUsers()"
      :loading="loading"
    />
    <FilterBar/>
    <div class="flex">
      <CardDesign
      >
        <DataTable :data="users" :columns="columns" />
      </CardDesign>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: "admin" });
import { ref, onMounted, h } from "vue";

import { storeToRefs } from "pinia";
import type { TableColumn } from "@nuxt/ui";
import DataTable from "~/components/admin/dataTable/DataTable.vue";
import PageHeader from "~/components/admin/pageHeader/PageHeader.vue";
import FilterBar from "~/components/admin/filter/FilterBar.vue";
import CardDesign from "~/components/cardDesign/CardDesign.vue";

const isCreateUser = ref(false);
const isDeleteData = ref(false);

const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UUser = resolveComponent("UUser");

const selectedUser = ref();
const userStore = useUserStore();
const { users } = storeToRefs(userStore);
const { loading } = storeToRefs(userStore);

onMounted(async () => {
  await userStore.fetchUsers();
});

const columns: TableColumn<any>[] = [
  {
    header: "Nom d'utilisateur",
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
    accessorKey: "country",
    header: "Pays",
    meta: {
      class: {
        td: "text-(--text-secondary) font-bold",
      },
    },
  },
  {
    accessorKey: "city",
    header: "Ville",
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
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      const color = {
        true: "success" as const,
        false: "error" as const,
      }[row.getValue("is_active") as string];
      const icon = {
        true: `i-tabler-user` as const,
        false: `i-tabler-user-off` as const,
      }[row.getValue("is_active") as string];
      return h(
        UBadge,
        { class: "capitalize", variant: "subtle", color, icon },
        () => (row.getValue("is_active") === true ? `Actif` : `Inactif`),
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      return new Date(row.getValue("created_at")).toLocaleString("fr-FR", {
        day: "numeric",
        month: "long",
      });
    },
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
      label: row.original?.is_active ? "Desaciver" : "Activer",
      onSelect() {
        selectedUser.value = row.original;
        isCreateUser.value = true;
      },
    },
    {
      label: "Envoyer un mail",
      onselect() {
        selectedUser.value = row.original;
        isCreateUser.value = true;
      },
    },
  ];
}
</script>
