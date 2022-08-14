<template>
  <form @submit.prevent="newObservation()" class=" grid gap-9 max-w-[80%] mx-auto">
    <div class=" flex flex-col gap-5 ">
      <SearchBar @selected-species="(species) => selectedSpecies = species" :clearedSearch="clearSearch"
        @cleared-search="clearSearch = false" searchbarUtility="newObservation" />
      <input type="date" name="date" id="date"
        class="input-style p-0 pt-2 text-2xl text-center max-w-[75%] mx-auto flex items-center justify-center"
        v-model="date" required>
      <Transition name="fade" appear>
        <p v-if="badDateMessage" class=" text-center text-red-500 text-xl">{{badDateMessage}}</p>
      </Transition>
    </div>
    <input type="number" name="number" id="number"
      class="input-style max-w-[125px] max-h-[125px] mx-auto text-center grid items-center justify-center text-8xl pt-5"
      placeholder="0" max="500" v-model="number" required>
    <div
      class="w-full rounded-2xl mx-auto bg-gradient-to-b px-[1px] pt-[1px] from-ecstasy-500 via-tan-hide-500 to-transparent">
      <textarea name="comment" id="comment" placeholder="Entre des informations sur ta rencontre"
        class=" bg-mine-shaft-500 py-4 px-5 rounded-2xl text-white text-2xl -4 min-h-[100px] w-full resize-none -mb-2 border-none outline-none focus:border-none focus:outline-none"
        v-model="comment"></textarea>
    </div>
    <div v-if="success"
      class=" text-center bg-gradient-to-t from-green-400 to-green-500 rounded-full py-1 input-shadow pb-[1px]">
      Observation bien répertoriée</div>
    <input type="submit" name="search" id="search" class="submit-button" value="Ajouter">
  </form>
</template>

<script setup>
  import dayjs from 'dayjs'

  definePageMeta({
    middleware: 'auth',
  })

  const {
    graphql
  } = useNhostClient()
  const user = useNhostUser()

  // inputs
  const date = ref(dayjs().format('YYYY-MM-DD'))
  // error message
  const badDateMessage = ref(null)
  watch(date, (newDate) => {
    if (newDate > dayjs().format('YYYY-MM-DD')) {
      badDateMessage.value = 'La date doit être inférieure à la date du jour'
    } else {
      badDateMessage.value = null
    }
  })
  const number = ref('')
  const comment = ref('')

  const selectedSpecies = ref(null)

  // new observation

  // todo: add animation when submitting
  const newObservationOK = ref(false)
  const clearSearch = ref(false)
  const success = ref(false)

  const newObservation = async () => {
    if (selectedSpecies.value && date.value && !badDateMessage.value && number.value) {
      try {
        const {
          data,
          error,
          pending
        } = await useAsyncData('new-observation', async () => {
          await graphql.request(`
           mutation NewObservation {
             insert_Observation_one(object: 
             {
               comment: "${comment.value}",
              date: "${date.value}",
              number_of_animals: ${number.value},
              user_id: "${user.value.id}",
              species_id: ${selectedSpecies.value.id}
              }) {
                id
            }
          }
         `)
        })

        if (error.value === null) {
          newObservationOK.value = true
          date.value = dayjs().format('YYYY-MM-DD')
          number.value = ''
          comment.value = ''
          selectedSpecies.value = null
          clearSearch.value = true
          success.value = true
          setTimeout(() => {
            success.value = false
          }, 2000)
        }
      } catch (e) {
        console.log(e)
      }

    } else {
      console.log('missing inputs')
    }
  }

</script>
