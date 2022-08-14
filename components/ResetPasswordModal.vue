<template>
  <div class=" absolute top-0 left-0 w-screen h-screen flex items-center justify-center z-10">
    <div @click="$emit('close-modal')" class=" absolute top-0 left-0 w-screen h-screen bg-mine-shaft-600 opacity-70">
    </div>
    <div class="relative bg-mine-shaft-700 text-xl rounded-xl p-10 pt-14 z-50">
      <svg @click="$emit('close-modal')" class="w-6 h-6 absolute top-6 right-6" fill="none" stroke="currentColor"
        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
      <p class=" text-3xl text-center font-normal mb-5">Réinitialiser le mot de passe</p>
      <form @submit.prevent="resetPassword" class=" w-full space-y-6">
        <input type="text" placeholder="Adresse email"
          class=" appearance-none w-full focus:outline-none focus:ring-ecstasy-500 input-style p-0 pt-1 text-2xl text-center mx-auto flex items-center justify-center"
          v-model="resetPasswordEmail" required>
        <input type="submit" value="Nouveau mot de passe" class=" submit-button">
      </form>
      <Transition name="fade" appear>
        <p>{{errorMessage}}</p>
      </Transition>
    </div>
  </div>
</template>

<script setup>
  const {
    auth
  } = useNhostClient()

  const resetPasswordEmail = ref('')
  const errorMessage = ref('')
  const emit = defineEmits(['close-modal'])

  const resetPassword = async () => {
    try {
      const res = await auth.resetPassword({
        email: resetPasswordEmail.value
      })

      if (res.error === null) {
        errorMessage.value = ''
        resetPasswordEmail.value = ''
        emit('close-modal')
      } else if (res.error.status === 400) {
        errorMessage.value = 'Aucun compte ne correspond à cette adresse email'
      }



    } catch (error) {
      console.log(error)
    }

  }

</script>
