<template>
  <div class="flex gap-3 overflow-x-scroll flex-nowrap snap-x">
    <span @click="resetFilters()" class="py-1 pt-2 text-2xl text-center"><svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
    <div class="class-filter">
      <Filter @click="modalIsOpen = true">
        <template #label>
          <span
            class="capitalize">{{filtersStore.classFilterChoiced === 'all' ? 'Tous' : filtersStore.classFilterChoiced.nameFr}}</span>
        </template>
      </Filter>
      <!--class filter modal-->
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

    <Filter @click="filterIsClicked('by-number')">
      <template #label>
        <span class="flex items-center gap-1">Nombre d'obs. <svg class="w-4 h-4 mb-1 transition-transform duration-200"
            :class="filtersStore.filter === 'by-number' && filtersStore.order === 'asc' ? '-rotate-180' : ''"
            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg></span>
      </template>
    </Filter>
  </div>
</template>

<script setup>
  import {
    useFiltersStore
  } from '~/store/filters'
  const filtersStore = useFiltersStore()

  const props = defineProps({
    observations: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(['filterResult'])

  const modalIsOpen = ref(false)

  const resetFilters = () => {
    filtersStore.classFilterChoiced = 'all'
    filtersStore.filter = ''
    filtersStore.order = 'desc'
    emit('filterResult', props.observations)
  }

  function filterIsClicked(filter) {
    filtersStore.filter = filter
    if (filtersStore.order === 'desc') {
      filtersStore.order = 'asc'
    } else if (filtersStore.order === 'asc') {
      filtersStore.order = 'desc'
    } else {
      filtersStore.order = 'desc'
    }
  }


  const filteredObservations = computed(() => {

    let allObservations = props.observations.data

    allObservations = isFilteredByClass(allObservations)

    allObservations = isFilteredByOtherFilter(allObservations)

    emit('filterResult', allObservations)
    return allObservations


    // search functions

    // by class filter
    function isFilteredByClass(allObservations) {
      return filtersStore.classFilterChoiced === 'all' ? allObservations : classFilter(allObservations)
    }

    function classFilter(allObservations) {
      const filtered = allObservations.Observation.filter(observation => observation.Species.Class.id ===
        filtersStore.classFilterChoiced.id)
      return {
        Observation: filtered
      }
    }

    // by-other filter
    function isFilteredByOtherFilter(allObservations) {
      const filter = filtersStore.filter
      switch (filter) {
        case 'by-number':
          return sortByNumber(allObservations)
        default:
          return allObservations
      }
    }

    function sortByNumber(allObservations) {
      if (filtersStore.order === 'desc') {
        return {
          Observation: allObservations.Observation.sort((a, b) => b.Species.Observations_aggregate.aggregate.sum
            .number_of_animals - a.Species.Observations_aggregate.aggregate.sum.number_of_animals)
        }
      } else if (filtersStore.order === 'asc') {
        return {
          Observation: allObservations.Observation.sort((a, b) => a.Species.Observations_aggregate.aggregate.sum
            .number_of_animals - b.Species.Observations_aggregate.aggregate.sum.number_of_animals)
        }
      }
    }









    // if (filtersStore.filter.value === 'by-numbers') {
    //   return observations.value.data.Observation.filter(observation => observation.Species.Observations_aggregate.aggregate.sum.number_of_animals > 0)
    // } else if (filtersStore.filter.value === 'by-dates') {
    //   return observations.value.data.Observation.filter(observation => observation.Species.Observations_aggregate.aggregate.sum.number_of_animals > 0)
    // } else if (filtersStore.filter.value === 'by-classes') {
    //   return observations.value.data.Observation.filter(observation => observation.Species.Observations_aggregate.aggregate.sum.number_of_animals > 0)
    // } else {
    //   return observations.value.data.Observation
    // }
  })

</script>
