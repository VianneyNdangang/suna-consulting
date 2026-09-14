<template>
  <CardDesign>
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
  </CardDesign>
</template>

<script setup lang="ts">
import CardDesign from "~/components/cardDesign/CardDesign.vue";
</script>
