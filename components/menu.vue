<template>
  <menu class="absolute inset-0 z-50 h-screen w-full transition-all">
    <div @click="$emit('close-menu')" class="absolute inset-0 w-full h-full bg-mine-shaft-500 opacity-0"></div>
    <div class=" absolute inset-0 h-full w-[80%] bg-mine-shaft-700 flex flex-col items-start justify-between">
      <svg @click="$emit('close-menu')" class="w-6 h-6 absolute top-5 right-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      <ul>
        <li v-for="oneClass in classes.data.Class" :key="oneClass.id" class=" capitalize">{{oneClass.nameFr}}
          ({{oneClass.scientificName}})</li>
      </ul>
      <div class=" w-full">
        <div>
          <nuxt-link to="/"></nuxt-link>
          <nuxt-link to="/list"></nuxt-link>
          <nuxt-link to="/stats"></nuxt-link>
          <nuxt-link to="/settings"></nuxt-link>
        </div>
        <Container class=" flex justify-self-end justify-end items-end">
          <button v-if="user" @click="signout()"
            class=" text-red-500 font-normal text-xl">Déconnexion</button>
        </Container>
      </div>
    </div>
  </menu>
</template>

<script setup>
  const {
    auth
  } = useNhostClient()
  const user = useNhostUser()
  const {
    graphql
  } = useNhostClient()

  const {
    data: classes
  } = await useAsyncData('', async () => {
    const classes = await graphql.request(`
    query Classes {
        Class(order_by: {id: asc}) {
            id
            nameFr
            scientificName
        }
    }
  `)
    return classes
  })

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

</script>
