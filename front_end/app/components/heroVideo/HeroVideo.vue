<script setup lang="ts">
import { ref, onMounted } from 'vue';

const videoRef = ref<HTMLVideoElement | null>(null);
const isVideoLoaded = ref(false);

onMounted(() => {
  // Defer video loading until after critical page rendering (FCP / LCP optimization)
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
  <div class="relative overflow-hidden bg-gradient-to-br from-ink-950 via-rust-950 to-ink-900 min-h-[520px]">
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
    <div class="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-900/85 to-rust-950/80 backdrop-blur-[1px]" />
    
    <!-- Ambient radial glow -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,162,78,0.18),transparent_60%)]" />

    <!-- Content Slot -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>