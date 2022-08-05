<template>
  <form @submit.prevent="newObservation()" class=" grid gap-9 max-w-[80%] mx-auto">
    <div class=" flex flex-col gap-5 ">
      <SearchBar @selected-species="(species) => selectedSpecies = species" :clearedSearch="clearSearch" @cleared-search="clearSearch = false" />
      <input type="date" name="date" id="date"
        class="input-style p-0 pt-2 text-2xl text-center max-w-[75%] mx-auto flex items-center justify-center"
        v-model="date" required>
    </div>
    <input type="number" name="number" id="number"
      class="input-style max-w-[125px] max-h-[125px] mx-auto text-center grid items-center justify-center text-8xl pt-5"
      placeholder="0" max="500" v-model="number" required>
    <div
      class="rounded-2xl mx-auto bg-gradient-to-b px-[1px] pt-[1px] from-ecstasy-500 via-tan-hide-500 to-transparent">
      <textarea name="comment" id="comment" placeholder="Entrez des informations sur votre rencontre"
        class=" bg-mine-shaft-500 py-4 px-5 rounded-2xl text-white text-2xl -4 min-h-[100px] w-full resize-none -mb-2 border-none outline-none focus:border-none focus:outline-none"
        v-model="comment"></textarea>
    </div>
    <input type="submit" name="search" id="search" class="submit-button" value="Ajouter">
  </form>

</template>

<script setup>
import dayjs from 'dayjs'

  definePageMeta({
    middleware: 'auth'
  })

  const {
    graphql
  } = useNhostClient()
  const user = useNhostUser()

  // inputs
  const date = ref(dayjs().format('YYYY-MM-DD'))
  const number = ref('')
  const comment = ref('')

  const selectedSpecies = ref(null)

  // new observation

  // todo: add animation when submitting
  const newObservationOK = ref(false)
  const clearSearch = ref(false)

  const newObservation = async () => {
    if (selectedSpecies && comment, date, number) {
      await useAsyncData('', async () => {
        const res = await graphql.request(`
           mutation NewObservation {
             insert_Observation_one(object: 
             {
              comment: "${comment.value}",
              date: "${date.value}",
              numberOfAnimals: ${number.value},
              userID: "${user.value.id}",
              speciesID: ${selectedSpecies.value.id}
              }) {
           id
         }
       }
         `)
          .then(res => {
            newObservationOK.value = true
            date.value = dayjs().format('YYYY-MM-DD')
            number.value = ''
            comment.value = ''
            selectedSpecies.value = null
            clearSearch.value = true
          })
          .catch(err => {
            console.log(err)
          })
      })
    } else {
      console.log('missing inputs')
    }
  }

</script>

<style>
  .input-style {
    @apply w-full bg-gradient-to-t from-tan-hide-500 to-ecstasy-500 input-shadow focus:ring-white focus:border-none focus:outline-none rounded-full border-none placeholder:text-gray-200;
  }

  .submit-button {
    @apply w-full text-3xl text-center font-normal pt-1 h-11 bg-gradient-to-t from-ecstasy-500 to-tan-hide-500 button-shadow focus:ring-white focus:border-none focus:outline-none rounded-full placeholder:text-gray-200;
  }

  .input-shadow {
    box-shadow: 0px 3.25px 15.4375px rgba(0, 0, 0, 0.25), inset 0px 1.625px 4.0625px -0.8125px #FFFFFF;
  }

  .button-shadow {
    box-shadow: 0px 4px 19px rgba(0, 0, 0, 0.25), inset 0px 2px 4px #FFFFFF;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  input[type="date"]::-webkit-inner-spin-button,
  input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }

</style>
