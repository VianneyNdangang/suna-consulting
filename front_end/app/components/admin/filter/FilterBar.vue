<template>
  <Card>
    <template #header>
    <div>
      <div class="flex items-center justify-start gap-1">
        <Icon
          name="i-tabler-adjustments-horizontal"
          class="text-(--text-muted)"
        />
        <span class="font-bold"> Filtre</span>
      </div>
    </div>
    </template>
    <div>
    <SearchFile
    url="/testimonials" option-label="author_name" option-value="id"/>
    </div>
    <slot/>
  </Card>
</template>

<script setup lang="ts">
import Card from "~/components/Card/Card.vue";
import SearchFile from "~/components/search/SearchFile.vue";
</script>
