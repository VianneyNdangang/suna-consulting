<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const isVisible = ref(false)

const updateVisibility = () => {
  isVisible.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', updateVisibility, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', updateVisibility))
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-3 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-3 opacity-0"
  >
    <UButton
      v-if="isVisible"
      icon="i-lucide-arrow-up"
      color="primary"
      aria-label="Retour en haut"
      title="Retour en haut"
      class="fixed bottom-6 right-6 z-50 rounded-full bg-rust-600 text-white shadow-lg hover:bg-rust-700"
      @click="scrollToTop"
    />
  </Transition>
</template>
