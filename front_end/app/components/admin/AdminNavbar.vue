<template>
  <UDashboardNavbar
    :toggle="false"
    :ui="{
      root: 'border-0 w-full h-16 bg-(--surface) text-(--text-primary)',
    }"
  >
    <!-- Menu mobile -->
    <template #leading>
      <UDashboardSidebarToggle
        variant="outline"
        @click="isMenuOpen = true"
        active-color="primary"
      />
    </template>
    <template #default>
      <NuxtLink to="/" class="flex items-center gap-2 shrink-0">
        <Icon name="i-tabler-world" class="text-(--secondary)" />
        <p class="font-semibold">Revenir au site</p>
      </NuxtLink>
    </template>
    <!-- Actions -->
    <template #right>
      <div class="flex items-center gap-1 sm:gap-2 shrink-0">
       

        <!-- Profil -->
        <UDropdownMenu>
          <UButton
            icon="i-lucide-user"
            color="neutral"
            variant="ghost"
            size="lg"
            aria-label="Profil"
          />
        </UDropdownMenu>  
        <LocaleButton/>
        <!-- Thème -->
        <UColorModeButton />
       
      </div>
    </template>
  </UDashboardNavbar>

  <!-- Mobile Slideover / Dropdown Menu -->
  <UDrawer
    title="Menu"
    v-model:open="isMenuOpen"
    direction="left"
    siz
    :ui="{
      content: 'bg-(--surface) w-70',
    }"
  >
    <template #body>
      <USeparator />
      <UNavigationMenu
        :items="mobileMenu"
        orientation="vertical"
        :ui="{
          link: 'px-3 py-1.5 text-md font-medium w-full',
        }"
      />
    </template>
  </UDrawer>
</template>

<script setup lang="ts">
import { menus } from "~/menu/menu";
import LocaleButton from "../locale/LocaleButton.vue";

const emit = defineEmits<{
  "toggle-sidebar": [];
}>();

const isMenuOpen = ref(false);

const mobileMenu = computed(() => {
  let menu = [] as any[];
  menus.value.forEach((item) => {
    const newChildren = [] as any[];

    if (item.children?.length) {
      item.children.forEach((element) => {
        newChildren.push({
          ...element,
          onSelect: () => {
            isMenuOpen.value = false;
          },
        });
      });
    }
    menu.push({
      ...item,
      children: newChildren,
      onSelect: () => {
        if (!item.children?.length) {
          isMenuOpen.value = false;
        }
      },
    });
  });
  return menu;
});
</script>
