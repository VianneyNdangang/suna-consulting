<script setup lang="ts">
import { type servicesType, type site_contentType } from "~/types/types";
import { menus } from "../menu/menu";
import Button from "./buttons/Button.vue";

const SCstore = usesite_contentStore();
const serviceStore = useServiceStore();

const siteContent = ref<site_contentType>();
const services = ref<servicesType[]>([]);

onMounted(async () => {
  await SCstore.fetchsite_content();
  await serviceStore.fetchServices();

  siteContent.value = SCstore.site_content;
  services.value = serviceStore.services;
});
</script>

<template>
  <div class="bg-white w-full px-20 py-3">
    <form class="flex items-center justify-center">
      <input type="email" name="email" id="email" class="bg-gray-200 rounded" />
      <Button type="submit" label="Envoyer" variant="secondary" />
    </form>
  </div>
  <footer class="w-screen bg-rust-900 text-sand-50 px-4 py-10 md:px-20">
    <div class="mx-auto py-16 grid md:grid-cols-4 gap-10">
      <div class="flex items-center">
        <NuxtImg src="/logo_white.png" class="h-35 w-auto rounded-2xl" />
      </div>

      <div class="flex flex-col">
        <h3 class="font-semibold mb-4">Services</h3>

        <NuxtLink v-for="service in services" :to="`services/${service.id}`">{{
          service.slug
        }}</NuxtLink>
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
        <div class="class flex flex-col gap-3">
          <div>
            <p class="text-sm font-bold mb-1 uppercase tracking-[0.2em]">
              Téléphone
            </p>
            <p v-for="phon in siteContent?.contact_phone" class="text-md">
              {{ phon }}
            </p>
          </div>
          <div>
            <p class="text-sm font-bold mb-1 uppercase tracking-[0.2em]">
              Email
            </p>
            <p class="text-md">sunaconsulting@gmail.com</p>
          </div>
          <div>
            <p class="text-sm font-bold mb-1 uppercase tracking-[0.2em]">
              WhatsApp
            </p>
            <p v-for="what in siteContent?.contact_whatsapp" class="text-md">
              {{ what }}
            </p>
          </div>
        </div>
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
