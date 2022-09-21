<template>
  <button
    class="min-w-[85px] py-1 pt-2 px-3 text-center text-2xl bg-gradient-to-t from-ecstasy-500 to-tan-hide-500 button-shadow focus:ring-white focus:border-none focus:outline-none rounded-full border-none placeholder:text-gray-200 snap-start">
    <div class="flex items-center justify-center gap-1">
      <slot name="label" />
      <svg v-if="props.chevron" class="w-4 h-4 mb-1 transition-transform duration-200"
            :class="filtersStore.filter === props.filterName && filtersStore.order === 'asc' ? '-rotate-180' : ''"
            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
    </div>
  </button>
</template>

<script setup>
  import {
    useFiltersStore
  } from '~/store/filters'
  const filtersStore = useFiltersStore()

  const props = defineProps({
    chevron: {
      type: Boolean,
      required: false,
      default: false
    },
    filterName: {
      type: String,
      required: false,
      default: ''
    }
  })
</script>
