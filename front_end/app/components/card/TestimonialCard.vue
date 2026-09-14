```vue
<template>
  <UPageCard
    :description="testimonial.content"
    variant="solid"
    :class="w?`w-${w}`: `w-full`"
    class="flex flex-col rounded border border-gold-400/25 bg-white p-4 shadow-sm"
    :ui="{
      description:
        'text-sm leading-relaxed text-slate-600 before:content-[open-quote] after:content-[close-quote]',
      footer: 'w-full',
      header: 'w-full',
    }"
  >
    <!-- Card header -->
    <template #header>
      <div class="w-full space-y-3">

        <!-- Rating + Flag -->
        <div class="flex w-full items-center justify-between">

          <!-- Rating -->
          <div class="flex items-center gap-1">
            <UIcon
              v-for="n in 5"
              :key="n"
              name="i-tabler-star-filled"
              class="h-4 w-4"
              :class="
                n <= testimonial.rating
                  ? 'text-gold-400'
                  : 'text-slate-200'
              "
            />
          </div>

          <!-- Flag -->
          <img
            v-if="testimonial.flag"
            :src="testimonial.flag"
            :alt="`Drapeau de ${testimonial.author_location}`"
            :title="testimonial.author_location"
            class="h-5 w-7 rounded-sm object-cover"
          />

        </div>

        <!-- Service -->
        <div v-if="testimonial.service_used">
          <span
            class="inline-flex items-center rounded-full border border-rust-200/60 bg-rust-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-rust-600"
          >
            <UIcon
              name="i-tabler-briefcase"
              class="mr-1 h-3 w-3"
            />

            {{ testimonial.service_used }}
          </span>
        </div>

      </div>
    </template>

    <!-- Card footer -->
    <template #footer>
      <div
        class="flex w-full items-center gap-3.5 border-t border-slate-200 pt-4"
      >

        <!-- Avatar -->
        <UAvatar
          :src="testimonial.photo_url || undefined"
          :alt="testimonial.author_name"
          size="md"
        />

        <!-- Author -->
        <div class="min-w-0">
          <h3
            class="truncate text-sm font-bold leading-tight text-ink-900"
          >
            {{ testimonial.author_name }}
          </h3>

          <p
            v-if="testimonial.author_location"
            class="mt-0.5 flex items-center gap-1 text-xs text-slate-500"
          >
            <UIcon
              name="i-tabler-map-pin"
              class="h-3 w-3 text-slate-400"
            />

            {{ testimonial.author_location }}
          </p>
        </div>

      </div>
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
import type { testimonialsType } from '~/types/types'

defineProps<{
  testimonial: testimonialsType
    w?: string
}>()
</script>