<template>
  <menu class="absolute inset-0 z-50 h-screen w-full transition-all">
    <div @click="$emit('close-menu')" class="absolute inset-0 w-full h-full bg-mine-shaft-500 opacity-0"></div>
    <div class=" absolute inset-0 h-full w-[80%] bg-mine-shaft-700 flex flex-col items-start justify-between">
      <ul>
        <li v-for="oneClass in classes.data.Class" :key="oneClass.id" class=" capitalize">{{oneClass.nameFr}}
          ({{oneClass.scientificName}})</li>
      </ul>
      <div class="">
        <div>
          <nuxt-link to="/"></nuxt-link>
          <nuxt-link to="/list"></nuxt-link>
          <nuxt-link to="/stats"></nuxt-link>
          <nuxt-link to="/settings"></nuxt-link>
        </div>
        <button v-if="user" @click="signout()"
          class=" text-red-500 font-normal text-xl justify-self-end">Déconnexion</button>
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
