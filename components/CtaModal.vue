<template>
  <div class=" absolute top-0 left-0 w-screen h-screen flex items-center justify-center z-10">
    <div @click="$emit('close-modal')" class=" absolute top-0 left-0 w-screen h-screen bg-mine-shaft-600 opacity-50">
    </div>
    <div
      class="bg-gradient-to-b px-[1px] pt-[1px] from-red-600 via-red-400 to-transparent card-shadow rounded-xl max-w-[90%]">
      <div class="relative bg-mine-shaft-700 text-xl rounded-xl p-10 pt-14 z-50 border-none outline-none">
        <svg @click="$emit('close-modal')" class="w-6 h-6 absolute top-6 right-6" fill="none" stroke="currentColor"
          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <!--Modal content-->

        <p class=" text-3xl text-center font-normal mb-5 leading-6" :class="props.warn ? 'text-red-400' : ''"
          v-html="props.message"></p>
        <button @click="choiceAction" :class="warn ? 'warn-button' : 'submit-button'">{{props.ctaMessage}}</button>
        <Transition name="fade" appear>
          <p>{{errorMessage}}</p>
        </Transition>

        <!--/Modal content-->
      </div>
    </div>
  </div>
</template>

<script setup>
  const {
    auth
  } = useNhostClient()
  const {
    graphql
  } = useNhostClient()

  const errorMessage = ref('')

  const props = defineProps({
    message: {
      type: String,
      default: ''
    },
    ctaMessage: {
      type: String,
      default: 'Réinitialiser le mot de passe'
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
      type: Number,
      default: null
    }
  })
  const emit = defineEmits(['close-modal'])

  const choiceAction = computed(() => {
    switch (props.job) {
      case 'deletingObservation':
        deleteObservation()
        break;
      default:
        console.log('no action');

    }
  })
  const deleteObservation = async () => {
    try {
      const res = await graphql.request(`
      mutation MyMutation {
        delete_Observation_by_pk(id: "${props.observationId}") {
          id
        }
      }
      `)

      if (res.error === null && res.data.delete_Observation_by_pk.id) {
        errorMessage.value = ''
        emit('close-modal')
      } else {
        errorMessage.value = 'Une erreur est survenue, réessayes stp.'
      }
    } catch (error) {
      console.log(error)
    }

  }

</script>
