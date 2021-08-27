<template>
  <div class=" relative h-screen w-screen bg404">
    <nuxt-link to="/"><button
        class="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 bg-darkGrey text-lightColor text-center rounded-lg px-4 py-3 focus:outline-none">
        Retourner sur l'application
      </button></nuxt-link>
  </div>
</template>

<script>
  export default {
    name: '404',
    layout: '404Layout'
  }

</script>
<style scoped>
  .bg404 {
    background: url('@/assets/img/404.png');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }

</style>
