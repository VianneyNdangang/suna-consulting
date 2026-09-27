<template>
  <UDashboardNavbar
    :toggle="false"
    :ui="{
      root: 'border-0 w-full  bg-(--surface) text-(--text-primary)',
    }"
    class="shadow-md h-16"
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
      <div class="flex items-center gap-1 md:gap-3">
            <LocaleButton />
            <UColorModeButton class="border border-(--border)" />
            <UDropdownMenu :items="items" v-if="user">
              <div>
                <Profile class="hidden md:flex" :user="user" />
                <UAvatar
                  class="flex md:hidden"
                  :src="user?.avatar_url"
                  :alt="user?.full_name"
                />
              </div>
            </UDropdownMenu>
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
import ScrollToTop from "../ScrollToTop.vue";
import Profile from "../profile/Profile.vue";
import type { DropdownMenuItem } from "@nuxt/ui";

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);
const emit = defineEmits<{
  "toggle-sidebar": [];
}>();

const isMenuOpen = ref(false);

const handleLogout = async () => {
  await authStore.logout();
};
const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: user.value.full_name,
      avatar: {
        src: user.value.avatar_url,
        loading: "lazy",
      },
      type: "label",
    },
  ],
  [
    {
      label: 'Revenir au site',
      icon: 'i-tabler-world',
      onSelect: ()=> navigateTo('/')
    }
  ],
  [
    {
      label: "Modifier votre profil",
      icon: "i-lucide-user",
      // onSelect: handleEditProfile,
    },
    {
      label: "Déconnexion",
      icon: "i-tabler-logout",
      onSelect: handleLogout,
    },
  ],
]);

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
