<template>
  <div class="mt-1 relative rounded-md shadow-sm">
    <input type="text" name="search" id="search" class="input-style text-2xl p-0 pl-10 pt-1"
      :placeholder="props.inputPlaceholder" v-model="search" required>
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>

    <ul v-if="dropdownIsOpen"
      class="absolute top-12 left-0 bg-mine-shaft-700 rounded-3xl min-h-[30px]  max-h-60 w-full overflow-y-scroll divide-y-[1px] divide-gray-700 no-scroll">
      <li v-for="(species,index) in searchedSpecies" :key="index" @click="selectOneSpecies(species)"
        class=" pl-8 py-3 text-2xl leading-4">
        {{ species.common_name }}</li>
    </ul>
  </div>
</template>

<script setup>
  const {
    graphql
  } = useNhostClient()

  const props = defineProps({
    clearedSearch: {
      type: Boolean,
      default: false,
    },
    searchbarUtility: {
      type: String,
      default: '',
    },
    inputPlaceholder: {
      type: String,
      default: 'Rechercher une espèce...',
    },
    dataToSearch : {
      type: Array,
      default: () => [],
    },
  })


  // search feature
  const search = ref('')
  const dropdownIsOpen = ref(false)
  const searchedSpecies = ref([])
  const selectedSpecies = ref(null)

  watch(search, (newSearch) => {
    if (props.searchbarUtility === 'newObservation') {
      searchSpecies()
    } else if(props.searchbarUtility === 'allObservations') {
      searchAllSpecies()
    }
    if (newSearch.length === 0 || (selectedSpecies.value !== null && newSearch === selectedSpecies.value.common_name)) {
      dropdownIsOpen.value = false
    } else {
      dropdownIsOpen.value = true
    }
  })
  // todo: look at graphQL subscription
  const searchSpecies = async () => {
    const res = await graphql.request(`
          query SearchSpecies {
            Species(limit: 10,
            order_by: {common_name: asc},
            where: 
            {_or: 
              [
                {common_name: {_ilike: "%${search.value}%"}},
                {scientific_name: {_ilike: "%${search.value}%"}}
              ],
              enabled: {_eq: true}}) {
                id
                common_name
            }
          }
           `)
    searchedSpecies.value = res.data.Species
  }

  // select one species feature
  const selectOneSpecies = (species) => {
    selectedSpecies.value = species
    search.value = species.common_name
    emit('selected-species', species)
  }

  const emit = defineEmits(['selected-species', 'cleared-search'])


  // clear search & selectedSpecies when observation is successfully submitted

  watch(() => props.clearedSearch, (newClearedSearch, second) => {
    if (newClearedSearch === true) {
      search.value = ''
      selectedSpecies.value = null
      emit('cleared-search')
    }
  })


const searchAllSpecies = async () => {
    
  }
</script>
