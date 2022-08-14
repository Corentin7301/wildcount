<template>
  <button @click.prevent="$emit('filter-name', props.filter)"
    class="min-w-[85px] py-1 pt-2 text-center text-2xl bg-gradient-to-t from-ecstasy-500 to-tan-hide-500 button-shadow focus:ring-white focus:border-none focus:outline-none rounded-full border-none placeholder:text-gray-200 mb-6 snap-start">
    <p>
      <slot />
    </p>
  </button>
</template>

<script setup>
  const props = defineProps({
    filter: {
      type: String,
      default: ''
    }
  })

</script>
