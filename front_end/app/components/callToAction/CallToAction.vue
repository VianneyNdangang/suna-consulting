<script setup lang="ts">
import BackgroundAnimatio from "../backgroung/BackgroundAnimatio.vue";
import Button from "../buttons/Button.vue";

// const props = defineProps<{
//   points: string[];
// }>();
</script>

<template>
  <div
    class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,162,78,0.22),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(138,62,18,0.32),transparent_34%)]"
  />
  <section class="mx-auto w-full bg-ink-900">
    <BackgroundAnimatio>
      <div
        class="grid gap-10 border border-slate-200 px-4 py-10 md:px-20 text-white md:grid-cols-[0.8fr_1.2fr] md:py-12"
      >
        <div>
          <p
            class="text-sm font-semibold uppercase tracking-[0.3em] text-gold-400"
          >
            Pourquoi nous choisir
          </p>
          <h2 class="mt-3 text-3xl font-semibold sm:text-4xl">
            Une approche claire, humaine et plus proche du terrain
          </h2>
          <div class="mt-6">
            <Button
              label="Faites comme eux !"
              type="button"
              variant="primary"
            />
          </div>
        </div>

        <div></div></div
    ></BackgroundAnimatio>
  </section>
</template>
