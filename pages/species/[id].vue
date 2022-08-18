<template>
  <div>
    <!--Delete modale-->
    <Transition name="slide-top" appear>
      <CtaModal v-if="deleteModale" @close-modal="deleteModale = false, refresh()"
        title="Supprimer l'observation ?<br>(Tu ne pourras pas annuler !)" buttonMessage="Supprimer" :warn="true"
        job="deletingObservation" :observationId="idOfObservation" />
    </Transition>
    <!--Edit modale-->
    <Transition name="slide-top" appear>
      <CtaModal v-if="editModale" @close-modal="editModale = false, refresh()" title="Modification de l'observation"
        buttonMessage="Annuler" ctaIcon="validate" job="editObservation" :warn="false"
        :observationId="idOfObservation" />
    </Transition>
    <!--View Comment modale-->
    <Transition name="slide-top" appear>
      <CtaModal v-if="viewCommentModale" @close-modal="viewCommentModale = false" title="Commentaire" buttonMessage=""
        job="viewComment" :observationId="idOfObservation" />
    </Transition>
    <Container>
      <div
        class=" rounded-2xl px-[1px] pt-[1px] mb-10 bg-gradient-to-b from-ecstasy-500 via-tan-hide-500 to-transparent card-shadow">
        <div
          class="grid gap-2 bg-mine-shaft-500 pt-7 pb-4 px-5 rounded-2xl text-white h-full w-full border-none outline-none">
          <h1 class="text-3xl text-center leading-5 font-normal">{{species.data.Species[0].small_name}}</h1>
          <h2 class="text-3xl text-center font-normal flex items-center justify-center gap-3">
            Total : <span
              class="text-5xl">{{species.data.Species[0].Observations_aggregate.aggregate.sum.number_of_animals}}</span>
          </h2>
        </div>
      </div>
      <ul class=" grid gap-11 overflow-y-scroll snap-y scroll-pt-2 calc-max-h no-scroll">
        <li v-for="(observation,index) in observations.data.Observation" :key="index"
          class="relative flex items-center justify-between min-h-[60px] rounded-b-2xl border-[1px] pl-8 pr-10 pt-2 mx-2 my-2 border-tan-hide-500 snap-start card-shadow">
          <!-- delete btn -->
          <span @click="deleteModale = true, idOfObservation = observation.id"
            class="absolute -top-2 -left-2 bg-gradient-to-b from-red-400 to-red-600 rounded-full w-6 h-6 px-1 text-4xl flex items-center justify-center button-shadow"><svg
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
            </svg></span>
          <!-- update btn -->
          <span @click="editModale = true, idOfObservation = observation.id"
            class="absolute -top-2 -right-2 bg-gradient-to-b from-tan-hide-500 to-ecstasy-500 rounded-full w-6 h-6 px-1 text-4xl flex items-center justify-center button-shadow"><svg
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
              </path>
            </svg></span>
          <!-- comment btn -->
          <span v-if="observation.comment" @click="viewCommentModale = true, idOfObservation = observation.id"
            class="absolute -bottom-2 -right-2 bg-gradient-to-b from-tan-hide-500 to-ecstasy-500 rounded-full w-6 h-6 px-1 text-4xl flex items-center justify-center button-shadow"><svg
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z">
              </path>
            </svg></span>
          <p class="text-3xl text-center leading-5 font-normal">{{dayjs(observation.date).format('DD-MM-YYYY')}}</p>
          <p class="text-7xl text-center font-normal mt-1">
            {{observation.number_of_animals}}</p>
        </li>
      </ul>
    </Container>
  </div>
</template>

<script setup>
  import dayjs from 'dayjs'
  const route = useRoute()
  const user = useNhostUser()
  const {
    graphql
  } = useNhostClient()

  onMounted(() => {
    refresh()
  })

  // data refreshing
  const refresh = () => refreshNuxtData(['speciesObservations', 'species'])

  // data fetching
  const {
    data: observations
  } = await useAsyncData('speciesObservations', async () => {
    const observations = await graphql.request(`
        query Observations {
          Observation(where: {user_id: {_eq: "${user.value.id}"}, species_id: {_eq: ${route.params.id}}}, order_by: {date: desc}) {
            id
            date
            number_of_animals
            comment
          }
        }

  `)
    if (observations.data.Observation.length === 0) {
      navigateTo('/list')
    }
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

  // modals
  const deleteModale = ref(false)
  const editModale = ref(false)
  const viewCommentModale = ref(false)

  const idOfObservation = ref(null)

</script>


<style scoped>
  .calc-max-h {
    /* base height - animals infos height */
    max-height: calc(var(--base-max-h) - (170px));
  }

</style>
