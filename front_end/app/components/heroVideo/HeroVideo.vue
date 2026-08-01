<template>
  <div class="relative overflow-hidden">
    <video
      autoplay
      muted
      loop
      playsinline
      class="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/hero_video.mp4" type="video/mp4" />
    </video>

    <div class="absolute inset-0 bg-black/60"></div>

    <div class="relative z-10">
      <slot/>
    </div>
  </div>
</template>