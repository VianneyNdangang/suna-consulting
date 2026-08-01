<script setup lang="ts">
import type { faqType } from "~/types/types";

const props = defineProps<{
  items: faqType[];
}>();
</script>

<template>
  <section class="mx-auto w-full px-4 py-10 md:px-20">
    <div class="max-w-2xl">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-rust-600">
        FAQ
      </p>
      <h2 class="mt-2 text-3xl font-semibold text-ink-900 sm:text-4xl">
        Questions fréquentes sur nos services
      </h2>
    </div>

    <div class="mt-10 space-y-4">
      <details
        v-for="item in props.items"
        :key="item.id"
        class="rounded-md border border-slate-200 bg-white p-5 shadow-sm"
      >
        <summary
          class="cursor-pointer list-none text-lg font-semibold text-ink-900"
        >
          <h3 class="text-xl text-rust-900 font-bold">
            <p>{{ item.category }}</p>
          </h3>
          {{ item.question }}
        </summary>
        <p class="mt-3 text-slate-600">{{ item.answer }}</p>
      </details>
    </div>
  </section>
</template>
