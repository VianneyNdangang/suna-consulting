<script setup lang="ts">
import type { BreadcrumbItem, NavigationMenuItem } from '@nuxt/ui'

const props = defineProps<{
  menus: NavigationMenuItem[]
}>()

const route = useRoute()

// const items = computed<BreadcrumbItem[]>(() => {
//   const findPath = (
//     menus: NavigationMenuItem[],
//     parents: NavigationMenuItem[] = []
//   ): NavigationMenuItem[] | null => {
//     for (const menu of menus) {
//       const currentPath = [...parents, menu]

//       // Vérifie si cette route correspond à la route actuelle
//       if (
//         menu.to &&
//         (
//           route.path === menu.to ||
//           route.path.startsWith(`${menu.to}/`)
//         )
//       ) {
//         // On cherche d'abord une route enfant plus précise
//         if (menu.children?.length) {
//           const childPath = findPath(menu.children, currentPath)

//           if (childPath) {
//             return childPath
//           }
//         }

//         return currentPath
//       }

//       if (menu.children?.length) {
//         const childPath = findPath(menu.children, currentPath)
//         if (childPath) {
//           return childPath
//         }
//       }
//     }

//     return null
//   }

//   const activePath = findPath(props.menus)

//   if (!activePath) {
//     return []
//   }

//   return activePath.map((menu) => ({
//     label: String(menu.label),
//     to: menu.to
//   }))
// })
</script>

<template>
  <!-- <UBreadcrumb :items="items" /> -->
</template>
