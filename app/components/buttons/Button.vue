<template>
  <button
  v-if="props.variant === 'primary'"
    :class="[`w-${props.w}`,`text-sm md:text-md bg-rust-600 text-white border-none hover:bg-rust-900 py-3 px-5 rounded-full font-semibold flex items-center justify-center`,
    props.loading?
    `cursor-not-allowed`
    : `cursor-pointer`
]"
    @type="[props.type]"
    @click="props.click"
  >
    <div
      v-if="props?.loading"
      class="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
    ></div>
    <div v-else class="flex items-center justify-center gap-2">
      {{ props.label }}
    </div>
  </button>
  <button
  v-else-if="props.variant === 'secondary'"
    :class="[`w-${props.w}`,`text-sm md:text-md text-rust-600 border-2 border-rust-600 hover:bg-rust-600/10 py-2.5 px-5 rounded-full font-semibold flex items-center justify-center`,
    props.loading?
    `cursor-not-allowed`
    : `cursor-pointer`
]"
    @type="[props.type]"
    @click="props.click"
  >
    <div
      v-if="props?.loading"
      class="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
    ></div>
    <div v-else class="flex items-center justify-center gap-2">
      {{ props.label }}
    </div>
  </button>
  <button
  v-else-if="props.variant === 'ghost'"
    :class="[`w-${props.w}`,`text-sm md:text-md text-ink-900 border-none transition-shadow hover:bg-gold-400 py-3 px-5 rounded-full font-semibold flex items-center justify-center`,
    props.loading?
    `cursor-not-allowed`
    : `cursor-pointer`
]"
    @type="[props.type]"
    @click="props.click"
  >
    <div
      v-if="props?.loading"
      class="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
    ></div>
    <div v-else class="flex items-center justify-center gap-2">
      {{ props.label }}
    </div>
  </button>
</template>
<script setup lang="ts">
// import VueIcon from "@kalimahapps/vue-icons/VueIcon";

const props = defineProps<{
  variant: 'primary' | 'secondary' | 'ghost' | 'dark';
  label: string;
  loading?: boolean;
  type: "submit" | "button";
  click?: () => any;
  w?: string;
}>();
</script>