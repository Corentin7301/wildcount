<template>
  <div>
    <button v-if="isAuthenticated" class="" @click="handleSignOut">Déconnexion</button>
  </div>
</template>


<script setup>
  import {
    useAuthenticated,
    useSignOut
  } from '@nhost/vue'
  
  const router = useRouter()
  const isAuthenticated = useAuthenticated()
  const {
    signOut
  } = useSignOut()
  const handleSignOut = () => {
    signOut()
    router.push('/login')
  }

</script>
