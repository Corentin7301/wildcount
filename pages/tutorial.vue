<template>
  <div>
    <h1 class="text-4xl font-bold text-center  mb-7">Comment utiliser l'application ?</h1>
    <div class="overflow-y-scroll content-container showText scroll-pt-2 calc-max-h no-scroll">
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
