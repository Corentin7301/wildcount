<template>
  <button
    class="min-w-[85px] py-1 pt-2 px-3 text-center text-2xl bg-gradient-to-t from-ecstasy-500 to-tan-hide-500 button-shadow focus:ring-white focus:border-none focus:outline-none rounded-full border-none placeholder:text-gray-200 mb-6 snap-start">
    <div>
      <slot name="label" />
    </div>
  </button>
</template>

<script setup>
  import {
    useFiltersStore
  } from '~/store/filters'
  const filtersStore = useFiltersStore()
</script>
