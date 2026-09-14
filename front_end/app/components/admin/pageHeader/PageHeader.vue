<template>
      <UPageHeader headline="Admin" :title="title" :description="subtitle"
      :ui="{
        title:' font-bold text-xl text-(--text-primary)',
        description:'text-md',
        root: 'py-3',
        container: 'gap-3',
        wrapper:'gap-3'
      }"
      >
        <template #links>
          <div class="class flex justify-end items-center gap-3 w-full">
            <Button
            v-if="props.new"
            :label="props.new.label"
            type="button"
            variant="primary"
            :icon="props.new.icon"
            @click="props.new.action"
          />
          <Button
            label="Refresh"
            type="button"
            variant="secondary"
            :click="props.refresh"
            icon="i-tabler-refresh"
            :loading="loading"
          />
          </div>
          
        </template>
      </UPageHeader>
</template>

<script setup lang="ts">
import Button from '~/components/buttons/Button.vue';

const props = defineProps<{
  refresh?: () => {};
  title?: string;
  subtitle?: string;
  loading:boolean
  new?: {
    label: string;
    action: () => {};
    icon?: any
  };
}>();
</script>
