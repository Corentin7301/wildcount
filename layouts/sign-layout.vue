<template>
  <main
    class="relative max-h-screen min-w-full min-h-screen antialiased font-light text-white grid font-Dongle leading-4 bg-mine-shaft-500">
    <Container class="w-full ">
      <img class="w-auto h-20 mx-auto mt-16 mb-4" src="/logo.png" alt="Wildcount" />
      <slot v-if="online" />
      <p class="text-3xl text-center text-red-500 underline  underline-offset-4" v-else>Tu es hors ligne ! Vérifies ta
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
