<template>
  <div class=" absolute top-0 left-0 w-screen h-screen flex items-center justify-center z-10">
    <div @click="$emit('close-modal')" class=" absolute top-0 left-0 w-screen h-screen bg-mine-shaft-600 opacity-50">
    </div>
    <div class="bg-gradient-to-b px-[1px] pt-[1px] card-shadow rounded-xl w-[90%]"
      :class="warn ? 'from-red-600 via-red-400 to-transparent' : 'from-ecstasy-500 via-tan-hide-500 to-transparent'">
      <div class="relative bg-mine-shaft-700 text-xl rounded-xl p-10 pt-14 z-50 border-none outline-none">

        <button @click="ctaAction()"
          class="absolute -bottom-5 -right-3 w-12 h-12 p-3 rounded-full bg-gradient-to-b button-shadow"
          :class="ctaColorChoice" v-html="ctaIconChoice">
        </button>
        <!--Modal content-->

        <p v-if="props.title" class=" text-3xl text-center font-normal mb-5 leading-6"
          :class="props.warn ? 'text-red-400' : ''" v-html="props.title"></p>

        <section v-if="props.job === 'editObservation'" class=" flex flex-col gap-5">
          <div class=" flex flex-col gap-5 ">
            <SearchBar @selected-species="(species) => selectedSpecies = species" :clearedSearch="clearSearch"
              @cleared-search="clearSearch = false" searchbarUtility="newObservation" />
            <input type="date" name="date" id="date"
              class="input-style p-0 pt-2 text-2xl text-center max-w-[75%] mx-auto flex items-center justify-center"
              v-model="newDate" required>
            <Transition name="fade" appear>
              <p v-if="badDateMessage" class=" text-center text-red-500 text-xl">{{badDateMessage}}</p>
            </Transition>
          </div>

          <div class=" grid grid-cols-3 gap-4 mx-auto items-center justify-between">
            <button @click="newNumber--"
              class=" w-12 h-12 p-3 mx-auto text-3xl bg-gradient-to-t from-ecstasy-500 to-tan-hide-500 button-shadow rounded-full"><svg
                fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
              </svg></button>

            <input type="number" name="number" id="number"
              class="input-style max-w-[75px] max-h-[75px] mx-auto text-center grid items-center justify-center text-7xl pt-5"
              placeholder="0" max="500" v-model="newNumber" required>

            <button @click="newNumber++"
              class=" w-12 h-12 p-3 mx-auto text-3xl bg-gradient-to-t from-ecstasy-500 to-tan-hide-500 button-shadow rounded-full"><svg
                fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                </path>
              </svg></button>
          </div>

          <div
            class="w-full rounded-2xl mx-auto bg-gradient-to-b px-[1px] pt-[1px] from-ecstasy-500 via-tan-hide-500 to-transparent">
            <textarea name="comment" id="comment"
              placeholder="Au Mont Pécloz, j'ai vu 8 chamois au milieu du grand pierrier à 20h30..."
              class=" bg-mine-shaft-500 py-4 px-5 rounded-2xl text-white text-2xl -4 min-h-[100px] w-full resize-none -mb-2 leading-6 border-none outline-none focus:border-none focus:outline-none no-scroll"
              v-model="newComment"></textarea>
          </div>
          <div v-if="success"
            class=" text-center bg-gradient-to-t from-green-400 to-green-500 rounded-full py-1 input-shadow pb-[1px]">
            Observation bien répertoriée</div>
        </section>

        <section v-else-if="props.job === 'viewComment'">
          <p class=" leading-6 text-3xl min-h-[75px]" v-html="observationDatas.comment"></p>
        </section>

        <section v-else-if="props.job === 'showText'" class="showText">
          <slot />
        </section>

        <button v-if="props.buttonMessage" @click="buttonAction()" class=" mt-7"
          :class="buttonColorChoice">{{props.buttonMessage}}</button>
        <Transition name="fade" appear>
          <p>{{errorMessage}}</p>
        </Transition>

        <!--/Modal content-->
      </div>
    </div>
  </div>
</template>

<script setup>
  import dayjs from 'dayjs'
  const {
    auth
  } = useNhostClient()
  const user = useNhostUser()
  const {
    graphql
  } = useNhostClient()

  const newDate = ref('')
  const newNumber = ref(0)
  const newComment = ref('')
  const selectedSpecies = ref(null)

  const errorMessage = ref('')

  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    buttonMessage: {
      type: String,
      default: ''
    },
    ctaIcon: {
      type: String,
      default: 'close'
    },
    ctaColor: {
      type: String,
      default: 'base'
    },
    warn: {
      type: Boolean,
      default: false
    },
    job: {
      type: String,
      default: ''
    },
    observationId: {
      type: String,
      default: ''
    },
    textToDisplay: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits(['close-modal'])
  const refresh = () => refreshNuxtData('observationDatas')
  onMounted(() => {
    refresh()
  })

  const {
    data: observationDatas
  } = useAsyncData('observationDatas', async () => {
    const observationDatas = await graphql.request(`
      query observationDatas {
        Observation_by_pk(id: "${props.observationId}") {
          date
          comment
          number_of_animals
          Species {
            id
            common_name
          }
        }
      }
      `)
    newDate.value = observationDatas.data.Observation_by_pk.date
    newNumber.value = observationDatas.data.Observation_by_pk.number_of_animals
    newComment.value = observationDatas.data.Observation_by_pk.comment.replace(/<br>/g, '\n')
    return observationDatas.data.Observation_by_pk
  })

  const ctaIconChoice = computed(() => {
    switch (props.ctaIcon) {
      case 'close':
        return '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
      case 'validate':
        return '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
      default:
        return ''
    }
  })

  const ctaColorChoice = computed(() => {
    switch (props.ctaIcon) {
      case 'close':
        return 'from-tan-hide-500 to-ecstasy-500'
      case 'validate':
        return 'from-emerald-300 to-emerald-500'
      default:
        return ''
    }
  })

  const buttonColorChoice = computed(() => {
    if (props.warn) {
      return 'warn-button'
    } else {
      switch (props.buttonMessage) {
        case 'Annuler':
          return 'light-button'
        default:
          return 'submit-button'
      }
    }
  })

  const ctaAction = async () => {
    switch (props.job) {
      case 'editObservation':
        editObservation()
        break;
      default:
        emit('close-modal')
    }
  }

  const buttonAction = async () => {
    switch (props.job) {
      case 'deletingObservation':
        deleteObservation()
        break;
      case 'editObservation':
        emit('close-modal')
        break;
      case 'deletingAllObservations':
        deletingAllObservations()
        break;
      default:
        console.log('no action');
    }
  }

  const deleteObservation = async () => {
    try {
      const res = await graphql.request(`
      mutation deleteObservation {
        delete_Observation_by_pk(id: "${props.observationId}") {
          id
        }
      }
      `)

      if (res.error === null && res.data.delete_Observation_by_pk.id) {
        errorMessage.value = ''
        emit('close-modal')
      } else {
        errorMessage.value = 'Une erreur est survenue, réessayes s\'il te plaît.'
      }
    } catch (error) {
      console.log(error)
    }
  }

  const editObservation = async () => {
    newComment.value = newComment.value.replace(/(?:\r\n|\r|\n)/g, '<br>');
    if (newNumber.value !== 0) {
      try {
        const res = await graphql.request(`
        mutation editObservation {
          update_Observation_by_pk(pk_columns: {id: "${props.observationId}"}, _set: {comment: "${newComment.value}", date: "${dayjs(newDate.value).format('YYYY-MM-DD')}", number_of_animals: ${newNumber.value}, species_id: ${selectedSpecies.value ? selectedSpecies.value.id : observationDatas.value.Species.id }}) {
            id
            updated_at
          }
        }
        
        `)

        if (res.error === null && res.data.update_Observation_by_pk.id) {
          errorMessage.value = ''
          emit('close-modal')
        } else {
          errorMessage.value = 'Une erreur est survenue, réessayes s\'il te plaît.'
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      deleteObservation()
    }
  }

  const deletingAllObservations = async () => {
    try {
      const res = await graphql.request(`
        mutation deleteAllObservations {
          delete_Observation(where: {user_id: {_eq: "${user.value.id}"}}) {
            returning {
              id
            }
            affected_rows
          }
        }
      `)
      if (res.error === null && res.data.delete_Observation.affected_rows >= 0) {
        errorMessage.value = ''
        emit('close-modal')
      } else {
        errorMessage.value = 'Une erreur est survenue, réessayes s\'il te plaît.'
      }
    } catch (error) {
      console.log(error)
    }
  }

</script>

<style>
  .showText hr {
    display: none;
  }

</style>
