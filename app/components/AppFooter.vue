<script setup lang="ts">
import { menus } from "../menu/menu";
import Button from "./atoms/buttons/Button.vue";
</script>

<template>
  <div class="bg-white w-full p-3">
    <form class="flex items-center justify-center">
      <input type="email" name="email" id="email" class="bg-gray-200 rounded" />
      <Button type="submit" label="Envoyer" varient="secondary" />
    </form>
  </div>
  <footer class="w-screen bg-rust-900 text-sand-50 px-10">
    <div class="mx-auto py-16 grid md:grid-cols-4 gap-10">
      <div class="flex items-center">
        <img src="/logo_white.png" class="h-35 w-auto" />
      </div>

      <div class="flex flex-col">
        <h3 class="font-semibold mb-4">Services</h3>
      </div>
      <div class="flex flex-col justify-center">
        <h3 class="font-semibold mb-4">Liens rapides</h3>
        <div class="flex flex-col">
          <NuxtLink
            :to="menu.path"
            v-for="menu in menus"
            class="hover:text-[#c79e46]"
          >
            {{ menu.label }}
          </NuxtLink>
        </div>
      </div>
      <div class="flex flex-col">
        <h3 class="font-semibold mb-4">Contact</h3>
      </div>
    </div>
    <div class="flex gap-4 justify-end">
      <NuxtLink to="#">
        <Icon name="tabler:brand-facebook-filled" size="35" />
      </NuxtLink>
      <NuxtLink to="#">
        <Icon name="tabler:brand-twitter-filled" size="35" />
      </NuxtLink>
      <NuxtLink to="#">
        <Icon name="tabler:brand-instagram" size="35" />
      </NuxtLink>
    </div>
    <div
      class="flex flex-col md:flex-row justify-center border-t border-rust-600/30 text-center py-4 text-xs"
    >
      &copy; 2026 SUNA consulting. All rights reserved.
    </div>
  </footer>
</template>
