<template>
  <div class="flex flex-col gap-2">
    <!-- <PageHeader
      title="Users"
      subtitle="Manage user accounts, permissions, and access le"
      :refresh="async() => {await userStore.fetchUsers()}"
      :new="newUser"
    /> -->
    
      <!-- <LoadingView v-if="" /> -->
      <div class="flex">
        <UCard class="bg-(--card) w-full rounded-(--radius) border border-(--border)">
        <DataTable
          :data="data"
          :columns="columns"
        />
        </UCard>
        <!-- <CategoriesSidebarView
        :record="['Admin', 'Category Manager', 'Food Workers']"
      /> -->
      </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'admin' });
import { ref, onMounted, h } from "vue";
// import LoadingView from "@/components/molecules/LoadingView.vue";
// import CategoriesSidebarView from "@/components/CategoriesSidebarView.vue";

import { storeToRefs } from "pinia";
import type { TableColumn } from "@nuxt/ui";
import DataTable from "~/components/admin/dataTable/DataTable.vue";

const isCreateUser = ref(false);
const isDeleteData = ref(false)
const newUser = {
  label: "New User",
  action: () => (isCreateUser.value = true),
};

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')


type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}


const data = ref<Payment[]>([
  {
    id: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639
  }
])


const selectedUser = ref();
const userStore = useUserStore();
const { users } = storeToRefs(userStore);
const {loading} = storeToRefs(userStore)

const handleDelete = async () => {
  await userStore.deleteUser(selectedUser.value.id);
};
onMounted(async () => {
  await userStore.fetchUsers();
});

const columns: TableColumn<Payment>[] = [
  {
    id: 'expand',
    cell: ({ row }) =>
      h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        icon: 'i-lucide-chevron-down',
        square: true,
        'aria-label': 'Expand',
        ui: {
          leadingIcon: [
            'transition-transform',
            row.getIsExpanded() ? 'duration-200 rotate-180' : ''
          ]
        },
        onClick: () => row.toggleExpanded()
      })
  },
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const color = {
        paid: 'success' as const,
        failed: 'error' as const,
        refunded: 'neutral' as const
      }[row.getValue('status') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('status')
      )
    }
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    meta: {
      class: {
        th: 'text-right',
        td: 'text-right font-medium'
      }
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)
    }
  }
]
</script>
