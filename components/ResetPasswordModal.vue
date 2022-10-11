<template>
  <div class="absolute top-0 left-0 z-10 flex items-center justify-center w-screen h-screen ">
    <div @click="$emit('close-modal')" class="absolute top-0 left-0 w-screen h-screen opacity-50 bg-mine-shaft-600">
    </div>
    <div class="bg-gradient-to-b px-[1px] pt-[1px] from-ecstasy-500 via-tan-hide-500 to-transparent card-shadow rounded-xl">
      <div class="relative z-50 p-10 text-xl border-none outline-none bg-mine-shaft-700 rounded-xl pt-14">
        <svg @click="$emit('close-modal')" class="absolute w-6 h-6 top-6 right-6" fill="none" stroke="currentColor"
          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <p class="mb-5 text-3xl font-normal text-center ">Réinitialiser le mot de passe</p>
        <form @submit.prevent="resetPassword" class="w-full space-y-6">
          <input type="text" placeholder="Adresse email"
            class="flex items-center justify-center w-full p-0 pt-1 mx-auto text-2xl text-center appearance-none focus:outline-none focus:ring-ecstasy-500 input-style"
            v-model="resetPasswordEmail" required>
          <input type="submit" value="Nouveau mot de passe" class=" submit-button">
        </form>
        <Transition name="fade" appear>
          <p>{{errorMessage}}</p>
        </Transition>
      </div>
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
