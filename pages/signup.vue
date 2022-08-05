<template>
<!--todo:design this page-->
  <p v-if="needsEmailVerification">
    Veuillez vérifier votre boîte mail et suivre le lien de vérification pour vérifier votre e-mail 📬.
  </p>

  <form v-else @submit.prevent="signUp()">
    <input v-model="email" type="email" placeholder="Email" class="bg-red-800" /><br />
    <input v-model="password" type="password" placeholder="Password" class="bg-red-800" /><br />

    <button class="btn-submit" type="submit">Créer mon compte</button>
  </form>
</template>

<script setup>
  const {
    auth
  } = useNhostClient()
  // todo: google ?
  // todo: facebook ?
  const locale = ref(navigator.language || navigator.userLanguage)
  const email = ref('')
  const password = ref('')
  const needsEmailVerification = ref(false)

  const signUp = async () => {
    await auth.signUp({
        email: email.value,
        password: password.value,
      })
      .then(() => {
        needsEmailVerification.value = true
      })
      .catch(error => {
        console.log('signUp error', error)
      })
  }

</script>
