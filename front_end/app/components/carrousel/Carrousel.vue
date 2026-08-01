<template>
  <div class="relative w-full h-125 flex items-center justify-center overflow-hidden">

    <Motion
      v-for="(item, index) in items"
      :key="index"
      :animate="cardAnimation(index)"
      :transition="{
        duration: 0.5,
        ease: 'easeInOut'
      }"
      class="absolute"
    >
      <Card :item="item" />
    </Motion>

    <button
      @click="previous"
      class="absolute left-8 z-50 rounded-full bg-white shadow p-2 text-rust-900"
    >
      <IconArrowBigLeftFilled />
    </button>

    <button
      @click="next"
      class="absolute right-8 z-50 rounded-full bg-white shadow p-2 text-rust-900"
    >
      <IconArrowBigRightFilled />
    </button>

  </div>
</template>

<script setup lang="ts">
import { Motion } from "motion-v";
import { ref } from "vue";
import Card from "../card/Card.vue";
import type { ServiceItem } from "../serviceListe/ServiceList.vue";
import { IconArrowBigLeftFilled, IconArrowBigRightFilled } from "@tabler/icons-vue";

const props = defineProps<{
  items: ServiceItem[];
}>();

const active = ref(0);

const next = () => {
  active.value = (active.value + 1) % props.items.length;
};

const previous = () => {
  active.value =
    (active.value - 1 + props.items.length) %
    props.items.length;
};

const cardAnimation = (index: number) => {
  let offset = index - active.value;

  if (offset < -2) offset += props.items.length;
  if (offset > 2) offset -= props.items.length;

  switch (offset) {
    case 0:
      return {
        x: 0,
        scale: 1,
        opacity: 1,
        zIndex: 30,
      };

    case 1:
      return {
        x: 180,
        scale: 0.9,
        opacity: .7,
        zIndex: 20,
      };

    case -1:
      return {
        x: -180,
        scale: 0.9,
        opacity: .7,
        zIndex: 20,
      };

    case 2:
      return {
        x: 280,
        scale: .8,
        opacity: .35,
        zIndex: 10,
      };

    case -2:
      return {
        x: -280,
        scale: .8,
        opacity: .35,
        zIndex: 10,
      };

    default:
      return {
        opacity: 0,
        scale: .7,
        zIndex: 0,
      };
  }
};
</script>