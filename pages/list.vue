<template>
  <div>
    <Container>
      <SearchBar
        @selected-species="(species) => (selectedSpecies = species)"
        :clearedSearch="clearSearch"
        @cleared-search="clearSearch = false"
        class="mb-4"
        searchbarUtility="allObservations"
        @all-observations-search-value="
          (searchValue) => allObservationsSearch(searchValue)
        "
      />

      <ListFilters
        :observations="observations"
        @filter-result="
          (filteredObservations) => filterResult(filteredObservations)
        "
      />

      <p
        v-if="observations.data.Observation.length === 0"
        class="text-2xl text-center"
      >
        Il n'y a pas encore d'observation !
        <NuxtLink to="/" class="block text-3xl text-ecstasy-500"
          >Ajoutes-en une !</NuxtLink
        >
      </p>
      <ul
        v-else
        class="grid grid-cols-2 gap-4 overflow-y-scroll  snap-y scroll-pt-2 calc-max-h no-scroll rounded-2xl"
      >
        <li
          v-for="(observation, index) in allObservations"
          :key="index"
          class="
            min-h-[140px]
            rounded-2xl
            bg-gradient-to-b
            px-[1px]
            pt-[1px]
            from-ecstasy-500
            via-tan-hide-500
            to-transparent
            snap-start
            card-shadow
          "
        >
          <NuxtLink
            :to="`/species/${observation.Species.id}`"
            class="grid w-full h-full gap-2 px-5 pt-6 text-white border-none outline-none  bg-mine-shaft-500 rounded-2xl"
          >
            <p class="text-2xl font-normal leading-5 text-center">
              {{ observation.Species.small_name }}
            </p>
            <p class="font-normal text-center text-7xl">
              {{
                observation.Species.Observations_aggregate.aggregate.sum
                  .number_of_animals
              }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </Container>
  </div>
</template>

<script setup>
import Fuse from "fuse.js";
import { useFiltersStore } from "~/store/filters";
const filtersStore = useFiltersStore();

definePageMeta({
  middleware: "auth",
});

const user = useNhostUser();
const { graphql } = useNhostClient();

onMounted(() => {
  (filtersStore.filter = ""), (filtersStore.order = "desc");
});

// data refreshing
// const refresh = () => refreshNuxtData('allObservations')

// data fetching
const { data: observations } = await useAsyncData(
  "allObservations",
  async () => {
    const observations = await graphql.request(`
        query AllObservations {
          Observation(where: {user_id: {_eq: "${user.value.id}"}}, order_by: {species_id: asc}, distinct_on: species_id) {
            updated_at
            Species {
              id
              small_name
              common_name
              scientific_name
              Class {
                id
              }
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
  `);
    return observations;
  },
  {
    initialCache: false,
  }
);

const filteredObs = ref([]);
const filterResult = (result) => {
  filteredObs.value = result;
};

// final datas method
const allObservations = computed(() => {
  if (searchedObservations.value.length > 0) {
    return searchedObservations.value.map((observation) => observation.item);
  } else {
    return filteredObs.value;
  }
});

// search methods
const searchedObservations = ref([]);
const allObservationsSearch = async (searchValue) => {
  const options = {
    keys: [
      "Species.small_name",
      "Species.common_name",
      "Species.scientific_name",
    ],
  };
  const fuse = new Fuse(observations.value.data.Observation, options);
  searchedObservations.value = fuse.search(searchValue);
};
</script>

<style scoped>
.calc-max-h {
  max-height: calc(var(--base-max-h) - (140px));
}
</style>
