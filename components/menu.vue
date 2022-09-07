<template>
  <menu class="absolute inset-0 z-50 h-screen w-full transition-all overflow-hidden">
    <div @click="$emit('close-menu')" class="absolute inset-0 w-full h-full bg-mine-shaft-500 opacity-0"></div>
    <div class=" absolute inset-0 h-full w-[80%] bg-mine-shaft-700 flex flex-col items-start justify-between">
      <svg @click="$emit('close-menu')" class="w-6 h-6 absolute top-5 right-5 opacity-80" fill="none"
        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
      <ul class=" mt-16 pl-4 space-y-4">
        <div class="flex items-center gap-4" @click="choiceFilter('all')">
          <div class=" w-12 h-12 p-3 bg-gradient-to-t from-ecstasy-500 to-tan-hide-500 button-shadow rounded-full">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16">
              </path>
            </svg>
          </div>
          <div class="">
            <p class="text-3xl font-bold leading-7">Tous</p>
          </div>
        </div>
        <li v-for="oneClass in classes.data.Class" :key="oneClass.id" @click="choiceFilter(oneClass)"
          class=" capitalize flex items-center gap-4">
          <div class=" w-12 h-12 p-[14px] bg-gradient-to-t from-ecstasy-500 to-tan-hide-500 button-shadow rounded-full">
            <img :src="`/${oneClass.illustrationName}-full.svg`" :alt="oneClass.nameFr">
          </div>
          <div class="">
            <p class="text-3xl font-bold leading-7">{{oneClass.nameFr}}</p>
            <p class="text-xl leading-3">{{oneClass.scientificName}}</p>
          </div>
        </li>
      </ul>
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
   
  const user = useNhostUser()
  const {
    graphql
  } = useNhostClient()
  const filtersStore = useFiltersStore()

  const {
    data: classes
  } = await useAsyncData('', async () => {
    const classes = await graphql.request(`
    query Classes {
        Class(order_by: {id: asc}) {
            id
            nameFr
            scientificName
            illustrationName
        }
    }
  `)
    return classes
  })

  const refresh = () => refreshNuxtData('observations')
  const choiceFilter = (classObject) => {
    if (classObject === 'all') {
      filtersStore.classFilterChoiced = 'all'
    } else {
      filtersStore.classFilterChoiced = classObject
    }
    refresh()
  }


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
