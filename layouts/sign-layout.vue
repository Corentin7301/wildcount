<template>
  <main
    class="relative grid font-Dongle font-light leading-4 text-white bg-mine-shaft-500 min-w-full min-h-screen max-h-screen antialiased">
    <Container class=" w-full">
      <img class="mx-auto h-20 w-auto mt-16 mb-4" src="/logo.png" alt="Wildcount" />
      <slot v-if="online" />
      <p class=" text-3xl text-center text-red-500 underline underline-offset-4" v-else>Tu es hors ligne ! Vérifies ta
        connexion Internet !</p>
    </Container>
    <RandomImage />
  </main>
</template>

<script setup>
  import {
    useOnline
  } from '@vueuse/core'
  const online = useOnline()
  useHead({})

</script>
