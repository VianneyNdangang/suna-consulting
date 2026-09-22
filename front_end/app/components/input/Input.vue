<template>
  <UFormField
    :label="label"
    :error="error"
    :ui="{ label: labelClass }"
    class="w-full"
  >
    <!-- TEXT / EMAIL / PASSWORD / NUMBER / TEL -->
    <UInput
      v-if="type !== 'file' && type !== 'number'"
      v-model="textModel"
      :type="type === 'password' && showPassword ? 'text' : type"
      :name="name"
      :ui="{
        base:'focus-visible:border-default focus-visible:ring-0'
      }"
      :placeholder="placeholder"
      :color=" undefined"
      :id="name"
      :icon="icon"
      class="w-full rounded focus:ring-0 "
    >
   
      <!-- Trailing -->
      <template #trailing>
        <div class="flex items-center gap-1">
          <!-- Clear -->
          <!--
          <UButton
            v-if="textModel !== '' && textModel !== null"
            type="button"
            color="neutral"
            variant="link"
            size="sm"
            icon="i-lucide-x"
            aria-label="Effacer"
            @click="clearValue"
          />
          -->

          <!-- Show / hide password -->
          <UButton
            v-if="type === 'password'"
            type="button"
            color="neutral"
            variant="ghost"
            size="xs"
            :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="
              showPassword
                ? 'Masquer le mot de passe'
                : 'Afficher le mot de passe'
            "
            @click="showPassword = !showPassword"
          />
        </div>
      </template>
    </UInput>
     <UInputNumber
      v-model="model"
      v-if="type === 'number'"
      :name="name"
      :placeholder="placeholder"
      :id="name"
      :icon="icon"
      :min=" min "
      :max="max"
      :step="step "
      :ui="{
        base:'focus-visible:border-default focus-visible:ring-0'
      }"
      class="w-full rounded"
    />
    <!-- IMAGE -->
    <div v-if="type === 'file'" class="relative w-full">
      <UInput
        ref="fileInput"
        :id="name"
        type="file"
        :name="name"
        :accept="accept || 'image/*'"
        class="w-full rounded"
        :ui="{
        base:'focus-visible:border-default focus-visible:ring-0'
      }"
        @change="onFileChange"
      />

      <!-- Clear selected file -->
      <!--
      <UButton
        v-if="model instanceof File"
        type="button"
        color="neutral"
        variant="ghost"
        size="xs"
        icon="i-lucide-x"
        aria-label="Supprimer l'image"
        class="absolute right-2 top-1/2 -translate-y-1/2"
        @click="removeFile"
      />
      -->
    </div>
  </UFormField>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    type?: "text" | "email" | "password" | "number" | "tel" | "file";
    name: string;
    placeholder?: string;
    error?: string;
    accept?: string;
    labelClass?: string;
    icon?: string;

    // Number
    min?: number;
    max?: number;
    step?: number;
  }>(),
  {
    type: "text",
    labelClass: "text-sm font-semibold text-slate-700",
  },
);

const model = defineModel<any>();

const showPassword = ref(false);

const fileInput = ref<any>(null);

const textModel = computed<string>({
  get: () => {
  //   if (props.type === "number") {
  //     if (
  //       model.value === null ||
  //       model.value === undefined ||
  //       model.value === ""
  //     ) {
  //       return "";
  //     }

  //     return String(model.value);
  //   }

    return typeof model.value === "string" ? model.value : "";
  },

  set: (value: string) => {
    // NUMBER
    if (props.type === "number") {
      if (value === "") {
        model.value = null;
        return;
      }

      const numberValue = Number(value);

      model.value = Number.isNaN(numberValue) ? null : numberValue;

      return;
    }
    model.value = value;
  },
});

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  const file = target.files?.[0] ?? null;

  model.value = file;
};

/**
 * Effacer la valeur
 */
// const clearValue = () => {
//   model.value = null;
// };

/**
 * Supprimer le fichier sélectionné
 */
// const removeFile = () => {
//   model.value = null;

//   const input =
//     fileInput.value?.$el?.querySelector("input") ??
//     fileInput.value?.$el ??
//     fileInput.value;

//   if (input instanceof HTMLInputElement) {
//     input.value = "";
//   }
// };
</script>
