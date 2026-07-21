<script setup lang="ts">
interface TestimonialItem {
  author_name: string;
  author_location: string;
  content: string;
  rating: number;
}

const props = defineProps<{
  testimonials: TestimonialItem[];
}>();
</script>

<template>
  <section class="bg-sand-50 px-6 py-10 lg:px-8">
    <div class="mx-auto w-full">
      <div class="max-w-2xl">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-rust-600">Témoignages</p>
        <h2 class="mt-2 text-3xl font-semibold text-ink-900 sm:text-4xl">Ce que nos clients disent de l’expérience SUNA</h2>
      </div>

      <div class="mt-10 grid gap-6 lg:grid-cols-3">
        <article v-for="item in props.testimonials" :key="item.author_name" class="rounded-xl border border-gold-400/20 bg-white p-6 shadow-sm">
          <div class="flex items-center gap-1 text-gold-400">
            <span v-for="n in item.rating" :key="n">★</span>
          </div>
          <p class="mt-4 text-lg leading-8 text-slate-700">“{{ item.content }}”</p>
          <div class="mt-6">
            <p class="font-semibold text-ink-900">{{ item.author_name }}</p>
            <p class="text-sm text-slate-500">{{ item.author_location }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
