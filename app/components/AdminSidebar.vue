<template>
  <div
    class="fixed z-50 flex-col h-screen p-2 flex bg-(--surface) shadow-sm transition-all duration-300 ease-in-out"
    :class="
      uiStore.isSidebar ? `w-70` : `w-20 flex items-center justify-center`
    "
  >
    <section class="w-full pb-2">
      <img src="/SC-H01.png" alt="logo" class="w-auto h-15 rounded mb-4" />
      <div
        class="flex justify-between items-center"
        :class="uiStore.isSidebar ? `flex-row` : `flex-col`"
      >
        <h2 v-if="uiStore.isSidebar" class="text-xl font-bold">Menu</h2>
        <div>
          <button
            @click="uiStore.handleChange()"
            class="cursor-pointer flex justify-center items-center p-2"
          >
            <IconTransitionLeftFilled
              v-if="uiStore.isSidebar"
            /><IconTransitionRightFilled v-else />
          </button>
        </div>
      </div>
    </section>
    <section
      class="h-full w-full text-slate-900 scrollbar-thumb-transparent overflow-scroll"
    >
      <MenuLabel :item="item" v-for="item in menus" :key="item.name" />
    </section>
    <section class="w-full">
      <div class="flex flex-col justify-center items-center gap-4">
        <ThemeButton v-if="uiStore.isSidebar" />
        <Button
          v-if="uiStore.isSidebar"
          variant="primary"
          :click="store.logoutUser"
          type="button"
          label="Log Out"
          w="full"
          :icon="IconLogout2"
        />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import {
  IconLogout2,
  IconTransitionLeftFilled,
  IconTransitionRightFilled,
} from "@tabler/icons-vue";
import { menus } from "~/menu/menu";
import Button from "./buttons/Button.vue";


const store = useUserStore();
const uiStore = useUiStore();
// const route = useRoute();
</script>
