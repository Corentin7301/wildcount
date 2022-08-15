<template>
  <div>
    <Container>
        <div>
            <h1>{{species.data.Species[0].small_name}}</h1>
            <h2>{{species.data.Species[0].Observations_aggregate.aggregate.sum.number_of_animals}}</h2>
        </div>
        <br>
        <br>
        <br>
        <div>
            <div v-for="(observation,index) in observations.data.Observation" :key="index">
                <p>{{observation.date}}</p>
                <p>{{observation.number_of_animals}}</p>
            </div>
        </div>
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
          Observation(where: {user_id: {_eq: "${user.value.id}"}, species_id: {_eq: ${route.params.id}}}) {
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
