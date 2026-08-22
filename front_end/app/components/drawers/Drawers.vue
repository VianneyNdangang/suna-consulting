<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  isOpen: boolean;
  placement: "top" | "bottom" | "start" | "end";
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const transitionClasses = computed(() => {
  switch (props.placement) {
    case "top":
      return {
        enterFrom: "-translate-y-full",
        leaveTo: "-translate-y-full",
      };

    case "bottom":
      return {
        enterFrom: "translate-y-full",
        leaveTo: "translate-y-full",
      };

    case "start":
      return {
        enterFrom: "-translate-x-full",
        leaveTo: "-translate-x-full",
      };

    default: // end
      return {
        enterFrom: "translate-x-full",
        leaveTo: "translate-x-full",
      };
  }
});
</script>

<template>
  <UDrawer
    :open="isOpen"
    :direction="props.placement === 'start' ? 'left' : props.placement === 'end' ? 'right' : props.placement"
    @update:open="(open) => !open && emit('close')"
  >
    <template #body>
      <div class="h-full overflow-y-auto">
        <slot />
      </div>
    </template>
  </UDrawer>
</template>
