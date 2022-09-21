<template>
    <div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <h1 class="text-4xl font-bold text-center  mb-7">Modifier le mot de passe</h1>
        <Container class="py-4">
          <form class="space-y-4 text-xl" @submit.prevent="changePassword()">
            <div>
              <label for="email">
                <input id="password" name="password" type="password" placeholder="Nouveau mot de passe" required
                  v-model="newPassword"
                  class="appearance-none w-full focus:outline-none focus:ring-ecstasy-500 input-style p-0 pt-1 text-2xl text-center max-w-[75%] mx-auto flex items-center justify-center">
              </label>
            </div>
            <!--error message-->
            <Transition name="fade" appear>
              <p v-if="errorMessage"
                class="text-base font-medium text-center text-red-500 hover:text-red-500 opacity-80 ">
                {{errorMessage}}
              </p>
            </Transition>
            <Transition name="fade" appear>
              <p v-if="successMessage"
                class="text-base font-medium text-center text-emerald-500 hover:text-emerald-500 opacity-80 ">
                {{successMessage}}
              </p>
            </Transition>
            <div class="flex items-center justify-center"><input type="submit" name="search" id="search"
                class="submit-button max-w-[90%] mt-4" value="Modifier le mot de passe"></div>
          </form>
        </Container>
    </div>
    </div>
</template>

<script setup>
  definePageMeta({
    middleware: 'auth'
  })
  
  const user = useNhostUser()
  const {
    auth
  } = useNhostClient()

  const newPassword = ref('')
  const errorMessage = ref('')
  const successMessage = ref('')

  const changePassword = async () => {
    try {
      const res = await auth.changePassword({
        newPassword: newPassword.value
      })

      if (res.error === null) {
        errorMessage.value = ''
        newPassword.value = ''
        successMessage.value = 'Mot de passe modifié !'
      } else if (res.error.status === 400) {
        errorMessage.value = 'Aucun compte ne correspond à cette adresse email'
      }

    } catch (error) {
      console.log(error)
    }
  }
</script>