<template>
  <main
    class="relative font-Dongle font-light leading-4 text-white bg-mine-shaft-500 min-h-screen pt-10 pb-[120px] antialiased">
    <Container>
      <Header />
      <slot v-if="online" />
      <p class="text-3xl text-center text-red-500 underline  underline-offset-4" v-else>Tu es hors ligne ! Vérifies ta
        connexion Internet !</p>
      <Navbar />
    </Container>
  </main>
</template>

<script setup>
  import {
    useOnline
  } from '@vueuse/core'
  const online = useOnline()

  useHead({})

</script>
