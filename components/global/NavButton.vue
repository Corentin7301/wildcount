<template>
  <nuxt-link :to="url" class=" flex justify-center items-center rounded-full h-14 w-14 bg-backgroundColor">
    <slot />
  </nuxt-link>

</template>

<script>
  export default {
    name: 'NavButton',
    props: {
      url: {
        type: String,
        default: ''
      }
    }
  }

</script>
