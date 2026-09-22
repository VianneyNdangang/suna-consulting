

<template>
  <div class="min-h-screen bg-sand-25">

    <!-- ================= HEADER ================= -->
    <section
      class="relative overflow-hidden bg-linear-to-b from-ink-900 to-ink-800
             border-b border-gold-400/20"
    >
      <div
        class="mx-auto max-w-7xl px-4 py-16 text-center
               sm:px-6 lg:px-8 lg:py-20"
      >
        <div class="mx-auto max-w-3xl space-y-5">

          <UBadge
            color="primary"
            variant="subtle"
            size="md"
            class="border border-gold-400/40
                   bg-gold-400/20
                   px-3.5 py-1
                   text-xs font-medium uppercase tracking-wider
                   text-gold-300
                   rounded-full
                   backdrop-blur-sm"
          >
            <UIcon
              name="i-tabler-star-filled"
              class="mr-1 h-3.5 w-3.5"
            />

            {{ t('testimonialsPage.badge') }}
          </UBadge>

          <h1
            class="text-3xl font-extrabold leading-tight tracking-tight
                   text-white
                   sm:text-5xl"
          >
            {{ t('testimonialsPage.title') }}
          </h1>

          <p
            class="text-base font-light leading-relaxed
                   text-sand-50/85
                   sm:text-lg"
          >
            {{ t('testimonialsPage.description') }}
          </p>

        </div>
      </div>
    </section>

    <!-- ================= CONTENT ================= -->
    <main
      class="mx-auto max-w-7xl px-4 py-12
             sm:px-6 lg:px-8 lg:py-16"
    >
      <div class="mb-8 flex justify-end">
        <Button
          type="button"
          name="add-testimonial"
          variant="primary"
          icon="i-tabler-message-star"
          :label="t('testimonialsPage.add')"
          class="w-full sm:w-auto"
          @click="isTestimonialForm = true"
        />
      </div>

      <!-- Loading -->
      <div v-if="loading">
        <DataSkeleton
          variant="cards"
          :count="3"
        />
      </div>

      <!-- Empty -->
      <div
        v-else-if="publishedTestimonials.length === 0"
        class="flex min-h-60 flex-col items-center justify-center
               rounded-xl border border-slate-200
               bg-white px-6 py-12 text-center"
      >
        <div
          class="mb-4 flex h-14 w-14 items-center justify-center
                 rounded-full bg-gold-400/10"
        >
          <UIcon
            name="i-tabler-message-star"
            class="h-7 w-7 text-gold-500"
          />
        </div>

        <h2 class="text-lg font-semibold text-ink-900">
          {{ t('testimonialsPage.emptyTitle') }}
        </h2>

        <p class="mt-2 max-w-md text-sm text-slate-500">
          {{ t('testimonialsPage.emptyDescription') }}
        </p>
      </div>

      <!-- Testimonials -->
      <div
        v-else
        class="grid grid-cols-1 gap-5
               sm:grid-cols-2
               lg:grid-cols-3"
      >
      <TestimonialCard v-for="item in publishedTestimonials" :key="item.id" :testimonial="item" />
        
      </div>
    </main>

    <!-- ================= CTA ================= -->
    <CallToAction />
    <TestimonialForm v-model="isTestimonialForm" />
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from "vue"
import Button from "~/components/buttons/Button.vue"
import CallToAction from "~/components/callToAction/CallToAction.vue"
import TestimonialCard from "~/components/card/TestimonialCard.vue"
import TestimonialForm from "~/components/forms/TestimonialForm.vue"
import DataSkeleton from "~/components/loading/DataSkeleton.vue"
const { t } = useI18n()

useHead({
  title: () => t('testimonialsPage.seoTitle'),

  meta: [
    {
      name: "description",
      content: () => t('testimonialsPage.seoDescription'),
    },
    {
      property: "og:title",
      content: () => t('testimonialsPage.seoTitle'),
    },
    {
      property: "og:description",
      content: () => t('testimonialsPage.seoDescription'),
    },
    {
      property: "og:url",
      content: "https://sunaconsulting.com/testimonials",
    },
  ],

  link: [
    {
      rel: "canonical",
      href: "https://sunaconsulting.com/testimonials",
    },
  ],
})

const testimonialStore = useTestimonialstore()
const { testimonials, loading } = storeToRefs(testimonialStore)
const isTestimonialForm = ref(false)
const publishedTestimonials = computed(() =>
  testimonials.value.filter(
    (testimonial) => testimonial.is_published
  )
)

onMounted(async () => {
  await testimonialStore.fetchTestimonials()
})
</script>