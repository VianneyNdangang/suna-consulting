<template>
  <div class="flex flex-col gap-3">
    <PageHeader
      title="Clients"
      subtitle="Manage client, permissions, and access"
      :refresh="() => userStore.fetchUsers()"
      :loading="loading"
    />
    <div class="grid grid-cols-1 gap-3 md:grid-cols-3 mb-4">
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
      <UsersFilter/>
    <div class="flex">
      <Card
      >
        <DataTable :data="users" :columns="columns" :loading="userStore.loading"/>
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
import UsersFilter from "~/components/admin/filter/UsersFilter.vue";
import DataSommary from "~/components/admin/dataSommary/DataSommary.vue";
import { formatDate } from "~/helpers/formateData";

const isCreateUser = ref(false);

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

const stats = computed(() => {
  const total = users.value.length
  const active = users.value.filter((user:any) => user.is_active).length
  const inactive = users.value.filter((user: any) => !user.is_active).length

  return [
    {
      title: "Total des clients",
      value: total,
      description: "Ensemble des clients enregistrés",
      state: "primary" as const,
      icon: "i-lucide-users",
    },
    {
      title: "Clients actifs",
      value: active,
      description: "Clients actuellement actifs",
      state: "success" as const,
      icon: "i-lucide-user-check",
    },
    {
      title: "Clients inactifs",
      value: inactive,
      description: "Clients actuellement inactifs",
      state: "warning" as const,
      icon: "i-lucide-user-x",
    },
  ]
})

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
      label: row.original?.is_active ? "Desaciver" : "Activer",
      class: 'cursor-pointer',
      onSelect() {
        selectedUser.value = row.original;
        isCreateUser.value = true;
      },
    },
    {
      label: "Envoyer un mail",
      class: 'cursor-pointer',
      onselect() {
        selectedUser.value = row.original;
        isCreateUser.value = true;
      },
    },
  ];
}
</script>
