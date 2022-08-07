<template>
  <div>
    <Container>
      <!--todo:add searchbar + filters (+ update calc-max-h class in css)-->
      <ul class=" grid grid-cols-2 gap-4 overflow-y-scroll calc-max-h">
        <li v-for="(observation,index) in observations.data.Observation_aggregate.nodes" :key="index"
          class=" min-h-[140px] rounded-2xl bg-gradient-to-b px-[1px] pt-[1px] from-ecstasy-500 via-tan-hide-500 to-transparent card-shadow">
          <div class="grid gap-2 bg-mine-shaft-500 pt-6 px-5 rounded-2xl text-white h-full w-full border-none outline-none">
            <p class="text-2xl text-center leading-5 font-normal">{{observation.Species.common_name}}</p>
            <p class="text-7xl text-center font-normal">{{observation.number_of_animals}}</p>
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

  const {
    auth
  } = useNhostClient()
  const user = useNhostUser()
  const {
    graphql
  } = useNhostClient()

  const {
    data: observations
  } = await useAsyncData('', async () => {
    //     const observations = await graphql.request(`
    //     query MyObservervations {
    //     Observation(where: {userID: {_eq: "${user.value.id}"}}, order_by: {created_at: desc}) {
    //       id
    //       date
    //       created_at
    //       numberOfAnimals
    //       comment
    //       species {
    //         commonName
    //         id
    //       }
    //   }
    // }
    //   `)
    const observations = await graphql.request(`
    query nbrOfObservationsBySpecies {
      Observation_aggregate(distinct_on: species_id) {
        nodes {
          number_of_animals
          Species {
            common_name
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