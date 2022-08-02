
<template>
  <p v-if="needsEmailVerification">
    Your email is not yet verified. Please check your mailbox and follow the verification link
    finish registration.
  </p>

  <form v-else @submit="handleSubmit">
    <input v-model="email" type="email" placeholder="Email" class="" /><br />
    <input v-model="password" type="password" placeholder="Password" class="" />

    <button class="" type="submit">Connexion</button>
    <p>Vous n'avez pas encore de compte ? <NuxtLink to="/signup"> Créez-en un ! </NuxtLink></p>
  </form>
</template>

<script setup>
  import { useSignInEmailPassword } from '@nhost/vue'
  const { signInEmailPassword, needsEmailVerification } = useSignInEmailPassword()
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    const { isSuccess } = await signInEmailPassword(email, password)
    if (isSuccess) router.push('/')
  }
</script>