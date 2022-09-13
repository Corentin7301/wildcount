<template>
  <div class=" absolute top-0 left-0 w-screen h-screen flex items-center justify-center z-10">
    <div @click="$emit('close-modal')" class=" absolute top-0 left-0 w-screen h-screen bg-mine-shaft-600 opacity-50">
    </div>
    <div
      class="bg-gradient-to-b px-[1px] pt-[1px] card-shadow rounded-xl w-[90%] from-ecstasy-500 via-tan-hide-500 to-transparent">
      <div class="relative bg-mine-shaft-700 text-xl rounded-xl p-10 pt-14 z-50 border-none outline-none">
        <button @click="ctaAction()"
          class="absolute -bottom-5 -right-3 w-12 h-12 p-3 rounded-full bg-gradient-to-b from-tan-hide-500 to-ecstasy-500 button-shadow">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <p class=" text-3xl text-center font-normal mb-5 leading-6">
          <slot name="title" />
        </p>
        <!--Modal content-->

        <section>
          <slot name="modaleContent" />
        </section>

        <!--/Modal content-->
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({})
  const emit = defineEmits(['close-modal'])

  const ctaAction = async () => {
    emit('close-modal')
  }

  const refresh = () => refreshNuxtData('observationDatas')
  onMounted(() => {
    refresh()
  })

</script>
