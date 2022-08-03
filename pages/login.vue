<template>
  <div>
    <pre>{{user}}</pre>
<!--<pre>{{accessToken}}</pre>-->
<!--<pre>{{auth.getSession()}}</pre>-->

    <p v-if="needsEmailVerification">
      Your email is not yet verified. Please check your mailbox and follow the verification link
      finish registration.
    </p>
    <form v-else @submit.prevent="auth.signIn({email,password})">
      <input v-model="email" type="email" placeholder="Email" class="bg-red-500" /><br />
      <input v-model="password" type="password" placeholder="Password" class="bg-red-500" />
      <button class="" type="submit">Connexion</button>
      <p>Vous n'avez pas encore de compte ? <NuxtLink to="/signup"> Créez-en un ! </NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup>

const {
    auth
  } = useNhostClient()
  const user = useNhostUser()
  const refreshToken = useRefreshToken()
  const accessToken = useAccessToken()

  const email = ref('')
  const password = ref('')

</script>
