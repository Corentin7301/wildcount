<template>
  <menu class="absolute inset-0 z-50 w-full h-screen overflow-hidden">
    <div @click="$emit('close-menu')" class="absolute inset-0 w-full h-full opacity-0 bg-mine-shaft-500"></div>
    <div class=" absolute inset-0 h-full w-[80%] bg-mine-shaft-700 flex flex-col items-start justify-between">
      <svg @click="$emit('close-menu')" class="absolute w-6 h-6 top-5 right-5 opacity-80" fill="none"
        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
      <ClassChoicer/>
      <Transition name="slide-left" appear>
        <img v-if="filtersStore.classFilterChoiced !== 'all'"
          :src="`/${filtersStore.classFilterChoiced.illustrationName}.svg`"
          :alt="filtersStore.classFilterChoiced.nameFr"
          class=" absolute -bottom-8 -left-7 max-w-[250px]">
      </Transition>
      <div class="w-full ">
        <Container class="flex items-end justify-end mb-4 justify-self-end">
          <button v-if="user" @click="signout()" class="text-xl font-normal text-red-500 ">Déconnexion</button>
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
