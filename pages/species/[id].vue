<template>
  <div>
    <Container>
      <div>
        <div
          class=" rounded-2xl bg-gradient-to-b px-[1px] pt-[1px] from-ecstasy-500 via-tan-hide-500 to-transparent card-shadow">
          <div
            class="grid gap-2 bg-mine-shaft-500 pt-7 pb-4 px-5 rounded-2xl text-white h-full w-full border-none outline-none">
            <h1 class="text-3xl text-center leading-5 font-normal">{{species.data.Species[0].small_name}}</h1>
            <h2 class="text-3xl text-center font-normal flex items-center justify-center gap-3">
              Total : <span class="text-5xl">{{species.data.Species[0].Observations_aggregate.aggregate.sum.number_of_animals}}</span></h2>
          </div>
        </div>
      </div>
      <br>
      <br>
      <br>
      <ul class=" grid gap-11">
        <li v-for="(observation,index) in observations.data.Observation" :key="index"
          class=" flex items-center justify-between min-h-[60px] rounded-b-2xl border-[1px] pl-8 pr-10 border-tan-hide-500 card-shadow">
            <p class="text-3xl text-center leading-5 font-normal">{{observation.date}}</p>
            <p class="text-7xl text-center font-normal mt-1">
              {{observation.number_of_animals}}</p>
        </li>
      </ul>
    </Container>
  </div>
</template>

<script setup>
  const route = useRoute()
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
        query Observations {
          Observation(where: {user_id: {_eq: "${user.value.id}"}, species_id: {_eq: ${route.params.id}}}, order_by: {date: desc}) {
            id
            date
            number_of_animals
          }
        }

  `)
    return observations
  })

  const {
    data: species
  } = await useAsyncData('species', async () => {
    const species = await graphql.request(`
    query TheSpecies {
        Species(where: {id: {_eq: ${route.params.id}}}) {
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
  `)
    return species
  })

</script>
