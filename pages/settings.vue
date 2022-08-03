<template>
  <div>
    <button v-if="user" @click="auth.signOut()">Déconnexion</button>
  </div>
</template>


<script setup>
  definePageMeta({
    middleware: 'auth'
  })
  const {
    auth
  } = useNhostClient()
  const user = useNhostUser()
</script>
