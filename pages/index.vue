<template>
  <div>
    <h1 class=" text-3xl">{{title}}</h1>
  </div>

</template>

<script setup>
  definePageMeta({
    title: 'My home page'
  })

  const title = ref('My title')

</script>
