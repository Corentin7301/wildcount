<template>
  <menu class="absolute inset-0 z-50 h-screen w-full transition-all overflow-hidden">
    <div @click="$emit('close-menu')" class="absolute inset-0 w-full h-full bg-mine-shaft-500 opacity-0"></div>
    <div class=" absolute inset-0 h-full w-[80%] bg-mine-shaft-700 flex flex-col items-start justify-between">
      <svg @click="$emit('close-menu')" class="w-6 h-6 absolute top-5 right-5 opacity-80" fill="none"
        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
      <ClassChoicer/>
      <Transition name="slide-left" appear>
        <img v-if="filtersStore.classFilterChoiced !== 'all'"
          :src="`/${filtersStore.classFilterChoiced.illustrationName}.svg`"
          :alt="filtersStore.classFilterChoiced.nameFr"
          class=" absolute -bottom-8 -left-7 max-w-[250px] transition-all">
      </Transition>
      <div class=" w-full">
        <Container class=" flex justify-self-end justify-end items-end mb-4">
          <button v-if="user" @click="signout()" class=" text-red-500 font-normal text-xl">Déconnexion</button>
        </Container>
      </div>
    </div>
  </menu>
</template>

<script setup>
    import {
    useFiltersStore
  } from '~/store/filters'
  const {
    auth
  } = useNhostClient()
  const user = useNhostUser()
  const {
    graphql
  } = useNhostClient()
  const filtersStore = useFiltersStore()


  const signout = async () => {
    try {
      const res = await auth.signOut()
      if (res.error === null) {
        return navigateTo('/login')
      }
    } catch (err) {
      console.log(err)
    }
  }

</script>
