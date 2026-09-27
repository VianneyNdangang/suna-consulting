<template>
  <Card>
    <template #header>
      <div>
        <div class="flex items-center justify-start gap-1">
          <Icon
            name="i-tabler-adjustments-horizontal"
            class="text-(--text-muted)"
          />
          <span class="font-bold"> Filtre</span>
        </div>
      </div>
    </template>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">
      <SearchFile
        class="md:col-span-3"
        url="/testimonials"
        option-label="author_name"
        option-value="id"
      />
      <div class="flex w-full gap-4 md:col-span-2">
      <div
        class="flex flex-col md:flex-row justify-start md:items-center w-full gap-1"
      >
        <span class="text-(--text-secondary)">Statut:</span>
        <Select
          v-model="status"
          name="service"
          :options="statusOptions"
        />
      </div>
      <div
        class="flex flex-col md:flex-row justify-start md:items-center w-full gap-1"
      >
        <span class="text-(--text-secondary) whitespace-nowrap">Limite par page:</span>
        <Select
          v-model="limit"
          name="service"
          :options="limitOptions"
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

const store = useUserStore();
const status = ref("all");
const limit = ref(20);

const statusOptions = [
  {
    label: "Tout",
    value: "all",
  },
  {
    label: "Actif",
    value: true,
  },
  {
    label: "Inactif",
    value: false,
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
  [status, limit],
  async () => {
    const data = {
      is_active: status.value === "all" ? undefined : status,
    };
    //    await store.fetchUsers(undefined, data)
    await store.fetchUsers();
  },
  { immediate: true },
);
</script>
