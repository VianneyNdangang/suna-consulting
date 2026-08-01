<template>
  <aside
    class="fixed left-0 top-0 bottom-0 z-50 flex flex-col
           border-r border-rust-600/15
           bg-(--surface)
           text-ink-900
           shadow-lg
           transition-all duration-300 ease-in-out"
    :class="uiStore.isSidebar ? 'w-72 p-4' : 'w-20 p-3 items-center'"
  >
    <!-- Header -->
    <header class="w-full pb-4 border-b border-rust-600/10">
      <img
        src="/SC-H01.png"
        alt="Logo"
        class="h-14 w-auto rounded-lg mx-auto"
      />

      <div
        class="mt-4 flex items-center"
        :class="uiStore.isSidebar ? 'justify-between' : 'flex-col gap-2'"
      >
        <h2
          v-if="uiStore.isSidebar"
          class="text-lg font-semibold text-rust-900"
        >
          Menu
        </h2>

        <button
          @click="uiStore.handleChange()"
          class="rounded-lg p-2 transition hover:bg-rust-600/10"
        >
          <IconTransitionLeftFilled
            v-if="uiStore.isSidebar"
            class="text-rust-600"
          />

          <IconTransitionRightFilled
            v-else
            class="text-rust-600"
          />
        </button>
      </div>
    </header>

    <!-- Menu -->
    <main class="flex-1 overflow-y-auto py-4">
      <MenuLabel
        v-for="item in menus"
        :key="item.name"
        :item="item"
      />
    </main>

    <!-- Footer -->
    <footer class="pt-4 border-t border-rust-600/10">
      <div class="flex flex-col gap-3">
        <ThemeButton v-if="uiStore.isSidebar" />

        <Button
          v-if="uiStore.isSidebar"
          variant="danger"
          label="Déconnexion"
          type="button"
          :icon="IconLogout2"
          :click="store.logout"
          w="full"
        />
      </div>
    </footer>
  </aside>
</template>

<script setup lang="ts">
import {
  IconLogout2,
  IconTransitionLeftFilled,
  IconTransitionRightFilled,
} from "@tabler/icons-vue"

import { menus } from "~/menu/menu"

const store = useAuthStore()
const uiStore = useUiStore()
</script>