<script setup lang="ts">
import { menus } from "../menu/menu";
import Button from "./atoms/buttons/Button.vue";

const route = useRoute()
</script>

<template>
  <TricoloreBar/>
  <header
    class="w-screen sticky top-0 bg-sand-50 z-100 h-20 border-b border-rust-600/20 transition-all duration-300 hover:shadow-sm"
  >
    <div class=" mx-auto h-full flex items-center justify-between px-12">
      <NuxtLink to="/" class="flex justify-center items-center gap-2">
        <img alt=" logo" src="/logo_primary.png" class="h-10 w-auto md:h-20" />
      </NuxtLink>
      <ul
        class="hidden md:flex flex-row items-center justify-center gap-4 text-md font-semibold "
      >
        <li
          v-for="menu in menus"
          class="hover:border-b-2 hover:border-gold-400 pb-1 px-4 rounded-full"
          :class="route.name === menu.name? 'text-rust-900 font-bold bg-gold-400/20 border':'text-rust-600'"
        >
          <NuxtLink :to="menu.path">
            {{ menu.label }}
          </NuxtLink>
        </li>
      </ul>
      <NuxtLink to="#">
        <Button label="Demander un devis" type="button" varient="primary"/>
      </NuxtLink>
    </div>
  </header>
</template>
