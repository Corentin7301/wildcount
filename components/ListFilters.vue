<template>
  <div class="flex items-center gap-3 mb-6">
    <div class="flex items-center gap-3 pr-3 overflow-x-scroll flex-nowrap snap-x no-scroll">
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
              <ClassChoicer @class-is-choiced="classIsChoiced()" />
            </template>
          </Modale>
        </Transition>
      </div>
      <Filter @click="filterIsClicked('by-common-name')" filterName="by-common-name" :chevron="true">
        <template #label>
          <span>Nom</span>
        </template>
      </Filter>
      <Filter @click="filterIsClicked('by-number')" filterName="by-number" :chevron="true">
        <template #label>
          <span>Nombre d'obs.</span>
        </template>
      </Filter>
      <Filter @click="filterIsClicked('by-date')" filterName="by-date" :chevron="true">
        <template #label>
          <span>Date</span>
        </template>
      </Filter>
    </div>
    <button @click="resetFilters()" class="relative w-6 h-6 text-2xl text-center cursor-pointer">
      <img src="/vertical-wave.svg" class="absolute -top-[13px] -left-[22px]">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg></button>
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
  onMounted(() => {
    emit('filter-result', sortByCommonName(allObservations, true))
  })

  const modalIsOpen = ref(false)


  // reset filters
  function resetFilters() {
    filtersStore.classFilterChoiced = 'all'
    filtersStore.filter = ''
    filtersStore.order = 'desc'
    emit('filter-result', sortByCommonName(allObservations, true))
  }

  // click on filter button
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

  // filter by class
  const classIsChoiced = () => {
    modalIsOpen.value = false
    filteredObservations.value
  }

  // filters
  const filteredObservations = computed(() => {
    let filteredObservations = isFilteredByClass(allObservations)
    filteredObservations = isFilteredByOtherFilter(filteredObservations)
    emit('filter-result', filteredObservations)
    return filteredObservations

    // filter by class
    function isFilteredByClass(allObservations) {
      return filtersStore.classFilterChoiced === 'all' ? sortByCommonName(allObservations, true) : classFilter(
        allObservations)
    }

    function classFilter(allObservations) {
      const filtered = allObservations.filter(observation => observation.Species.Class.id === filtersStore
        .classFilterChoiced.id)
      return filtered
    }

    // other filters
    function isFilteredByOtherFilter(allObservations) {
      const filter = filtersStore.filter
      switch (filter) {
        case 'by-number':
          return sortByNumber(allObservations)
        case 'by-common-name':
          return sortByCommonName(allObservations, false)
        case 'by-date':
          return sortByDate(allObservations)
        default:
          return allObservations
      }
    }

    // filter by number
    function sortByNumber(allObservations) {
      function desc() {
        return allObservations.sort((a, b) => b.Species.Observations_aggregate.aggregate.sum.number_of_animals - a
          .Species.Observations_aggregate.aggregate.sum.number_of_animals)
      }
      if (filtersStore.order === 'desc') {
        return desc()
      } else if (filtersStore.order === 'asc') {
        return desc().reverse()
      }
    }
  })

  // sort by common name
  const sortByCommonName = (allObservations, isBase) => {
    function desc() {
      return allObservations.sort((a, b) => a.Species.common_name.localeCompare(b
        .Species.common_name))
    }
    if (isBase || filtersStore.order === 'desc') {
      return desc()
    } else {
      return desc().reverse()
    }
  }

  // sort by date
  function sortByDate(allObservations) {
    function desc() {
      console.log(allObservations.sort((a, b) => new Date(b.updated_at) - new Date(a
        .updated_at)))
      return allObservations.sort((a, b) => b.updated_at - a
        .updated_at)
    }
    if (filtersStore.order === 'desc') {
      return desc()
    } else if (filtersStore.order === 'asc') {
      return desc().reverse()
    }
  }

</script>
