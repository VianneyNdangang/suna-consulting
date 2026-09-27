<template>
  <UError
    :error="{
      statusCode: 404,
      statusMessage: 'Page introuvable',
      message: 'Désolé, la page que vous recherchez n’existe pas ou a peut-être été déplacée. Vérifiez l’adresse ou retournez à l’accueil pour continuer votre navigation.'
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