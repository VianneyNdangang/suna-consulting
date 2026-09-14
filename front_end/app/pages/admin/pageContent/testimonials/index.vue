<template>
  <div class="flex flex-col gap-3">
    <PageHeader
      title="Temoignages"
      subtitle="Managez vos temoignages."
      :loading="store.loading"
      :refresh="() => store.fetchTestimonials()"
    />
    <FilterBar />
    <section>
      <!-- <div v-if="loading" class="space-y-3" aria-busy="true" aria-label="Chargement des services">
      <USkeleton v-for="index in 5" :key="index" class="h-10 w-full" />
    </div> -->
      <div>
        <UCard class="bg-(--card) shadow-xs">
          <DataTable
            :data="store.testimonials"
            maxH="100"
            :total="100"
            :page="1"
            :limit="10"
            :columns="columns"
            :loading="loading"
          />
        </UCard>
      </div>
    </section>
    <ServiceForm :service="selectedService" v-model="isServiceForm" />
    <ActiveteTestimonial
      v-model="isActivatForm"
      :testimonial="selectedTestimonial"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  // middleware: 'auth',
  layout: "admin",
});
import type { TableColumn } from "@nuxt/ui";
import DataTable from "~/components/admin/dataTable/DataTable.vue";
import FilterBar from "~/components/admin/filter/FilterBar.vue";
import ActiveteTestimonial from "~/components/admin/forms/ActiveteTestimonial.vue";
import ServiceForm from "~/components/admin/forms/ServiceForm.vue";
import PageHeader from "~/components/admin/pageHeader/PageHeader.vue";
import { type servicesType } from "~/types/types";

const newData = {
  label: "Nouveau service",
  action: () => (isServiceForm.value = true),
};
const store = useTestimonialstore();
const loading = computed(() => store.loading);

const selectedService = ref<servicesType>();
const isServiceForm = ref(false);

const selectedTestimonial = ref<any>(null);
const isActivatForm = ref(false);

onMounted(async () => {
  store.fetchTestimonials();
});

const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const columns: TableColumn<any>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "author_name",
    header: "Nom",
    meta: {
      class: {
        td: "text-(--text-primary) font-bold",
      },
    },
  },
  {
    accessorKey: "author_location",
    header: "Location",
  },
  {
    accessorKey: "rating",
    header: "Note",
    cell: ({ row }) => {
      const rating = Number(row.getValue("rating"));

      const color =
        rating >= 4 ? "success" : rating === 3 ? "warning" : "error";

      return h(
        UBadge,
        {
          class: "capitalize",
          variant: "subtle",
          color,
          icon: "i-tabler-star",
        },
        () => String(rating),
      );
    },
  },
  {
    accessorKey: "content",
    header: "Contenu",
  },
  {
    accessorKey: "is_published",
    header: "Status",
    cell: ({ row }) => {
      const color = {
        true: "success" as const,
        false: "error" as const,
      }[row.getValue("is_published") as string];
      const icon = {
        true: "i-tabler-world-check" as const,
        false: "i-tabler-world-off" as const,
      }[row.getValue("is_published") as string];

      return h(
        UBadge,
        { class: "capitalize", variant: "subtle", color, icon },
        () => (row.getValue("is_published") === true ? "Publié" : "Non publié"),
      );
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
      label: row.original?.is_published ? "Masquer" : "Publier",
      onSelect() {
        selectedTestimonial.value = row.original;
        isActivatForm.value = true;
      },
    },

    {
      label: "Modifier",
      onselect() {
        ((selectedService.value = row), (isServiceForm.value = true));
      },
    },
  ];
}
</script>
