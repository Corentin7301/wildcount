<template>
  <button class="w-16 h-16 p-2 rounded-full button-shadow"
    :class="`bg-gradient-to-t from-${defineButtonColor().first} to-${defineButtonColor().second}`">
    <slot />
  </button>
</template>

<script setup>
  const props = defineProps({
    color: {
      default: 'base',
      type: String,
    },
  })

  const defineButtonColor = () => {
    switch (props.color) {
      case 'base':
        return {
          first: 'ecstasy-500', second: 'tan-hide-500'
        }
        case 'green':
          return {
            first: 'green-300', second: 'green-500'
          }
          case 'red':
            return {
              first: 'red-300', second: 'red-500'
            }
    }
  }

</script>

<style scoped>
  .button-shadow {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 2px 5px -1px #FFFFFF;
  }

</style>
