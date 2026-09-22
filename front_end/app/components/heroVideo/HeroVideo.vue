<script setup lang="ts">
const videoRef = ref<HTMLVideoElement | null>(null)
const isVideoLoaded = ref(false)

const store = usesite_contentStore()
const content = computed(() => store.site_content)

const handleVideoLoaded = () => {
  isVideoLoaded.value = true
}
</script>

<template>
  <div
    class="relative min-h-130 overflow-hidden bg-linear-to-br from-ink-900/50 via-rust-900/50 to-ink-800/50"
  >
    <!-- Video -->
    <video
      ref="videoRef"
      muted
      loop
      playsinline
      autoplay
      preload="metadata"
      class="absolute inset-0 size-full scale-105 object-cover transition-opacity duration-1000"
      :class="isVideoLoaded ? 'opacity-40' : 'opacity-0'"
      :poster="content?.hero_video_poster"
      @loadeddata="handleVideoLoaded"
    >
      <source
        :src="content?.hero_video"
        type="video/mp4"
      />
    </video>

    <!-- Fallback pendant le chargement -->
    <div
      v-if="!isVideoLoaded"
      class="absolute inset-0 bg-cover bg-center"
      :style="{
        backgroundImage: `url('${content?.hero_video_poster}')`
      }"
    />

    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-linear-to-r from-ink-950/78 via-ink-900/62 to-rust-900/58 backdrop-blur-[1px]"
    />

    <!-- Glow -->
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,162,78,0.18),transparent_60%)]"
    />

    <!-- Content -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>