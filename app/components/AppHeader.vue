<script setup lang="ts">
import { IconMenu2, IconUserFilled } from "@tabler/icons-vue";
import { menus } from "../menu/menu";
import Button from "./buttons/Button.vue";
import Drawers from "./drawers/Drawers.vue";

const route = useRoute();
const isMenu = ref(false);
</script>

<template>
  <TricoloreBar />
  <header
    class="w-screen sticky top-0 bg-sand-50 z-100 h-14 md:h-20 border-b border-rust-600/20 transition-all duration-300 hover:shadow-sm"
  >
    <div class="mx-auto h-full flex items-center justify-between px-4 md:px-20">
      
      <NuxtLink to="/" class="flex justify-center md:justify-start items-center gap-2 w-full">
        <NuxtImg
          src="/SC-H01.png"
          sizes="100px md:200px"
          quality="100"
          format="webp"
          class="rounded-md"
        />
      </NuxtLink>
      <ul
        class="hidden md:flex flex-row items-center justify-end gap-4 text-md font-semibold w-full"
      >
        <li
          v-for="menu in menus"
          class="hover:border-b-2 hover:border-gold-400 pb-1 px-4 rounded-full"
          :class="
            route.name === menu.name
              ? 'text-rust-900 font-bold bg-gold-400/20 border'
              : 'text-rust-600'
          "
        >
          <NuxtLink :to="menu.path">
            {{ menu.label }}
          </NuxtLink>
        </li>
      </ul>
      <NuxtLink to="#" class="hidden md:flex w-lg justify-end mr-2">
        <Button label="Demander un devis" type="button" variant="primary" />
      </NuxtLink>
      <button
        class="hidden md:flex rounded-full p-2 flexitems-center justify-center bg-rust-600/50"
      >
        <IconUserFilled size="25" class="text-rust-900" />
      </button>
      <div class="cursor-pointer flex justify-center items-center md:hidden">
        <IconMenu2
          size="30"
          @click="() => (isMenu = true)"
          class="text-rust-600"
        />
      </div>

      <Drawers :isOpen="isMenu" @close="isMenu = false" placement="start">
        <div class="flex py-8 px-3 flex-col h-full">
          <NuxtLink to="/" class="flex justify-center items-center gap-2">
            <NuxtImg
              src="/SC-H01.png"
              sizes="250px"
              quality="100"
              format="webp"
              class="rounded-md"
            />
          </NuxtLink>
          <div class="h-full">
            <p class="font-bold text-rust-900 text-xl border-b pb-1 mb-5">
              Menu
            </p>
            <ul
              class="flex flex-col items-start justify-center gap-3 text-sm font-semibold"
            >
              <li
                v-for="menu in menus"
                @click="isMenu = false"
                class="pb-1 px-4 rounded-full"
                :class="
                  route.name === menu.name
                    ? 'text-rust-900 font-bold bg-gold-400/20 border-l-2'
                    : 'text-rust-600'
                "
              >
                <NuxtLink :to="menu.path">
                  {{ menu.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="flex items-center justify-between">
            <NuxtLink to="#">
              <Button
                label="Demander un devis"
                type="button"
                variant="primary"
              />
            </NuxtLink>
            <button
              class="rounded-full p-2 flexitems-center justify-center bg-rust-600/50"
            >
              <IconUserFilled size="25" class="text-rust-900" />
            </button>
          </div>
        </div>
      </Drawers>
    </div>
  </header>
</template>
