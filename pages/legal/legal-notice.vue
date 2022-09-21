<template>
  <div class="overflow-y-scroll  content-container scroll-pt-2 calc-max-h no-scroll">
    <ContentDoc />
  </div>
</template>


<style>
  .calc-max-h {
    max-height: calc(var(--base-max-h));

  }

  .content-container {
    @apply text-xl leading-6;
  }

  .content-container h1 {
    @apply text-4xl mb-3;
  }

  .content-container h2 {
    @apply text-2xl mb-1;
  }

  .content-container a {
    @apply text-ecstasy-500;
  }

</style>
