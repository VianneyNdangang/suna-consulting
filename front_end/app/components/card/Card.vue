<script setup lang="ts">
import type { servicesType } from '~/types/types';

const props = defineProps<{
  item: servicesType | any;
}>();

const emit = defineEmits<{
  (e: 'selectService', item: servicesType): void;
}>();

// Map icons to Lucide icons
const getIcon = (iconName: string) => {
  if (!iconName) return 'i-lucide-briefcase';
  if (iconName.includes('shield') || iconName.includes('doc')) return 'i-lucide-file-check-2';
  if (iconName.includes('home') || iconName.includes('building')) return 'i-lucide-land-plot';
  if (iconName.includes('chart') || iconName.includes('trending')) return 'i-lucide-line-chart';
  if (iconName.includes('user') || iconName.includes('heart')) return 'i-lucide-users';
  if (iconName.includes('car') || iconName.includes('hotel')) return 'i-lucide-key';
  return 'i-lucide-check-circle';
};
</script>

<template>
  <article
    class="group relative h-full flex flex-col justify-between rounded-2xl border border-gold-400/20 bg-white p-6 shadow-xs hover:shadow-sm transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
  >
    <!-- Top glowing gradient bar -->

    <div>
      <!-- Icon + Category header -->
      <div class="flex items-center justify-between gap-4 mb-4">
        <div class="h-12 w-12 rounded-lg bg-sand-50 border border-gold-400/30 flex items-center justify-center text-rust-600 group-hover:bg-rust-600 group-hover:text-white transition-colors duration-300">
          <UIcon :name="getIcon(props.item.icon)" class="w-6 h-6" />
        </div>
        <!-- <UBadge
          color="neutral"
          variant="subtle"
          size="xs"
          class="bg-sand-50 text-rust-900/80 border border-gold-400/20 rounded-full font-medium"
        >
          Service Diaspora
        </UBadge> -->
      </div>

      <!-- Service Title -->
      <h3 class="text-lg font-bold text-ink-900 group-hover:text-rust-600 transition-colors line-clamp-2">
        {{ props.item.title }}
      </h3>

      <!-- Service Short Description -->
      <p class="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
        {{ props.item.short_description }}
      </p>
    </div>

    <!-- Card Action Buttons -->
    <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
      <NuxtLink
        :to="props.item.id ? `/services/${props.item.id}` : '/services'"
        class="text-xs font-semibold text-slate-600 hover:text-rust-900 inline-flex items-center gap-1 transition-colors"
      >
        Détails
        <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
      </NuxtLink>

      <UButton
        size="xs"
        color="primary"
        variant="soft"
        icon="i-lucide-send"
        class="bg-rust-50 hover:bg-rust-100 text-rust-700 border border-rust-200 font-medium"
        :to="`/#devis?service=${props.item.slug || ''}`"
        @click="emit('selectService', props.item)"
      >
        Commander
      </UButton>
    </div>
  </article>
</template>