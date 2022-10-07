<template>
  <ul class="pl-4 mt-10 space-y-4 ">
    <div class="flex items-center gap-4" @click="choiceFilter('all')">
      <div class="w-12 h-12 p-3 rounded-full bg-gradient-to-t from-ecstasy-500 to-tan-hide-500 button-shadow">
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
      class="flex items-center gap-4 capitalize ">
      <div class=" w-12 h-12 p-[14px] bg-gradient-to-t from-ecstasy-500 to-tan-hide-500 button-shadow rounded-full">
        <img :src="`/${oneClass.illustrationName}-full.svg`" :alt="oneClass.nameFr">
      </div>
      <div class="">
        <p class="text-3xl font-bold leading-7">{{oneClass.nameFr}}</p>
        <p class="text-xl leading-3">{{oneClass.scientificName}}</p>
      </div>
    </li>
  </ul>
</template>

<script setup>
  import {
    useFiltersStore
  } from '~/store/filters'
  const filtersStore = useFiltersStore()
  const {
    graphql
  } = useNhostClient()

  const emit = defineEmits(['class-is-choiced'])

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

  const choiceFilter = (classObject) => {
    if (classObject === 'all') {
      filtersStore.classFilterChoiced = 'all'
    } else {
      filtersStore.classFilterChoiced = classObject
    }
    emit('class-is-choiced')
  }
</script>
