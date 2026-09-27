<template>
  <div class="flex h-screen overflow-hidden">
    <USidebar
      v-model:open="open"
      collapsible="icon"
      variant="sidebar"
      rail
      :ui="{
        container: 'h-full bg-(--sidebar)',
        inner: ' divide-transparent',
        body: 'py-0',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between ">
          <NuxtImg
          v-if="!open"
            src="/icon.png"
            alt="Súna Consulting - Votre représentant de confiance au Cameroun"
            quality="100"
            format="webp"
            class="object-contain transition-transform group-hover:scale-105 duration-200"
          />
          <NuxtImg
            v-else
            src="/Admin_logo.png"
            alt="Súna Consulting - Votre représentant de confiance au Cameroun"
            quality="100"
            format="webp"
            class="object-contain transition-transform group-hover:scale-105 duration-200"
          />
        </div>
      </template>
      
      <template #default="{ state }">
        <!-- <USeparator/> -->
        <UNavigationMenu
          :key="state"
          :items="menus"
          orientation="vertical"
          popover
          :collapsed="!open"
          color="neutral"
          tooltip
          :delayDuration="3"
          disableHoverTrigger
          :ui="{
            linkLabel: 'text-gray-100 ',
            linkLeadingIcon: 'text-gray-100 size-6 ',
            link: `
                p-1.5
                my-1
                rounded
                data-[active]:bg-(--secondary)
              `,
            list: 'sidebar-menu',
          }"
        />
      </template>
      <template #footer>
        <UDropdownMenu
          :items="userItems"
          :content="{ align: 'center', collisionPadding: 12 }"
          :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-48' }"
        >
          <UButton
            v-bind="user"
            trailing-icon="i-lucide-chevrons-up-down"
            color="neutral"
            variant="ghost"
            square
            class="w-full data-[state=open]:bg-elevated overflow-hidden text-gray-300"
            :ui="{
              trailingIcon: 'text-dimmed ms-auto',
            }"
          />
        </UDropdownMenu>
      </template>
    </USidebar>

    <div class="flex-1 flex flex-col h-screen overflow-hidden">
      <div
        class="h-(--ui-header-height) shrink-0 flex items-center border-b border-default"
      >
        <AdminNavbar />
      </div>
      <div class="flex-1 overflow-y-auto bg-(--background)">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { menus } from "~/menu/menu";

const open = ref(true);
const authStore = useAuthStore();

// const colorMode = useColorMode()

const user = ref({
  name: "Benjamin Canac",
  label: "Benjamin Canac",
  avatar: {
    alt: "Benjamin Canac",
  },
});

const userItems = computed<DropdownMenuItem[][]>(() => [
  [
    { label: "Profile", icon: "i-lucide-user" },
    { label: "Billing", icon: "i-lucide-credit-card" },
    { label: "Settings", icon: "i-lucide-settings", to: "/settings" },
  ],
  [
    {
      label: "Log out",
      icon: "i-lucide-log-out",
      onSelect: () => authStore.logout(),
    },
  ],
]);
</script>

<style>
.sidebar-menu {
  --ui-border: var(--sidebar-border);
}
</style>
