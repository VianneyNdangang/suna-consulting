<script setup lang="ts">
import { animate, useMotionValue, useTransform, RowValue } from "motion-v";
import { onMounted, onUnmounted, watch } from "vue";

const props = withDefaults(
  defineProps<{
    value: number;
    duration?: number;
    suffix?: string;
  }>(),
  {
    duration: 3,
    suffix: '',
  }
);

const count = useMotionValue(0);
const rounded = useTransform(() => Math.round(count.get()));

let controls: any;

onMounted(() => {
  controls = animate(count, props.value, { duration: props.duration });
});

watch(
  () => props.value,
  (newVal) => {
    controls?.stop();
    controls = animate(count, newVal, { duration: props.duration });
  }
);

onUnmounted(() => {
  controls?.stop();
});
</script>

<template>
  <span class="inline-flex items-center font-bold tracking-tight">
    <RowValue :value="rounded" />
    <span v-if="props.suffix">{{ props.suffix }}</span>
  </span>
</template>
