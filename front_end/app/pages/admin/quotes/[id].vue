<template>
  <div>
  <BackButton />
  <div class="min-h-full bg-(--background) p-4 md:p-6 lg:p-8">
    <!-- Loading -->
    <div v-if="loading" class="mx-auto max-w-7xl space-y-6">
      <USkeleton class="h-8 w-48" />

      <div class="grid gap-6 lg:grid-cols-3">
        <USkeleton class="h-64 rounded-xl lg:col-span-2" />
        <USkeleton class="h-64 rounded-xl" />
      </div>

      <USkeleton class="h-72 rounded-xl" />
    </div>
    <!-- Contenu -->
    <div v-else class="mx-auto max-w-7xl space-y-6">
      <!-- Header -->
      <UPageHeader
        :title="`Demande de devis`"
        :description="quote?.number"
        :ui="{
          title: ' font-bold text-lg text-(--text-primary)',
          description: 'text-md text-lg text-(--text-secondary)',
          root: 'py-0 ',
          container: 'gap-3',
          wrapper: 'gap-3',
        }"
      >
        <template #title>
          <div>
            <div class="flex flex-wrap items-center gap-3">
              <h1
                class="text-2xl font-bold tracking-tight text-(--text-primary)"
              >
                Demande de devis
              </h1>

              <UBadge :color="statusColor(quote?.status)" variant="subtle">
                {{ statusLabel(quote?.status) }}
              </UBadge>
            </div>
          </div>
        </template>
        <template #links>
          <UBadge
            :color="urgencyColor(quote?.urgency)"
            variant="subtle"
            class="px-3 py-1.5"
          >
            <UIcon name="i-tabler-clock-exclamation" class="mr-1.5 size-4" />

            {{ urgencyLabel(quote?.urgency) }}
          </UBadge>
        </template>
      </UPageHeader>

      <!-- Main -->
      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Informations client -->
        <Card class="lg:col-span-2">
          <template #header>
            <div class="flex items-center gap-3">
              <div
                class="flex size-10 items-center justify-center rounded-lg bg-(--secondary)/10"
              >
                <UIcon name="i-tabler-user" class="size-5 text-(--secondary)" />
              </div>

              <div>
                <h2 class="font-semibold text-(--text-primary)">
                  Informations du client
                </h2>

                <p class="text-sm text-(--text-secondary)">
                  Coordonnées du demandeur
                </p>
              </div>
            </div>
          </template>

          <div class="grid gap-5 sm:grid-cols-2">
            <!-- Nom -->
            <div>
              <p
                class="text-xs font-medium uppercase tracking-wide text-(--text-muted)"
              >
                Nom complet
              </p>

              <div class="mt-1 flex items-center gap-2">
                <UIcon
                  name="i-tabler-user"
                  class="size-4 text-(--text-muted)"
                />

                <p class="font-medium text-(--text-primary)">
                  {{ quote?.full_name }}
                </p>
              </div>
            </div>

            <!-- Email -->
            <div>
              <p
                class="text-xs font-medium uppercase tracking-wide text-(--text-muted)"
              >
                Adresse email
              </p>

              <div class="mt-1 flex items-center gap-2">
                <UIcon
                  name="i-tabler-mail"
                  class="size-4 text-(--text-muted)"
                />

                <a
                  :href="`mailto:${quote?.email}`"
                  class="font-medium text-(--secondary) hover:underline"
                >
                  {{ quote?.email }}
                </a>
              </div>
            </div>

            <!-- Téléphone -->
            <div>
              <p
                class="text-xs font-medium uppercase tracking-wide text-(--text-muted)"
              >
                Téléphone
              </p>

              <div class="mt-1 flex items-center gap-2">
                <UIcon
                  name="i-tabler-phone"
                  class="size-4 text-(--text-muted)"
                />

                <a
                  :href="`tel:${quote?.phone}`"
                  class="font-medium text-(--text-primary)"
                >
                  {{ quote?.phone }}
                </a>
              </div>
            </div>

            <!-- Pays -->
            <div>
              <p
                class="text-xs font-medium uppercase tracking-wide text-(--text-muted)"
              >
                Pays
              </p>

              <div class="mt-1 flex items-center gap-2">
                <UIcon
                  name="i-tabler-world"
                  class="size-4 text-(--text-muted)"
                />

                <p class="font-medium text-(--text-primary)">
                  {{ quote?.country }}
                </p>
              </div>
            </div>

            <!-- Ville -->
            <div>
              <p
                class="text-xs font-medium uppercase tracking-wide text-(--text-muted)"
              >
                Ville
              </p>

              <div class="mt-1 flex items-center gap-2">
                <UIcon
                  name="i-tabler-map-pin"
                  class="size-4 text-(--text-muted)"
                />

                <p class="font-medium text-(--text-primary)">
                  {{ quote?.city }}
                </p>
              </div>
            </div>

            <!-- Date -->
            <div>
              <p
                class="text-xs font-medium uppercase tracking-wide text-(--text-muted)"
              >
                Date de création
              </p>

              <div class="mt-1 flex items-center gap-2">
                <UIcon
                  name="i-tabler-calendar"
                  class="size-4 text-(--text-muted)"
                />

                <p
                  v-if="quote?.created_at"
                  class="font-medium text-(--text-primary)"
                >
                  {{ formatDate(quote.created_at) }}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <!-- Résumé -->
        <Card>
          <template #header>
            <div class="flex items-center gap-3">
              <div
                class="flex size-10 items-center justify-center rounded-lg bg-(--secondary)/10"
              >
                <UIcon
                  name="i-tabler-file-description"
                  class="size-5 text-(--secondary)"
                />
              </div>

              <div>
                <h2 class="font-semibold text-(--text-primary)">Résumé</h2>

                <p class="text-sm text-(--text-secondary)">
                  Informations principales
                </p>
              </div>
            </div>
          </template>

          <div class="space-y-5">
            <!-- Service -->
            <div>
              <p
                class="text-xs font-medium uppercase tracking-wide text-(--text-muted)"
              >
                Service demandé
              </p>

              <p class="mt-1 font-medium leading-6 text-(--text-primary)">
                {{ quote?.service_slug }}
              </p>
            </div>

            <!-- Urgence -->
            <div>
              <p
                class="text-xs font-medium uppercase tracking-wide text-(--text-muted)"
              >
                Niveau d'urgence
              </p>

              <div class="mt-2">
                <UBadge :color="urgencyColor(quote?.urgency)" variant="subtle">
                  {{ urgencyLabel(quote?.urgency) }}
                </UBadge>
              </div>
            </div>

            <!-- Statut -->
            <div>
              <p
                class="text-xs font-medium uppercase tracking-wide text-(--text-muted)"
              >
                Statut
              </p>

              <div class="mt-2">
                <UBadge :color="statusColor(quote?.status)" variant="subtle">
                  {{ statusLabel(quote?.status) }}
                </UBadge>
              </div>
            </div>

            <!-- ID -->
            <div>
              <p
                class="text-xs font-medium uppercase tracking-wide text-(--text-muted)"
              >
                Type de commande
              </p>

              <p
                class="mt-1 break-all font-mono text-xs text-(--text-secondary)"
              >
                {{ quote?.id }}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <!-- Détails de la demande -->
      <Card>
        <template #header>
          <div class="flex items-center gap-3">
            <div
              class="flex size-10 items-center justify-center rounded-lg bg-(--secondary)/10"
            >
              <UIcon
                name="i-tabler-message-2"
                class="size-5 text-(--secondary)"
              />
            </div>

            <div>
              <h2 class="font-semibold text-(--text-primary)">
                Détails de la demande
              </h2>

              <p class="text-sm text-(--text-secondary)">
                Description fournie par le client
              </p>
            </div>
          </div>
        </template>

        <div
          class="rounded-lg border border-(--border) bg-gray-50/50 p-5 dark:bg-white/5"
        >
          <p
            class="whitespace-pre-line text-sm leading-7 text-(--text-primary)"
          >
            {{ quote?.details || "Aucun détail fourni par le client." }}
          </p>
        </div>
      </Card>

      <!-- Actions -->
      <Card>
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h3 class="font-semibold text-(--text-primary)">
              Gestion de la demande
            </h3>

            <p class="mt-1 text-sm text-(--text-secondary)">
              Modifiez le statut ou contactez directement le client.
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            <Button
              type="button"
              icon="i-tabler-mail"
              variant="secondary"
              :to="`mailto:${quote?.email}`"
              label="Contacter le client"
            />
            <Button
              type="button"
              icon="i-tabler-edit"
              variant="primary"
              label="Modifier le statut"
            />
          </div>
        </div>
      </Card>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import type { AxiosInstance } from "axios";
import BackButton from "~/components/backbutton/BackButton.vue";

import Button from "~/components/buttons/Button.vue";
import Card from "~/components/Card/Card.vue";

import {
  formatDate,
  statusColor,
  statusLabel,
  urgencyColor,
  urgencyLabel,
} from "~/helpers/formateData";

type QuoteStatus = "pending" | "in_progress" | "ended" | "canceled";

type QuoteUrgency = "normal" | "urgent" | "veryUrgent";

interface Quote {
  id: string;
  number: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  service_slug: string;
  urgency: QuoteUrgency;
  status: QuoteStatus;
  details: string;
  created_at: string;
}

definePageMeta({
  layout: "admin",
  middleware: ["role"],
  roles: ["ADMIN", "SUPER_ADMIN"],
});

const route = useRoute();

const { $axios } = useNuxtApp();
const api = $axios as AxiosInstance;

const quote = ref<Quote | null>(null);
const loading = ref(true);

const fetchQuote = async (): Promise<void> => {
  try {
    loading.value = true;

    const quoteId = route.params.id;

    if (!quoteId || Array.isArray(quoteId)) {
      console.error("ID de demande invalide :", quoteId);
      quote.value = null;
      return;
    }

    const response = await api.get<Quote>(
      `quotes/${encodeURIComponent(quoteId)}`,
    );

    quote.value = response.data;
  } catch (error) {
    console.error("Erreur lors du chargement de la demande :", error);

    quote.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchQuote();
});
</script>
