<template>
  <UFieldGroup class="w-full">
    <!-- <UInput loading/> -->
    <UInputMenu
      v-model="model"
      v-model:search-term="searchQuery"
      icon="i-tabler-search"
      :items="options"
      :loading="loading"
      placeholder="Search..."
      value-key="value"
      label-key="label"
      :ui="{
        base: 'focus-visible:border-default focus-visible:ring-0',
      }"
      class="w-full"
      @update:search-term="onSearch"
    />
    <UDashboardSearchButton
      :kbds="[]"
      :loading="loading"
      :ui="{
        base: 'focus-visible:border-default focus-visible:ring-0',
      }"
      class="bg-(--secondary) hover:bg-(--secondary)/80 text-white"
      variant="soft"
      type="button"
      @click="() => onSearch"
    />
  </UFieldGroup>
</template>

<script setup lang="ts">
import { type AxiosInstance } from "axios";
import { ref } from "vue";

type OptionType = {
  label: string;
  value: string | number;
};

const props = defineProps<{
  url: string;
  optionValue: string;
  optionLabel: string;
}>();

const model = defineModel<string | number>();

const searchQuery = ref("");
const options = ref<OptionType[]>([]);
const loading = ref(false);
 const getApi = ()=>{
    const { $axios } = useNuxtApp();
  return $axios as AxiosInstance;
  }
let timeoutId: ReturnType<typeof setTimeout> | null = null;

const onSearch = (query: string) => {
    const api = getApi()
  searchQuery.value = query;

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  if (!query.trim()) {
    options.value = [];
    return;
  }

  timeoutId = setTimeout(async () => {
    try {
      loading.value = true;

      const response = await api(`${props.url}/search:${props.optionLabel}:${encodeURIComponent(query)}`);

      options.value = response.data.map((item: any) => ({
        label: item[props.optionLabel],
        value: item[props.optionValue],
      }));
    } catch (err) {
      console.error("Erreur lors de la recherche :", err);

      options.value = [];
    } finally {
      loading.value = false;
    }
  }, 500);
};
</script>
