<script setup lang="ts">
import type { testimonialsType } from "~/types/types";
import TestimonialCard from "../card/TestimonialCard.vue";

const props = defineProps<{
  testimonials?: any[] | testimonialsType[];
}>();

const list = computed(() => {
  if (props.testimonials && props.testimonials.length > 0) {
    const valid = props.testimonials.filter(
      (p) => p.is_published && p.rating === 5,
    );
    if (valid.length > 0) return valid as any[];
  }
});
</script>

<template>
  <section id="temoignages" class="py-16 md:py-24 bg-sand-50/70 relative">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <UBadge
          color="primary"
          variant="subtle"
          size="md"
          class="bg-rust-100 text-rust-800 border border-rust-200 px-3.5 py-1 rounded-full font-medium text-xs tracking-wider uppercase"
        >
          <UIcon
            name="i-lucide-message-square-quote"
            class="w-3.5 h-3.5 mr-1"
          />
          Retours d'Expérience Diaspora
        </UBadge>

        <h2
          class="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight"
        >
          Ce que nos clients disent de
          <span class="text-rust-600">l’expérience Súna</span>
        </h2>

        <p
          class="text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
        >
          Découvrez les témoignages de compatriotes installés au Canada, en
          France, aux USA et partout dans le monde qui nous confient leurs
          projets au Cameroun.
        </p>
      </div>
      <div class="flex flex-col gap-3 mt-6">
        <div
          class="relative overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-linear-to-r before:from-sand-50 before:to-transparent before:pointer-events-none after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-linear-to-l after:from-sand-50 after:to-transparent after:pointer-events-none"
        >
          <UMarquee
            pause-on-hover
            :overlay="false"
            :ui="{
              root: '[--gap:--spacing(3)] [--duration:100s]',
              content: 'w-auto py-1',
            }"
          >
            <TestimonialCard
              v-for="(item, index) in list"
              :key="index"
              :testimonial="item"
              w="96"
            />
          </UMarquee>
        </div>
        <div
          class="relative overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-linear-to-r before:from-sand-50 before:to-transparent before:pointer-events-none after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-linear-to-l after:from-sand-50 after:to-transparent after:pointer-events-none"
        >
          <UMarquee
            pause-on-hover
            reverse
            :overlay="false"
            :ui="{
              root: '[--gap:--spacing(3)] [--duration:100s]',
              content: 'w-auto py-1',
            }"
          >
            <TestimonialCard
              v-for="(item, index) in list"
              :key="index"
              :testimonial="item"
              w="96"
            />
          </UMarquee>
        </div>
      </div>
    </div>

    <!-- Trust score footer -->
    <div
      class="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-600 font-medium"
    >
      <span class="inline-flex items-center gap-1.5 text-rust-900">
        <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-emerald-600" />
        Avis 100% vérifiés de la diaspora
      </span>
      <span>•</span>
      <span class="inline-flex items-center gap-1.5 text-rust-900">
        <UIcon name="i-lucide-award" class="w-4 h-4 text-gold-500" />
        Note moyenne de 4.9/5 sur plus de 150 missions
      </span>
    </div>
  </section>
</template>
