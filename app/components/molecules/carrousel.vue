<template>
  <div
    ref="container"
    class="flex overflow-x-auto snap-x snap-mandatory gap-0 md:gap-6 p-20 scrollbar-thumb-inherit shadow-2xs"
    @scroll="handleScroll"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      :ref="(el) => (cards[index] = el)"
      class="snap-center shrink-0 transition-all duration-500"
      :class="{
        'scale-110 z-20': activeIndex === index,
        'scale-90 opacity-50 z-0': activeIndex !== index,
      }"
    >
      <Card :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Card from "./card.vue";
import type { ServiceItem } from "../organisms/ServiceList.vue";

const props = defineProps<{
  items: ServiceItem[];
}>();

const container = ref();
const cards: any[] = [];
const activeIndex = ref(0);

const handleScroll = () => {
  const center: any =
    container.value.scrollLeft + container.value.offsetWidth / 2;
  let closest = 0;
  let minDistance = Infinity;

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;

    const distance = Math.abs(center - cardCenter);

    if (distance < minDistance) {
      minDistance = distance;
      closest = index;
    }
  });

  activeIndex.value = closest;
};

onMounted(() => {
  handleScroll();
});
</script>
