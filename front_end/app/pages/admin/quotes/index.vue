<template>
  <div class="flex flex-col gap-3">
    <PageHeader
      title="Devis"
      subtitle="Managez vos devis."
      :loading="store.loading"
      :refresh="() => store.fetchquotes()"
    />
  </div>
</template>

<script setup lang="ts">
import PageHeader from "~/components/admin/pageHeader/PageHeader.vue";

definePageMeta({
  // middleware: 'auth',
  layout: "admin",
});

const store = usequotestore();

onMounted(async () => {
  await store.fetchquotes();
});
</script>
