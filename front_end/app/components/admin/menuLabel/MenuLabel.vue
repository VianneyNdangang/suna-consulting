<template>
  <NuxtLink
    :to="props.item.path"
    v-if="props.item?.children?.length === 0"
    class="block rounded px-3 py-1 mb-1 text-md hover:bg-(--hover) transition"
    :class="{
      'bg-(--btt-bg)/20 border-l-4 border-rust-600':
        route.path === props.item.path,
    }"
  >
    <div class="flex items-center gap-2 text-(--text-primary)">
      <Icon v-if="props.item.icon" :name="props.item.icon" class="size-5" />
      <!-- <VueIcon v-if="props.item.icon" :name="props.item.icon" class="size-5" /> -->
      <p v-if="uiStore.isSidebar">{{ props.item.label }}</p>
    </div>
  </NuxtLink>
  <details v-else class="group [&_summary::-webkit-details-marker]:hidden">
    <summary
      class="flex px-3 py-1 mb-1 text-md transition items-center justify-between rounded hover:bg-(--hover)"
    >
      <div class="flex items-center gap-2">
        <Icon
          v-if="props.item.icon"
          :name="props.item.icon"
          class="size-5 dark:text-white"
        />
        <p v-if="uiStore.isSidebar">{{ props.item.label }}</p>
      </div>
      <span class="shrink-0 transition duration-300 group-open:-rotate-180">
        <svg
          v-if="uiStore.isSidebar"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          class="size-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </summary>
    <div
      v-for="p in props.item.children"
      :class="uiStore.isSidebar ? `pl-8` : `pl-0`"
    >
      <NuxtLink
        :to="p.path"
        class="flex rounded items-center gap-2 px-3 py-1 mb-1 text-sm transition hover:bg-(--btt-bg) hover:text-white"
        :class="{
          'bg-(--btt-bg)/20 border-l-4 border-(--btt-bg)':
            route.path === p.path,
          '': route.path != p.path,
        }"
      >
        <Icon :name="p.icon" class="size-5" />
        <p v-if="uiStore.isSidebar">{{ p.label }}</p>
      </NuxtLink>
    </div>
  </details>
</template>
<script setup lang="ts">
export type menuType = {
  label: string;
  path: string;
  icon: string;
  name: string;
  children: {
    label: string;
    path: string;
    icon: string;
    name: string;
  }[];
};

const uiStore = useUiStore();
const route = useRoute();

const props = defineProps<{
  item: menuType;
}>();
</script>
