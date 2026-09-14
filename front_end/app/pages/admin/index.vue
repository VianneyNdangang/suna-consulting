<template>
  <div>
  <div>
    <h1 class="text-rust-900">Admin - Dashboard</h1>
    <nuxt-link to="/admin/users">Gérer les utilisateurs</nuxt-link>
  </div>

  <UCard class="bg-(--card) border border-(--border)">
    <UTable
      sticky
      :data="data"
      class="flex-1"
      loading
      loading-color="primary"
      loading-animation="swing"
      debug-headers
    />
  </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "admin" });

const data = ref([
  {
    ad: "4600",
    date: "2024-03-11T15:30:00",
    status: "paid",
    email: "james.anderson@example.com",
    amount: 594,
  },
  {
    ad: "4599",
    date: "2024-03-11T10:10:00",
    status: "failed",
    email: "mia.white@example.com",
    amount: 276,
  },
  {
    ad: "4598",
    date: "2024-03-11T08:50:00",
    status: "refunded",
    email: "william.brown@example.com",
    amount: 315,
  },
  {
    ad: "4597",
    date: "2024-03-10T19:45:00",
    status: "paid",
    email: "emma.davis@example.com",
    amount: 529,
  },
  {
    ad: "4596",
    date: "2024-03-10T15:55:00",
    status: "paid",
    email: "ethan.harris@example.com",
    amount: 639,
  },
  {
    ad: "4595",
    date: "2024-03-10T15:55:00",
    status: "paid",
    email: "ethan.harris@example.com",
    amount: 639,
  },
  {
    ad: "4594",
    date: "2024-03-10T15:55:00",
    status: "paid",
    email: "ethan.harris@example.com",
    amount: 639,
  },
]);
</script>
