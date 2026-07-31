<script setup lang="ts">
import type { servicesType } from "~/types/types.js";
import Button from "../buttons/Button.vue";
import Input from "../input/Input.vue";
import Select from "../select/Select.vue";
import Textarea from "../textarea/Textarea.vue";

const serviceStore = useServiceStore();
const service = ref(serviceStore.services);
console.log("servicesservicesservices",service.value)
// watchEffect(
//   services.value,)
let choices: {label: string, value:string}[] = [];
service.value.forEach((element: servicesType) => {
  choices.push({ label: element.title, value: element.slug });
});

const form = reactive({
  name: "",
  email: "",
  phone: "",
  service: "",
  details: "",
});

const submitted = ref(false);

function submitForm() {
  submitted.value = true;
}
</script>

<template>
  <section class="bg-ink-900 px-4 py-6 md:py-10 text-white md:px-20 rounded-lg">
    <div class="flex flex-col mx-auto w-full gap-10">
      <div>
        <p
          class="text-sm font-semibold uppercase tracking-[0.3em] text-gold-400"
        >
          Demande de devis
        </p>
        <h2 class="mt-3 text-3xl font-semibold sm:text-4xl">
          Décrivez votre besoin et nous vous recontacterons
        </h2>
        <p class="mt-5 max-w-xl text-lg leading-8 text-white/80">
          Le formulaire est pensé pour recueillir rapidement les informations
          importantes et vous proposer une première réponse adaptée.
        </p>
      </div>

      <form
        class="rounded-xl border border-white/10 bg-white/10 p-2 md:p-6 backdrop-blur"
        @submit.prevent="submitForm"
      >
        <div class="grid gap-4 md:grid-cols-2">
          <Input
            type="text"
            name="name"
            label="Nom Complet"
            placeholder="Jean Mbala"
          />
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="vous@email.com"
          />
          <Input
            type="text"
            name="phone"
            label="Téléphone"
            placeholder="+237 6xx xx xx xx"
          />
          <Select
            name="service"
            label="Service"
            placeholder="Sélectionnez un Service"
            :options="choices"
          />
          <!-- <label class="text-sm font-medium text-sand-50">
            Service concerné
            <input v-model= class="mt-2 w-full rounded-lg border border-white/15 bg-white/90 px-4 py-3 text-ink-900 outline-none" placeholder="Accompagnement immobilier" />
          </label> -->

          <Textarea
            label="Décrivez votre besoin"
            name="description"
            placeholder="Expliquez votre contexte et ce que vous souhaitez obtenir."
          />
        </div>
        <Button type="submit" label="Envoyer la demande" variant="primary" />
      </form>
    </div>
  </section>
</template>
