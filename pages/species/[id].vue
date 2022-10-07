<template>
  <div>
    <!--Delete Species modale-->
    <Transition name="slide-top" appear>
      <CtaModal v-if="deleteSpeciesModale" @close-modal="(deleteSpeciesModale = false), refresh()" buttonMessage="Supprimer"
        :warn="true" job="deletingSpeciesObservation" :id="route.params.id">
        <template #title>
          Supprimer toutes les observations de cette espèce ?<br />(Tu ne pourras pas annuler !)
        </template>
      </CtaModal>
    </Transition>
    <!--Delete Observation modale-->
    <Transition name="slide-top" appear>
      <CtaModal v-if="deleteModale" @close-modal="(deleteModale = false), refresh()" buttonMessage="Supprimer"
        :warn="true" job="deletingObservation" :id="idOfObservation">
        <template #title>
          Supprimer l'observation ?<br />(Tu ne pourras pas annuler !)
        </template>
      </CtaModal>
    </Transition>
    <!--Edit modale-->
    <Transition name="slide-top" appear>
      <CtaModal v-if="editModale" @close-modal="(editModale = false), refresh()" buttonMessage="Annuler"
      ctaFunction="validate" ctaIcon="heroicons-outline:check" job="editObservation" :warn="false"
      :id="idOfObservation">
      <template #title> Modification de l'observation </template>
    </CtaModal>
  </Transition>
  <!--View Comment modale-->
  <Transition name="slide-top" appear>
      <CtaModal v-if="viewCommentModale" @close-modal="viewCommentModale = false" buttonMessage="" job="viewComment"
        :id="idOfObservation">
        <template #title> Commentaire </template>
      </CtaModal>
    </Transition>
    <Container>
      <div class="
          rounded-2xl
          px-[1px]
          pt-[1px]
          mb-3
          bg-gradient-to-b
          from-ecstasy-500
          via-tan-hide-500
          to-transparent
          card-shadow
        ">
        <div
          class="grid w-full h-full gap-2 px-5 pb-4 text-white border-none outline-none bg-mine-shaft-500 pt-7 rounded-2xl">
          <h1 class="text-3xl font-normal leading-5 text-center">
            {{ species.data.Species[0].small_name }}
          </h1>
          <h2 class="flex items-center justify-center gap-3 text-3xl font-normal text-center ">
            Total :
            <span class="text-5xl">{{
              species.data.Species[0].Observations_aggregate.aggregate.sum
                .number_of_animals
            }}</span>
          </h2>
        </div>
      </div>
      <div class="flex justify-between mb-5">
        <span class="w-1"></span><Button @click="deleteSpeciesModale = true" class="self-end w-auto h-auto"
          color="red">Tout supprimer</Button>
      </div>
      <ul class="grid overflow-y-scroll gap-11 snap-y scroll-pt-2 calc-max-h no-scroll">
        <li v-for="(observation, index) in observations.data.Observation" :key="index" class="
            relative
            flex
            items-center
            justify-between
            min-h-[60px]
            rounded-b-2xl
            border-[1px]
            pl-8
            pr-10
            pt-2
            mx-2
            my-2
            border-tan-hide-500
            snap-start
            card-shadow
          ">
          <!-- delete btn -->
          <span @click="(deleteModale = true), (idOfObservation = observation.id)"
            class="absolute flex items-center justify-center w-6 h-6 px-1 text-4xl rounded-full -top-2 -left-2 bg-gradient-to-b from-red-400 to-red-600 button-shadow"><svg
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
            </svg></span>
          <!-- update btn -->
          <span @click="(editModale = true), (idOfObservation = observation.id)"
            class="absolute flex items-center justify-center w-6 h-6 px-1 text-4xl rounded-full -top-2 -right-2 bg-gradient-to-b from-tan-hide-500 to-ecstasy-500 button-shadow"><svg
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
              </path>
            </svg></span>
          <!-- comment btn -->
          <span v-if="observation.comment" @click="
              (viewCommentModale = true), (idOfObservation = observation.id)
            "
            class="absolute flex items-center justify-center w-6 h-6 px-1 text-4xl rounded-full -bottom-2 -right-2 bg-gradient-to-b from-tan-hide-500 to-ecstasy-500 button-shadow"><svg
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
            </svg></span>
          <p class="text-3xl font-normal leading-5 text-center">
            {{ dayjs(observation.date).format("DD-MM-YYYY") }}
          </p>
          <p class="mt-1 font-normal text-center text-7xl">
            {{ observation.number_of_animals }}
          </p>
        </li>
      </ul>
    </Container>
  </div>
</template>

<script setup>
  import dayjs from "dayjs";
  const route = useRoute();
  const user = useNhostUser();
  const {
    graphql
  } = useNhostClient();

  onMounted(() => {
    refresh();
  });

  // data refreshing
  const refresh = () => refreshNuxtData(["speciesObservations", "species"]);

  // data fetching
  const {
    data: observations
  } = await useAsyncData(
    "speciesObservations",
    async () => {
      const observations = await graphql.request(`
        query Observations {
          Observation(where: {user_id: {_eq: "${user.value.id}"}, species_id: {_eq: ${route.params.id}}}, order_by: {date: desc}) {
            id
            date
            number_of_animals
            comment
          }
        }

  `);
      if (observations.data.Observation.length === 0) {
        navigateTo("/list");
      }
      return observations;
    }
  );

  const {
    data: species
  } = await useAsyncData("species", async () => {
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
  `);
    return species;
  });
  // modals
  const deleteSpeciesModale = ref(false);
  const deleteModale = ref(false);
  const editModale = ref(false);
  const viewCommentModale = ref(false);

  const idOfObservation = ref(null);

</script>


<style scoped>
  .calc-max-h {
    /* base height - animals infos height */
    max-height: calc(var(--base-max-h) - (170px));
  }

</style>
