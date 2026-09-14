<script setup lang="ts">
import { ref, onMounted } from 'vue';

const videoRef = ref<HTMLVideoElement | null>(null);
const isVideoLoaded = ref(false);

onMounted(() => {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      loadVideo();
    });
  } else {
    setTimeout(loadVideo, 800);
  }
});

const loadVideo = () => {
  if (videoRef.value) {
    videoRef.value.preload = 'auto';
    videoRef.value.play().catch(() => {
      // Autoplay with audio muted might still be blocked in low-power modes
    });
  }
};
</script>

<template>
  <div class="relative min-h-130 overflow-hidden bg-linear-to-br from-ink-900/50 via-rust-900/50 to-ink-800/50">
    <!-- Video background with lazy preload for instant LCP -->
    <video
      ref="videoRef"
      muted
      loop
      playsinline
      preload="none"
      class="absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-1000"
      :class="isVideoLoaded ? 'opacity-40' : 'opacity-0'"
      @loadeddata="isVideoLoaded = true"
    >
      <source src="/hero_video.mp4" type="video/mp4" />
    </video>

    <!-- Deep warm overlay for readability and instant first paint -->
    <div class="absolute inset-0 bg-linear-to-r from-ink-950/78 via-ink-900/62 to-rust-900/58 backdrop-blur-[1px]" />
    
    <!-- Ambient radial glow -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,162,78,0.18),transparent_60%)]" />

    <!-- Content Slot -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>