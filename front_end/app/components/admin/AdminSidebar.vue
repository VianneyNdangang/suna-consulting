<template>
  <div class="flex h-screen overflow-hidden">
    <USidebar
      v-model:open="open"
      collapsible="icon"
      rail
      :ui="{
        container: 'h-full bg-(--sidebar)',
        inner: ' divide-transparent',
        body: 'py-0',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between px-2 py-2">
          <NuxtImg
            src="/icon.png"
            alt="Súna Consulting - Votre représentant de confiance au Cameroun"
            width="auto"
            height="50"
            quality="100"
            format="webp"
            class="h-8 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
          />
          <UButton
            icon="i-lucide-panel-left"
            color="neutral"
            variant="ghost"
            aria-label="Toggle sidebar"
            @click="open = !open"
          />
        </div>
      </template>

      <template #default="{ state }">
        <UNavigationMenu
  :key="state"
  :items="menus"
  orientation="vertical"
  disableHoverTrigger
  :ui="{
    linkLabel: 'text-gray-200 font-semibold ',
    linkLeadingIcon: 'text-gray-300 h-6 w-6',
    link: `
      p-1.5
      my-2
      rounded
      data-[active]:bg-(--secondary)
    `
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
            class="w-full data-[state=open]:bg-elevated overflow-hidden"
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
      <span class="bg-(--background) py-2 px-5"><Breadcrumb :menus="menus"/></span>
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

// const colorMode = useColorMode()

const user = ref({
  name: "Benjamin Canac",
  label: "Benjamin Canac",
  avatar: {
    src: "https://github.com/benjamincanac.png",
    alt: "Benjamin Canac",
  },
});

const userItems = computed<DropdownMenuItem[][]>(() => [
  [
    { label: "Profile", icon: "i-lucide-user" },
    { label: "Billing", icon: "i-lucide-credit-card" },
    { label: "Settings", icon: "i-lucide-settings", to: "/settings" },
  ],
  // [
  //   {
  //     label: 'Appearance',
  //     icon: 'i-lucide-sun-moon',
  //     children: [
  //       {
  //         label: 'Light',
  //         icon: 'i-lucide-sun',
  //         type: 'checkbox',
  //         checked: colorMode.value === 'light',
  //         onUpdateChecked(checked: boolean) {
  //           if (checked) colorMode.preference = 'light'
  //         },
  //         onSelect(e: Event) {
  //           e.preventDefault()
  //         }
  //       },
  //       {
  //         label: 'Dark',
  //         icon: 'i-lucide-moon',
  //         type: 'checkbox',
  //         checked: colorMode.value === 'dark',
  //         onUpdateChecked(checked: boolean) {
  //           if (checked) colorMode.preference = 'dark'
  //         },
  //         onSelect(e: Event) {
  //           e.preventDefault()
  //         }
  //       }
  //     ]
  //   }
  // ],
  [{ label: "Log out", icon: "i-lucide-log-out" }],
]);
</script>
