<template>
  <UError
    :error="{
      statusCode: 403,
      statusMessage: 'Accès interdit',
      message: 'Désolé, vous n’êtes pas autorisé à accéder à cette ressource.'
    }"
  >
    <template #leading>
        <UColorModeImage
            light="/SC-03.png"
            dark="/SC-H03.png"
            class="rounded size-20"
          />
    </template>
  </UError>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'security'
})
</script>