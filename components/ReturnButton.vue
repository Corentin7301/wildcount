<template>
  <NuxtLink :to="`/${targetPage}`" class="flex items-center justify-center mt-20 gap-3 light-button"><svg class="w-6 h-6"
      fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
    </svg> Retour</NuxtLink>
</template>

<script setup>
    const props = defineProps({
        targetPage: {
            type: String,
            required: true
        }
    })
</script>