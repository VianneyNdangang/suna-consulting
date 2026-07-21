<script setup lang="ts">
interface FaqItem {
  question: string;
  answer: string;
}

const props = defineProps<{
  items: FaqItem[];
}>();
</script>

<template>
  <section class="mx-auto w-full px-6 py-10 lg:px-8">
    <div class="max-w-2xl">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-rust-600">FAQ</p>
      <h2 class="mt-2 text-3xl font-semibold text-ink-900 sm:text-4xl">Questions fréquentes sur nos services</h2>
    </div>

    <div class="mt-10 space-y-4">
      <details v-for="item in props.items" :key="item.question" class="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <summary class="cursor-pointer list-none text-lg font-semibold text-ink-900">{{ item.question }}</summary>
        <p class="mt-3 text-slate-600">{{ item.answer }}</p>
      </details>
    </div>
  </section>
</template>
