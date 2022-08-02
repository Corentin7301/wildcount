<template>
  <p v-if="needsEmailVerification">
    Veuillez vérifier votre boîte mail et suivre le lien de vérification pour vérifier votre e-mail 📬.
  </p>

  <form v-else @submit="handleSubmit">
    <input v-model="firstName" placeholder="First name" class="bg-red-800" /><br />
    <input v-model="lastName" placeholder="Last name" class="bg-red-800" /><br />
    <input v-model="email" type="email" placeholder="Email" class="bg-red-800" /><br />
    <input v-model="password" type="password" placeholder="Password" class="bg-red-800" /><br />

    <button class="btn-submit" type="submit">Créer mon compte</button>
  </form>
</template>

<script setup>
  import {
    useSignUpEmailPassword
  } from '@nhost/vue'

  const {
    signUpEmailPassword,
    needsEmailVerification
  } = useSignUpEmailPassword()
  const router = useRouter()

  const locale = ref(navigator.language || navigator.userLanguage)
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const password = ref('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const {
      isSuccess
    } = await signUpEmailPassword(email, password)
    if (isSuccess) {
      router.push('/')
    }
  }

</script>
