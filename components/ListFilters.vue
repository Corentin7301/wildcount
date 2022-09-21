<template>
  <div class="flex items-center gap-3 mb-6 overflow-x-scroll flex-nowrap snap-x">
    <button @click="resetFilters()" class="w-6 h-6 text-2xl text-center cursor-pointer"><svg class="w-6 h-6" fill="none"
        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg></button>
    <div class="ml-3 class-filter">
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
            <ClassChoicer @class-is-choiced="classIsChoiced()" />
          </template>
        </Modale>
      </Transition>
    </div>

    <Filter @click="filterIsClicked('by-number')" filterName="by-number" :chevron="true">
      <template #label>
        <span>Nombre d'obs.</span>
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

  const emit = defineEmits(['filter-result'])
  const allObservations = props.observations.data.Observation

  const modalIsOpen = ref(false)
  onMounted(() => {
    emit('filter-result', sortByCommonName(allObservations))
  })
  const sortByCommonName = (allObservations) => {
    const observations = allObservations.sort((a, b) => a.Species.common_name.localeCompare(b
      .Species.common_name))
    return observations
  }

  function resetFilters() {
    filtersStore.classFilterChoiced = 'all'
    filtersStore.filter = ''
    filtersStore.order = 'desc'
    emit('filter-result', sortByCommonName(allObservations))
  }

  function filterIsClicked(filter) {
    switch (filtersStore.order) {
      case 'desc':
        filtersStore.order = 'asc'
        break
      case 'asc':
        filtersStore.order = 'desc'
        break
    }
    filtersStore.filter = filter
    filteredObservations.value
  }

  const classIsChoiced = () => {
    modalIsOpen.value = false
    filteredObservations.value
  }


  const filteredObservations = computed(() => {
    let filteredObservations = isFilteredByClass(allObservations)
    filteredObservations = isFilteredByOtherFilter(filteredObservations)
    emit('filter-result', filteredObservations)
    return filteredObservations

    // by class filter
    function isFilteredByClass(allObservations) {
      return filtersStore.classFilterChoiced === 'all' ? sortByCommonName(allObservations) : classFilter(
        allObservations)
    }

    function classFilter(allObservations) {
      const filtered = allObservations.filter(observation => observation.Species.Class.id === filtersStore
        .classFilterChoiced.id)
      return filtered
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
        return allObservations.sort((a, b) => b.Species.Observations_aggregate.aggregate.sum.number_of_animals - a
          .Species.Observations_aggregate.aggregate.sum.number_of_animals)
      } else if (filtersStore.order === 'asc') {
        return allObservations.sort((a, b) => a.Species.Observations_aggregate.aggregate.sum.number_of_animals - b
          .Species.Observations_aggregate.aggregate.sum.number_of_animals)
      }
    }
  })

</script>
