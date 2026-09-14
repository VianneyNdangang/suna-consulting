<template>
  <UFormField
    :label="label"
    :name="name"
    :error="error"
    class="w-full outline-0"
    :ui="{ label: labelClass }"
  >
    <UInputMenu
      v-model="model"
      v-model:search-term="searchQuery"
      :icon="icon"
      :items="options"
      :loading="loading"
      :placeholder="placeholder"
      :name="name"
      value-key="value"
      label-key="label"
      class="w-full"
      @update:search-term="onSearch"
    />
  </UFormField>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue'

type OptionType = {
  label: string
  value: string | number
}

const props = defineProps<{
  url: string,
  optionValue: string,
  optionLabel: string,
  placeholder?: string,
  label?: string,
  error?: string,
  name: string,
  labelClass?: string,
  icon?: string
}>()

const model = defineModel<string | number>()

const searchQuery = ref('')
const options = ref<OptionType[]>([])
const loading = ref(false)

let timeoutId: ReturnType<typeof setTimeout> | null = null

const onSearch = (query: string) => {
  searchQuery.value = query

  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  if (!query.trim()) {
    options.value = []
    return
  }

  timeoutId = setTimeout(async () => {
    try {
      loading.value = true

      const response = await axios(
        `${props.url}/${encodeURIComponent(query)}`
      )

      options.value = response.data.map(
        (item: any) => ({
          label: item[props.optionLabel],
          value: item[props.optionValue]
        })
      )
    } catch (err) {
      console.error(
        'Erreur lors de la recherche :',
        err
      )

      options.value = []
    } finally {
      loading.value = false
    }
  }, 400)
}
</script>