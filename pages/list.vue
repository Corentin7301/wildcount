<template>
  <div>
    <Container>
      <p v-if="observations.data.Observation.length === 0" class=" text-center text-2xl">Il n'y a pas encore d'observation ! <NuxtLink to="/" class="block text-ecstasy-500 text-3xl">Ajoutes-en une !</NuxtLink></p>
      <!--todo:add searchbar + filters (+ update calc-max-h class in css)-->
      <ul v-else class=" grid grid-cols-2 gap-4 overflow-y-scroll calc-max-h no-scroll">
       <li v-for="(observation,index) in observations.data.Observation" :key="index"
          class=" min-h-[140px] rounded-2xl bg-gradient-to-b px-[1px] pt-[1px] from-ecstasy-500 via-tan-hide-500 to-transparent card-shadow">
          <div
            class="grid gap-2 bg-mine-shaft-500 pt-6 px-5 rounded-2xl text-white h-full w-full border-none outline-none">
            <p class="text-2xl text-center leading-5 font-normal">{{observation.Species.small_name}}</p>
            <p class="text-7xl text-center font-normal">{{observation.Species.Observations_aggregate.aggregate.sum.number_of_animals}}</p>
          </div>
        </li>
      </ul>
    </Container>
  </div>
</template>

<script setup>
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

  // data fetching
  const {
    data: observations
  } = await useAsyncData('observations', async () => {
    const observations = await graphql.request(`
    query MyQuery {
      Observation(where: {user_id: {_eq: "${user.value.id}"}}, order_by: {species_id: asc}, distinct_on:     species_id) {
        Species {
          small_name
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

</script>

<style scoped>
  .card-shadow {
    filter: drop-shadow(0px 4px 13px #0000002b);
  }

  .calc-max-h {
    max-height: var(--base-max-h);
  }

</style>
