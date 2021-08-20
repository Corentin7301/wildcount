<template>
  <div id="layout" class=" font-quicksand text-lightColor relative text-xl min-h-screen">
    <Header />
    <Nuxt class=" pb-32 px-10" />
    <Navbar />
  </div>
</template>

<script>
import blogConfig from "@/site.config.json"
export default {
  data() {
    return {
      blogConfig,
    }
  },
}
</script>