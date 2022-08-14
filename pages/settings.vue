<template>
  <div>
    <button v-if="user" @click="signout()">Déconnexion</button>
    <!--Add Hello User btn-->
    <!--Add install btn-->
    <!--Add account btn-->
    <!--Add tutorial btn-->

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

      if(res.error===null) {
        return navigateTo('/login')
      }
    } catch (err) {
      console.log(err)
    }
  }

  // todo: add changePassword method

</script>
