```vue
<template>
  <UModal
    :open="props.modelValue"
    :ui="{ content: 'sm:max-w-xl' }"
    @update:open="(val: boolean) => emit('update:modelValue', val)"
  >
    <!-- Header -->
    <template #title>
      <div class="flex items-start gap-3">
        <div
          class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-rust-600/10 text-rust-600"
        >
          <UIcon
            name="i-tabler-message-star"
            class="size-5"
          />
        </div>

        <div class="min-w-0">
          <h2 class="text-base font-bold text-rust-600 sm:text-lg">
            Partagez votre expérience
          </h2>

          <p class="mt-0.5 text-sm text-rust-500">
            Votre avis nous aide à améliorer nos services.
          </p>
        </div>
      </div>
    </template>

    <template #body>
      <form
        @submit.prevent="submitTestimonial"
        class="flex flex-col gap-5"
      >
        <!-- Introduction -->
        <UAlert
          color="info"
          variant="subtle"
          icon="i-tabler-info-circle"
          description="Quelques secondes suffisent pour partager votre expérience avec Súna Consulting."
        />

        <!-- Informations -->
        <section class="space-y-3">
          <div>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-tabler-user"
                class="size-4 text-rust-600"
              />

              <h3 class="text-sm font-semibold text-rust-600">
                Vos informations
              </h3>
            </div>

            <p class="mt-1 text-xs text-rust-500">
              Ces informations permettront d'identifier votre témoignage.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <!-- Nom -->
            <Input
              v-model="authorName"
              name="author_name"
              icon="i-tabler-user"
              label="Nom complet"
              type="text"
              placeholder="Ex. Jean Dupont"
              :error="formErrors.author_name"
            />

            <!-- Localisation -->
            <Input
              v-model="authorLocation"
              name="author_location"
              icon="i-tabler-map-pin"
              label="Ville / Pays"
              type="text"
              placeholder="Ex. Douala, Cameroun"
              :error="formErrors.author_location"
            />

          </div>
        </section>

        <!-- Service -->
        <section class="space-y-3">
          <div>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-tabler-briefcase"
                class="size-4 text-rust-600"
              />

              <h3 class="text-sm font-semibold text-rust-600">
                Votre expérience
              </h3>
            </div>

            <p class="mt-1 text-xs text-rust-500">
              Indiquez le service que vous avez utilisé.
            </p>
          </div>

          <Input
            v-model="serviceUsed"
            name="service_used"
            icon="i-tabler-briefcase"
            label="Service utilisé"
            type="text"
            placeholder="Ex. Création de site web"
            :error="formErrors.service_used"
          />
        </section>

        <!-- Note -->
        <section class="space-y-3">
          <div>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-tabler-star"
                class="size-4 text-rust-600"
              />

              <h3 class="text-sm font-semibold text-rust-600">
                Votre note
              </h3>
            </div>

            <p class="mt-1 text-xs text-rust-500">
              Comment évaluez-vous votre expérience ?
            </p>
          </div>

          <div class="flex items-center justify-center gap-2 py-2">
            <button
              v-for="n in 5"
              :key="n"
              type="button"
              class="rounded-md p-1 transition-all duration-150 hover:scale-110"
              :aria-label="`Donner ${n} étoile${n > 1 ? 's' : ''}`"
              @click="rating = n"
            >
              <UIcon
                name="i-tabler-star-filled"
                class="size-8"
                :class="
                  n <= (rating ?? 0)
                    ? 'text-gold-400'
                    : 'text-slate-200'
                "
              />
            </button>
          </div>

          <p
            class="text-center text-sm font-semibold text-rust-600"
          >
            {{ rating }}/5
          </p>

          <p
            v-if="formErrors.rating"
            class="text-center text-xs font-medium text-rose-500"
            role="alert"
          >
            {{ formErrors.rating }}
          </p>
        </section>

        <!-- Témoignage -->
        <section class="space-y-3">
          <div>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-tabler-message-2"
                class="size-4 text-rust-600"
              />

              <h3 class="text-sm font-semibold text-rust-600">
                Votre témoignage
              </h3>
            </div>

            <p class="mt-1 text-xs text-rust-500">
              Dites-nous ce que vous avez pensé de notre accompagnement.
            </p>
          </div>

          <Textarea
            v-model="content"
            name="content"
            label="Votre avis"
            placeholder="Ex. Je suis très satisfait de l'accompagnement de Súna Consulting..."
            :error="formErrors.content"
          />
        </section>

        <!-- Photo optionnelle -->
        <section class="space-y-3">
          <div>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-tabler-camera"
                class="size-4 text-rust-600"
              />

              <h3 class="text-sm font-semibold text-rust-600">
                Votre photo
                <span class="font-normal text-slate-400">
                  (facultatif)
                </span>
              </h3>
            </div>

            <p class="mt-1 text-xs text-rust-500">
              Ajoutez une photo pour accompagner votre témoignage.
            </p>
          </div>

          <!-- <Input
            v-model="photoUrl"
            name="photo_url"
            icon="i-tabler-photo"
            label="URL de votre photo"
            type="image"
            placeholder="https://..."
            :error="formErrors.photo_url"
          /> -->

          <!-- Aperçu -->
          <!-- <div
            v-if="photoUrl"
            class="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3"
          >
            <UAvatar
              :src="photoUrl"
              :alt="authorName || 'Votre photo'"
              size="md"
            />

            <div class="min-w-0">
              <p class="text-xs font-medium text-slate-700">
                Aperçu de votre photo
              </p>

              <p class="truncate text-[11px] text-slate-400">
                {{ photoUrl }}
              </p>
            </div>
          </div> -->
        </section>

        <USeparator />

        <!-- Action -->
        <div class="space-y-3 pt-2">
          <Button
            type="submit"
            :loading="loading"
            variant="primary"
            w="full"
            icon="i-tabler-send"
            label="Envoyer mon témoignage"
          />

          <div class="flex items-center justify-center gap-1.5 text-center">
            <UIcon
              name="i-tabler-shield-check"
              class="size-3.5 text-slate-400"
            />

            <p class="text-[11px] text-slate-500">
              Votre témoignage sera vérifié avant sa publication.
            </p>
          </div>
        </div>
      </form>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import { testimonialFormSchema } from "~/schemas/forms.schema";

import Button from "../buttons/Button.vue";
import Input from "../input/Input.vue";
import Textarea from "../textarea/Textarea.vue";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const store = useTestimonialstore()
const toast = useToast();
const loading = ref(false);

const {
  defineField,
  errors: formErrors,
  handleSubmit,
  resetForm,
} = useForm({
  validationSchema: toTypedSchema(testimonialFormSchema),

  initialValues: {
    author_name: "",
    author_location: "",
    service_used: "",
    rating: 5,
    content: "",
    // photo_url: "",
    is_published: false,
  },
});

const [authorName] = defineField("author_name");
const [authorLocation] = defineField("author_location");
const [serviceUsed] = defineField("service_used");
const [rating] = defineField("rating");
const [content] = defineField("content");
// const [photoUrl] = defineField("photo_url");

const submitTestimonial = handleSubmit(async (values) => {
  try {
    loading.value = true;
    await store.createTestimonials(values)

    console.log("Témoignage :", values);

    toast.add({
      title: "Merci pour votre témoignage !",
      description:
        "Votre témoignage a bien été envoyé.",
      color: "success",
      icon: "i-tabler-check",
    });

    resetForm();

    emit("update:modelValue", false);

  } catch (error) {
    console.error(error);

    toast.add({
      title: "Impossible d'envoyer le témoignage",
      description:
        "Une erreur est survenue. Veuillez réessayer.",
      color: "error",
      icon: "i-tabler-x",
    });
  } finally {
    loading.value = false;
  }
});
</script>