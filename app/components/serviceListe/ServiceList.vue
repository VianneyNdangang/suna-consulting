<script setup lang="ts">
import { ref, computed } from "vue";
import type { servicesType } from "~/types/types";
import BottomBanner from "../banners/BottomBanner.vue";
import DataSkeleton from "../loading/DataSkeleton.vue";
import ServiceCard from "../card/ServiceCard.vue";

const props = defineProps<{
  services?: servicesType[];
  loading?: boolean;
}>();

const { t } = useI18n();

const emit = defineEmits<{
  (e: "selectService", item: servicesType): void;
}>();
const selectedCategory = ref("all");

const categories = [
  { id: "all", label: t("services.all"), icon: "i-lucide-grid" },
  {
    id: "admin",
    label: t("services.administrative"),
    icon: "i-lucide-file-text",
  },
  { id: "immo", label: t("services.realEstate"), icon: "i-lucide-home" },
  {
    id: "projets",
    label: t("services.projects"),
    icon: "i-lucide-heart-handshake",
  },
];

const allServices = computed(() => {
  if (props.services && props.services.length > 0) {
    return props.services;
  }
});

const filteredServices = computed(() => {
  if (selectedCategory.value === "all") return allServices.value;
  if (selectedCategory.value === "admin") {
    return allServices.value?.filter(
      (s) =>
        s.slug.includes("admin") ||
        s.title.toLowerCase().includes("administr") ||
        s.title.toLowerCase().includes("facture"),
    );
  }
  if (selectedCategory.value === "immo") {
    return allServices.value?.filter(
      (s) =>
        s.slug.includes("immo") ||
        s.slug.includes("foncier") ||
        s.title.toLowerCase().includes("terrain") ||
        s.title.toLowerCase().includes("chantier") ||
        s.title.toLowerCase().includes("bien"),
    );
  }
  if (selectedCategory.value === "projets") {
    return allServices.value?.filter(
      (s) =>
        !s.slug.includes("admin") &&
        !s.slug.includes("immo") &&
        !s.slug.includes("foncier"),
    );
  }
  return allServices?.value;
});
</script>

<template>
  <section
    id="services"
    class="py-16 md:py-24 bg-linear-to-b from-sand-25 via-sand-50/60 to-sand-25"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <UBadge
          color="primary"
          variant="subtle"
          size="md"
          class="bg-rust-100 text-rust-800 border border-rust-200 px-3.5 py-1 rounded-full font-medium text-xs tracking-wider uppercase"
        >
          <UIcon name="i-lucide-briefcase" class="w-3.5 h-3.5 mr-1" />
          {{ t("services.badge") }}
        </UBadge>

        <h2
          class="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight"
        >
          {{ t("services.title") }}
        </h2>

        <p
          class="text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
        >
          {{ t("services.description") }}
        </p>

        <!-- Category Filters -->
        <div class="pt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200"
            :class="
              selectedCategory === cat.id
                ? 'bg-rust-600 text-white shadow-md shadow-rust-600/20'
                : 'bg-white text-slate-700 hover:text-rust-900 hover:bg-gold-400/10 border border-gold-400/20 shadow-sm'
            "
            @click="selectedCategory = cat.id"
          >
            <UIcon :name="cat.icon" class="w-4 h-4" />
            {{ cat.label }}
          </button>
        </div>
      </div>

      <!-- Services Grid -->
      <div v-if="loading" class="mt-12">
        <DataSkeleton :count="6" />
      </div>
      <div
        v-else
        class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <ServiceCard
          v-for="(service, index) in filteredServices"
          :key="index"
          :item="service"
        />
      </div>

      <!-- Bottom Banner for custom request -->
      <BottomBanner
        icon="i-lucide-sparkles"
        title="Besoin d’une intervention particulière ?"
        subtitle=" Nous concevons des solutions sur-mesure adaptées à votre situation."
        description="Expliquez-nous votre contexte et nous vous proposerons une formule adaptée."
      />
    </div>
  </section>
</template>
