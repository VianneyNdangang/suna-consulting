<template>
  <div class="min-h-screen bg-(--background) text-(--text-primary)">
    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <ClientPageHeader
        :title="`Bonjour${connectedUser?.full_name ? `, ${connectedUser.full_name.split(' ')[0]}` : ''}`"
        subtitle="Retrouvez vos demandes, suivez leur avancement et lancez une nouvelle mission depuis un seul espace."
        action-label="Nouvelle demande"
        action-to="/quote"
        action-icon="i-lucide-plus"
      />

      <section class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <DataSommary
          v-for="stat in stats"
          :key="stat.title"
          :icon="stat.icon"
          :title="stat.title"
          :value="stat.value"
          :description="stat.description"
          :state="stat.state"
        />
      </section>

      <section class="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div class="min-w-0">
          <!-- <div class="mb-4 flex items-end justify-between gap-4">
            <div>
              <p class="text-xs font-bold uppercase tracking-wider text-rust-600">Votre activité</p>
              <h2 class="mt-1 text-2xl font-black text-(--text-primary)">Demandes récentes</h2>
            </div>
            <span class="hidden text-xs text-(--text-secondary) sm:block">{{ quotes.length }} demande{{ quotes.length > 1 ? 's' : '' }}</span>
          </div> -->

          <CardDesign title="Demandes récentes" description="Suivez l'état de vos demandes depuis votre espace client.">
            <div v-if="!quoteStore.loading && !quotes.length" class="px-4 py-10 text-center">
              <UIcon name="i-lucide-inbox" class="size-8 text-(--secondary)" />
              <h3 class="mt-3 text-base font-bold text-(--text-primary)">Aucune demande pour le moment</h3>
              <p class="mx-auto mt-2 max-w-md text-sm text-(--text-secondary)">Votre prochaine mission apparaîtra ici dès son envoi.</p>
              <Button to="/quote" type="button" variant="primary" icon="i-lucide-send" label="Démarrer une mission" class="mx-auto mt-5" />
            </div>
            <DataTable
              v-else
              :data="quotes"
              :columns="columns"
              :loading="quoteStore.loading"
              :total="quotes.length"
              :limit="10"
              :page="1"
            />
          </CardDesign>
        </div>

        <aside class="space-y-4">
          <CardDesign>
            <div class="flex size-10 items-center justify-center rounded-md bg-(--muted) text-(--secondary)"><UIcon name="i-lucide-headphones" class="size-5" /></div>
            <h2 class="mt-4 text-base font-bold text-(--text-primary)">Besoin d'aide ?</h2>
            <p class="mt-2 text-sm leading-relaxed text-(--text-secondary)">Notre équipe vous accompagne pour cadrer votre prochaine mission.</p>
            <Button to="/contact" type="button" variant="ghost" icon="i-lucide-arrow-up-right" label="Contacter l'équipe" class="mt-4" />
          </CardDesign>
          <CardDesign>
            <UIcon name="i-lucide-shield-check" class="size-6 text-(--secondary)" />
            <h2 class="mt-4 text-base font-bold text-(--text-primary)">Vos données restent protégées</h2>
            <p class="mt-2 text-xs leading-relaxed text-(--text-secondary)">Chaque échange est traité avec discrétion et confidentialité.</p>
          </CardDesign>
        </aside>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import DataSommary from "~/components/admin/dataSommary/DataSommary.vue";
import DataTable from "~/components/admin/dataTable/DataTable.vue";
import Button from "~/components/buttons/Button.vue";

definePageMeta({
  layout: "client",
});

const authStore = useAuthStore();
const connectedUser = computed(() => authStore.user);


const quoteStore = usequotestore();
const { quotes } = storeToRefs(quoteStore);

// onMounted(async () => {
//   await quoteStore.fetchquotes(undefined, {user_id: connectedUser.value?.id});
// });

onMounted(async () => {
  await quoteStore.fetchquotes();
});

const recentQuotes = computed(() => [...quotes.value].slice().reverse().slice(0, 5));
const UBadge = resolveComponent("UBadge");
const columns: TableColumn<any>[] = [
  {
    accessorKey: "id",
    header: "Numéro",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => formatDate(row.getValue("created_at") as string),
  },
  {
    accessorKey: "service_slug",
    header: "Service",
    cell: ({ row }) => row.getValue("service_slug") || "Mission personnalisée",
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
];
const stats = computed(() => [
  { title: "Total des demandes", value: quotes.value.length, description: "Toutes vos demandes enregistrées", state: "primary" as const, icon: "i-lucide-layers" },
  { title: "En cours", value: quotes.value.filter((quote) => !["ended", "canceled"].includes(quote.status)).length, description: "Missions actuellement suivies", state: "warning" as const, icon: "i-lucide-loader-circle" },
  { title: "Terminées", value: quotes.value.filter((quote) => quote.status === "ended").length, description: "Missions finalisées", state: "success" as const, icon: "i-lucide-circle-check" },
]);

const formatDate = (date?: string) => date ? new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) : "Date inconnue";
const statusLabel = (status?: string) => ({ ended: "Terminée", canceled: "Annulée", pending: "En attente" }[status || ""] || "En cours");
const statusColor = (status?: string) => status === "ended" ? "success" : status === "canceled" ? "error" : "warning";
</script>
