<template>
  <div class="w-full space-y-1">
    <label
      v-if="label"
      :for="name"
      class="text-sm font-medium text-rust-600"
    >
      {{ label }}
    </label>

    <div class="relative">
      <!-- Select -->
      <button
        type="button"
        @click="toggle"
        class="w-full rounded-md border-2 focus:border-rust-600 pl-3 placeholder:text-gray-500 py-2 px-3 text-left transition-all duration-200 focus:outline-none flex items-center justify-between"
        :class="[
          error ? 'border-danger' : 'border-rust-600',
        ]"
      >
        <span
          :class="model ? 'text-(--text-secodary)' : 'text-(--text-third)'"
        >
          {{ selectedLabel }}
        </span>

        <ChChevronDown
          class="transition-transform duration-300"
          :class="{ 'rotate-180': open }"
        />
      </button>

      <!-- Dropdown -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-2 scale-95"
      >
      <div class="overflow-hidden scroll-auto max-h-50">
        <ul
          v-if="open"
          class="absolute z-50 mt-2 w-full rounded border border-(--border) bg-(--bg) shadow-xl "
        >
          <li
            v-for="option in options"
            :key="option.value"
            @click="select(option)"
            class="cursor-pointer px-3 py-2 transition-colors hover:bg-(--hover)"
            :class="{
              'bg-(--primary)/10 text-(--primary)': model === option.value
            }"
          >
            {{ option.label }}
          </li>
        </ul>
      </div>
        
      </Transition>
    </div>

    <p
      v-if="error"
      class="text-xs text-(--danger)"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const model = defineModel<string | number>();

const props = defineProps<{
  label?: string;
  name: string;
  placeholder?: string;
  error?: string;
  options: {
    label: string;
    value: string | number;
  }[];
}>();

const open = ref(false);

const toggle = () => {
  open.value = !open.value;
};

const select = (option: { label: string; value: string | number }) => {
  model.value = option.value;
  open.value = false;
};

const selectedLabel = computed(() => {
  const option = props.options.find(
    (o) => o.value === model.value
  );

  return option?.label ?? props.placeholder ?? "Sélectionner";
});

const container = ref();

onClickOutside(container, () => {
  open.value = false;
});
</script>