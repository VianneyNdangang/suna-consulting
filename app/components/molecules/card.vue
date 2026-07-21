<template>
    <article class=" max-w-xs md:max-w-2xl rounded-lg shadow-md boder border-rust-600/15 overflow-hidden bg-white transition hover:-translate-y-1 hover:shadow-xl">
        <div class="h-50 bg-[linear-gradient(135deg,#f7f1e8,#d4a24e)] p-6">
          <div class="flex h-full items-end justify-between rounded border border-white/50 bg-white/60 p-4 backdrop-blur">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.2em] text-rust-900">Service</p>
              <h3 class="mt-2 text-xl font-semibold text-ink-900">{{ props.item.title }}</h3>
            </div>
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-lg text-white">
              {{ props.item.icon }}
            </div>
          </div>
        </div>
        <div class="p-6">
          <p class="text-slate-600">{{ props.item.short_description }}</p>
          <NuxtLink :to="`/services/${props.item.slug}`" class="mt-6 inline-flex items-center font-semibold text-rust-600 transition group-hover:text-rust-900">
            En savoir plus →
          </NuxtLink>
        </div>
      </article>
</template>
<script setup lang="ts">
import type { ServiceItem } from '../organisms/ServiceList.vue';

const props = defineProps <{item:ServiceItem}>()
</script>