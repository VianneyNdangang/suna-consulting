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
    <div>
      <!-- <UDashboardSearch description="recherche" back-icon="i-tabler-users" h open :back="{
        variant:'solid'
      }" loading /> -->
      
      <!-- <Input type="number" :max="200" placeholder="test" :step="10" :min="20"/> -->
    <SearchFile
    url="/testimonials" option-label="author_name" option-value="id"/>
    </div>
  </CardDesign>
</template>

<script setup lang="ts">
import CardDesign from "~/components/cardDesign/CardDesign.vue";
import Input from "~/components/input/Input.vue";
import SearchFile from "~/components/search/SearchFile.vue";
</script>
