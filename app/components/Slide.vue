<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const slides: string[] = [
    "Innovation at your fingertips.",
    "Powering your digital lifestyle.",
    "Where quality meets innovation.",
    "Premium technology at unbeatable prices.",
    "Smart devices for smarter living.",
    "Performance you can trust.",
    "Experience the future of technology.",
    "Upgrade your world with cutting-edge tech.",
    "Reliable technology for every moment.",
    "Discover the power of innovation."
];

const currentSlide = ref<string>(slides[0] ?? '');
const indexSlide = ref<number>(0);

let interval: ReturnType<typeof setInterval>;

onMounted(() => {
    interval = setInterval(() => {
        indexSlide.value = (indexSlide.value + 1) % slides.length;
        currentSlide.value = slides[indexSlide.value] ?? '';
    }, 4000);
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>

<template>
  <div class="flex min-h-16 items-center justify-center">
    <transition name="fade" mode="out-in">
      <p :key="currentSlide" class="text-3xl md:text-5xl font-bold text-center text-slate-800">
        {{ currentSlide }}
      </p>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 600ms ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>