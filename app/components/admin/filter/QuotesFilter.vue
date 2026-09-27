<template>
  <Card>
    <template #header>
      <div class="flex items-center justify-start gap-1">
        <Icon
          name="i-tabler-adjustments-horizontal"
          class="text-(--text-muted)"
        />
        <span class="font-bold">Filtre</span>
      </div>
    </template>
    <div class="flex flex-col gap-3">
    <SearchFile url="/quotes" option-label="full_name" option-value="id" />
    <div class="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-4">
      <div class="flex w-full flex-col gap-1 md:flex-row md:items-center">
        <span class="whitespace-nowrap text-(--text-secondary)"> Statut: </span>

        <Select
          v-model="status"
          name="status"
          :options="statusOptions"
          class="w-full"
        />
      </div>

      <div class="flex w-full flex-col gap-1 md:flex-row md:items-center">
        <span class="whitespace-nowrap text-(--text-secondary)">
          Urgence:
        </span>

        <Select
          v-model="urgency"
          name="urgency"
          :options="urgencyOptions"
          class="w-full"
        />
      </div>

      <div class="flex w-full flex-col gap-1 md:flex-row md:items-center">
        <span class="whitespace-nowrap text-(--text-secondary)"> Date: </span>

        <Select
          v-model="date"
          name="date"
          :options="dateOptions"
          class="w-full"
        />
      </div>

      <div class="flex w-full flex-col gap-1 md:flex-row md:items-center">
        <span class="whitespace-nowrap text-(--text-secondary)"> Limite: </span>

        <Select
          v-model="limit"
          name="limit"
          :options="limitOptions"
          class="w-full"
        />
      </div>
    </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from "~/components/Card/Card.vue";
import SearchFile from "~/components/search/SearchFile.vue";
import Select from "~/components/select/Select.vue";

const store = usequotestore();

const status = ref("all");
const urgency = ref("all");
const date = ref("all");
const limit = ref(20);

const statusOptions = [
  {
    label: "Tout",
    value: "all",
  },
  {
    label: "En attente",
    value: "pending",
  },
  {
    label: "En cours",
    value: "in_progress",
  },
  {
    label: "Terminée",
    value: "ended",
  },
  {
    label: "Annulée",
    value: "canceled",
  },
];

const urgencyOptions = [
  {
    label: "Toutes",
    value: "all",
  },
  {
    label: "Normal (1-2 semaines)",
    value: "normal",
  },
  {
    label: "Urgent (dans la semaine)",
    value: "urgent",
  },
  {
    label: "Très urgent (48h-72h)",
    value: "veryUrgent",
  },
];

const dateOptions = [
  {
    label: "Toutes les dates",
    value: "all",
  },
  {
    label: "Aujourd'hui",
    value: "today",
  },
  {
    label: "Cette semaine",
    value: "week",
  },
  {
    label: "Ce mois",
    value: "month",
  },
  {
    label: "Cette année",
    value: "year",
  },
];

const limitOptions = [
  {
    label: "20",
    value: 20,
  },
  {
    label: "50",
    value: 50,
  },
  {
    label: "100",
    value: 100,
  },
  {
    label: "200",
    value: 200,
  },
];

watch(
  [status, urgency, date, limit],
  async () => {
    await store.fetchquotes();

    // await store.fetchquotes(undefined, {
    //   status: status.value === "all" ? undefined : status.value,
    //   urgency: urgency.value === "all" ? undefined : urgency.value,
    //   date: date.value === "all" ? undefined : date.value,
    //   limit: limit.value,
    // });
  },
  {
    immediate: true,
  },
);
</script>
