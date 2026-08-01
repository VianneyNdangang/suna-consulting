<script setup lang="ts">
interface Props {
  activeIcon?: string
  inactiveIcon?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  activeIcon: "tabler:moon-filled",
  inactiveIcon: "tabler:sun-filled",
  disabled: false,
})

const model = defineModel<boolean>({
  default: false,
})

const toggle = () => {
  if (props.disabled) return

  model.value = !model.value
}
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="model"
    :disabled="disabled"
    @click="toggle"
    class="relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-rust-600/30"
    :class="[
      model
        ? 'bg-rust-600'
        : 'bg-gray-300 dark:bg-gray-700',
      disabled
        ? 'cursor-not-allowed opacity-50'
        : 'cursor-pointer'
    ]"
  >
    <span
      class="absolute flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300"
      :class="model ? 'translate-x-7' : 'translate-x-1'"
    >
      <NuxtIcon
        :name="model ? activeIcon : inactiveIcon"
        class="text-rust-600 text-sm"
      />
    </span>
  </button>
</template>