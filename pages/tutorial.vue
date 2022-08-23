<template>
  <div>
    <h1 class=" text-center text-4xl font-bold mb-7">Comment utiliser l'application ?</h1>
    <div class="content-container showText overflow-y-scroll scroll-pt-2 calc-max-h no-scroll">
      <ContentDoc />
    </div>
  </div>
</template>

<style scoped>
  /* base height - title height */
  .calc-max-h {
    max-height: calc(var(--base-max-h) - (70px));
  }

</style>
