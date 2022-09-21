<template>
  <div class="mx-auto " :class="small ? 'max-w-[80%]' : 'max-w-[90%]'">
    <slot />
  </div>
</template>

<script setup>
  const name = ref("Container")
  const props = defineProps({
    small: {
      type: Boolean,
      default: false,
    },
  })

</script>
