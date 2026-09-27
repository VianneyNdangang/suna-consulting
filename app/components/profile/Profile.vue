<template>
  <UUser
    :name="user.full_name"
    :description="user.role"
    :avatar="{
      src: user.avatar_url,
      loading: 'lazy',
      icon: 'i-tabler-image',
      alt: user.full_name
    }"
  />
</template>
<script setup lang="ts">
const props = defineProps<{
  user: any;
}>();
</script>