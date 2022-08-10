<template>
  <div>
    <button v-if="user" @click="signout()">Déconnexion</button>
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

  const signout = async () => {
    try {
      const res = await auth.signOut()
      console.log(res);
      if(res.error===null) {
        return navigateTo('/login')
      }
    } catch (err) {
      console.log(err)
    }
  }

</script>
