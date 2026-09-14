```vue
<template>
  <UHeader
    :ui="{
      root: 'border-0 p-0 w-full bg-(--surface) text-(--text-primary)',
      container: 'px-3 sm:px-4 h-16 flex items-center gap-2 sm:gap-4'
    }"
  >
    <!-- Menu mobile -->
    <template #left>
      <UButton
        icon="i-lucide-menu"
        color="neutral"
        variant="ghost"
        size="lg"
        aria-label="Ouvrir le menu"
        class="lg:hidden"
        @click="isMenuOpen = true"
      />

      <!-- Branding -->
      <NuxtLink
        to="/admin"
        class="flex items-center gap-2 shrink-0"
      >
        <div class="hidden sm:block leading-tight">
          <p class="font-semibold text-sm">
            Súna Consulting
          </p>

          <p class="text-xs text-(--secondary)">
            Administration
          </p>
        </div>
      </NuxtLink>
    </template> 

    <!-- Actions -->
    <template #right>
      <div class="flex items-center gap-1 sm:gap-2 shrink-0">
        <!-- Thème -->
        <UColorModeButton />

        <!-- Profil -->
        <UButton
          icon="i-lucide-user"
          color="neutral"
          variant="ghost"
          size="lg"
          aria-label="Profil"
        />
      </div>
    </template>
  </UHeader>

  <!-- Mobile Slideover / Dropdown Menu -->
       <UDrawer title="Menu" v-model:open="isMenuOpen" direction="left" 
       :ui="{
        container: 'bg-(--surface)'
       }"
       >
        <template #body>
          <USeparator/>
           <UNavigationMenu
            :items="menus"
            orientation="vertical"
            :ui="{
              link: 'px-3 py-1.5 text-md font-medium w-full',
              // linkActive: 'text-rust-700 underline decoration-gold-500 decoration-2 underline-offset-8',
            }"
          />
        </template>
       </UDrawer>
       
</template>

<script setup lang="ts">
import type { CommandPaletteGroup } from '#ui/types'
import { menus } from '~/menu/menu';
import Breadcrumb from '../breadcrumb/Breadcrumb.vue';

const emit = defineEmits<{
  'toggle-sidebar': []
}>()

const isMenuOpen = ref(false)

const groups = ref<CommandPaletteGroup[]>([
  {
    id: 'pages',
    label: 'Pages',
    items: [
      {
        label: 'Accueil',
        icon: 'i-lucide-house',
        to: '/'
      },
      {
        label: 'Services',
        icon: 'i-lucide-briefcase',
        to: '/services'
      },
      {
        label: 'Contact',
        icon: 'i-lucide-mail',
        to: '/contact'
      }
    ]
  }
])
</script>