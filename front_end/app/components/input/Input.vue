<template>
  <UFormField :label="label" :error="error" class="w-full">
    <UInput
      v-if="type !== 'image'"
      v-model="textModel"
      :type="type === 'password' && showPassword ? 'text' : type"
      :name="name"
      :placeholder="placeholder"
      :color="error ? 'error' : 'neutral'"
      class="w-full"
    >
      <template v-if="type === 'password'" #trailing>
        <UButton
          color="neutral"
          variant="ghost"
          size="xs"
          :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
          :aria-label="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
          @click="showPassword = !showPassword"
        />
      </template>
    </UInput>

    <input
      v-else
      :id="name"
      type="file"
      :accept="accept || 'image/*'"
      class="w-full rounded border border-(--border) bg-transparent px-3 py-2 text-sm"
      @change="onFileChange"
    />
  </UFormField>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const showPassword = ref(false);

const model = defineModel<string | File>();

const textModel = computed<string | undefined>({
  get: () => typeof model.value === "string" ? model.value : undefined,
  set: (value) => { model.value = value; },
});

const props = defineProps<{
  label?: string;
  type: "text" | "email" | "password" | "number" | "image";
  name: string;
  placeholder?: string;
  error?: string;
  accept?: string;
}>();

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.files?.length) {
    model.value = target.files[0];
  }
};
</script>