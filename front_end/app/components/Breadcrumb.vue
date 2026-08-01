<script setup lang="ts">
const route = useRoute()

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter(Boolean)

  return pathArray.map((segment, index) => {
    return {
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: '/' + pathArray.slice(0, index + 1).join('/')
    }
  })
})
</script>

<template>
    <!-- <div class="flex bg-blue-100 text-blue-700 p-1 rounded-r">
        {{$route}}
      </div> -->
  <nav class="flex text-blue-800 pl-5 py-1 pr-2 rounded-r items-center gap-2 text-sm">
    <NuxtLink to="/" class="hover:text-blue-500">
      Home
    </NuxtLink>

    <template
      v-for="(item, index) in breadcrumbs"
      :key="item.path"
    >
      <span>/</span>

      <NuxtLink
        v-if="index !== breadcrumbs.length - 1"
        :to="item.path"
        class="hover:text-blue-500"
      >
        {{ item.name }}
      </NuxtLink>

      <span
        v-else
        class="font-semibold text-blue-950"
      >
        {{ item.name }}
      </span>
    </template>
  </nav>
</template>