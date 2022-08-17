<template>
  <div>
    <Container>
      <SearchBar @selected-species="(species) => selectedSpecies = species" :clearedSearch="clearSearch"
        @cleared-search="clearSearch = false" class=" mb-4" searchbarUtility="allObservations"
        @all-observations-search-value="(searchValue) => allObservationsSearch(searchValue)" />
      <!--todo: filters (+ update calc-max-h class in css)-->
      <!--<div class="flex gap-3 flex-nowrap overflow-x-scroll snap-x justify-between">
        <Filter filter="by-numbers" @filter-name="(filterName) => filterChoiced = filterName">0-100</Filter>
        <Filter filter="by-dates" @filter-name="(filterName) => filterChoiced = filterName">Dates</Filter>
        <Filter filter="by-classes" @filter-name="(filterName) => filterChoiced = filterName">Classes</Filter>
      </div>
      -->

      <p v-if="observations.data.Observation.length === 0" class=" text-center text-2xl">Il n'y a pas encore
        d'observation ! <NuxtLink to="/" class="block text-ecstasy-500 text-3xl">Ajoutes-en une !</NuxtLink>
      </p>
      <ul v-else class=" grid grid-cols-2 gap-4 overflow-y-scroll snap-y scroll-pt-2 calc-max-h no-scroll rounded-2xl">
        <li v-for="(observation,index) in allObservations" :key="index"
          class=" min-h-[140px] rounded-2xl bg-gradient-to-b px-[1px] pt-[1px] from-ecstasy-500 via-tan-hide-500 to-transparent snap-start card-shadow">
          <NuxtLink :to="`/species/${observation.Species.id}`"
            class="grid gap-2 bg-mine-shaft-500 pt-6 px-5 rounded-2xl text-white h-full w-full border-none outline-none">
            <p class="text-2xl text-center leading-5 font-normal">{{observation.Species.small_name}}</p>
            <p class="text-7xl text-center font-normal">
              {{observation.Species.Observations_aggregate.aggregate.sum.number_of_animals}}</p>
          </NuxtLink>
        </li>
      </ul>
    </Container>
  </div>
</template>

<script setup>
  import Fuse from 'fuse.js'
  definePageMeta({
    middleware: 'auth'
  })

  const user = useNhostUser()
  const {
    graphql
  } = useNhostClient()


  onBeforeMount(() => {
    refresh()
  })

  // data refreshing
  const refresh = () => refreshNuxtData('observations')

  // data fetching
  const {
    data: observations
  } = await useAsyncData('observations', async () => {
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
    max-height: calc(var(--base-max-h));
  }

</style>
