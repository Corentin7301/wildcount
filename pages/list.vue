<template>
  <div>
    <Container>
      <SearchBar @selected-species="(species) => selectedSpecies = species" :clearedSearch="clearSearch"
        @cleared-search="clearSearch = false" class="mb-4 " searchbarUtility="allObservations"
        @all-observations-search-value="(searchValue) => allObservationsSearch(searchValue)" />
      <!--todo: filters (+ update calc-max-h class in css)-->
      <!--
        <Filter filter="by-numbers" @filter-name="(filterName) => filterChoiced = filterName">0-100</Filter>
        <Filter filter="by-dates" @filter-name="(filterName) => filterChoiced = filterName">Dates</Filter>
        <Filter filter="by-classes" @filter-name="(filterName) => filterChoiced = filterName">Classes</Filter>
      -->

      <div class="flex justify-between gap-3 overflow-x-scroll flex-nowrap snap-x">
        <div class="filter">
          <Filter @click="modalIsOpen = true">
            <template #label>
              <span>{{filtersStore.classFilterChoiced === 'all' ? 'Tous' : filtersStore.classFilterChoiced.nameFr}}</span>
            </template>
          </Filter>

          <Transition name="fade" appear>
            <Modale v-if="modalIsOpen" @close-modal="modalIsOpen = false">
              <template #title>
                Choisir une classe
              </template>
              <template #modaleContent>
                <ClassChoicer @filter-is-choiced="modalIsOpen = false" />
              </template>
            </Modale>
          </Transition>
        </div>
      </div>

      <p v-if="observations.data.Observation.length === 0" class="text-2xl text-center ">Il n'y a pas encore
        d'observation ! <NuxtLink to="/" class="block text-3xl text-ecstasy-500">Ajoutes-en une !</NuxtLink>
      </p>
      <ul v-else class="grid grid-cols-2 gap-4 overflow-y-scroll snap-y scroll-pt-2 calc-max-h no-scroll rounded-2xl">
        <li v-for="(observation,index) in allObservations" :key="index"
          class=" min-h-[140px] rounded-2xl bg-gradient-to-b px-[1px] pt-[1px] from-ecstasy-500 via-tan-hide-500 to-transparent snap-start card-shadow">
          <NuxtLink :to="`/species/${observation.Species.id}`"
            class="grid w-full h-full gap-2 px-5 pt-6 text-white border-none outline-none bg-mine-shaft-500 rounded-2xl">
            <p class="text-2xl font-normal leading-5 text-center">{{observation.Species.small_name}}</p>
            <p class="font-normal text-center text-7xl">
              {{observation.Species.Observations_aggregate.aggregate.sum.number_of_animals}}</p>
          </NuxtLink>
        </li>
      </ul>
    </Container>
  </div>
</template>

<script setup>
  import Fuse from 'fuse.js'
  import {
    useFiltersStore
  } from '~/store/filters'
  const filtersStore = useFiltersStore()

  definePageMeta({
    middleware: 'auth'
  })

  const user = useNhostUser()
  const {
    graphql
  } = useNhostClient()


  onMounted(() => {
    refresh()
  })

  // data refreshing
  const refresh = () => refreshNuxtData('observations')

  const modalIsOpen = ref(false)

  // data fetching
  const {
    data: observations
  } = await useAsyncData('observations', async () => {
    if (filtersStore.classFilterChoiced === 'all') {
      const observations = await graphql.request(`
        query AllObservations {
          Observation(where: {user_id: {_eq: "${user.value.id}"}}, order_by: {species_id: asc}, distinct_on: species_id) {
            Species {
              id
              small_name
              common_name
              scientific_name
              Observations_aggregate {
                aggregate {
                  sum {
                    number_of_animals
                  }
                }
              }
            }
          }
        }
  `)
      return observations
    } else {
      const observations = await graphql.request(`
        query AllObservations {
          Observation(where: {_and: {user_id: {_eq: "${user.value.id}"}, Species: {Class: {id: {_eq: ${filtersStore.classFilterChoiced.id}}}}}}, order_by: {species_id: asc}, distinct_on: species_id) {
            Species {
              id
              small_name
              common_name
              scientific_name
              Observations_aggregate {
                aggregate {
                  sum {
                    number_of_animals
                  }
                }
              }
            }
          }
        }
  `)
      return observations
    }

  })


  // search methods
  const allObservations = computed(() => {
    if (searchedObservations.value.length > 0) {
      return searchedObservations.value.map(observation => observation.item)
    } else {
      return observations.value.data.Observation
    }
  })
  const searchedObservations = ref([])

  const allObservationsSearch = async (searchValue) => {
    const options = {
      keys: [
        "Species.small_name",
        "Species.common_name",
        "Species.scientific_name"
      ]
    };
    const fuse = new Fuse(observations.value.data.Observation, options);
    searchedObservations.value = fuse.search(searchValue)
  }


  const filterChoiced = ref('')

</script>

<style scoped>
  .calc-max-h {
    /* base height - navbar height and filters height */
    /* max-height: calc(var(--base-max-h) - (60px + 50px)); */
    max-height: calc(var(--base-max-h) - (140px));
  }

</style>
