<script setup lang="ts">
import { animate, useMotionValue, useTransform,RowValue } from "motion-v"
import { onMounted, onUnmounted } from "vue"

const count = useMotionValue(0)
const rounded = useTransform(() => Math.round(count.get()))
const props = defineProps <{value:number}>()

let controls: any

onMounted(() => {
    controls = animate(count, props.value, { duration: 5 })
})

onUnmounted(() => {
    controls?.stop()
})
</script>

<template>
  <div class="motion-count">
    <RowValue :value="rounded" />
  </div>
</template>

<style scoped>
.motion-count {
    font-size: 64px;
    /* color: #4ff0b7; */
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
