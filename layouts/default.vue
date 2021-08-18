<template>
  <div id="layout" class=" text-lightColor">
    <Nuxt />
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