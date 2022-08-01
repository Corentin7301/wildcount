<template>
  <form @submit.prevent="" class=" grid gap-9 max-w-[80%] mx-auto">
    <div class=" flex flex-col gap-5 ">
      <div class="mt-1 relative rounded-md shadow-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input type="text" name="search" id="search" class="input-style text-2xl p-0 pl-10 pt-1"
          placeholder="Rechercher une espèce..." v-model="search" required>
      </div>
      <input type="date" name="date" id="date"
        class="input-style p-0 pt-2 text-2xl text-center max-w-[75%] mx-auto flex items-center justify-center"
        v-model="date" required>
    </div>
    <input type="number" name="number" id="number"
      class="input-style max-w-[125px] max-h-[125px] mx-auto text-center grid items-center justify-center text-8xl pt-5"
      placeholder="0" max="500" v-model="number" required>
    <div
      class="rounded-2xl mx-auto bg-gradient-to-b px-[1px] pt-[1px] from-ecstasy-500 via-tan-hide-500 to-transparent">
      <textarea name="comment" id="comment" placeholder="Entrez des informations sur votre rencontre"
        class=" bg-mine-shaft-500 py-4 px-5 rounded-2xl text-white text-xl leading-4 min-h-[100px] resize-none -mb-2 border-none outline-none focus:border-none focus:outline-none"
        v-model="comment"></textarea>
    </div>
    <input type="submit" name="search" id="search" class="submit-button" placeholder="Ajouter">
  </form>

</template>

<script setup>
  import dayjs from 'dayjs'
  definePageMeta({
    title: 'My home page'
  })

  const search = ref('')
  const date = ref(dayjs().format('YYYY-MM-DD'))
  const number = ref('')
  const comment = ref('')

</script>

<style scoped>
  .input-style {
    @apply w-full bg-gradient-to-t from-tan-hide-500 to-ecstasy-500 input-shadow focus:ring-white focus:border-none focus:outline-none rounded-full border-none placeholder:text-gray-200;
  }

  .submit-button {
    @apply w-full text-3xl text-center pt-1 h-11 bg-gradient-to-t from-ecstasy-500 to-tan-hide-500 button-shadow focus:ring-white focus:border-none focus:outline-none rounded-full placeholder:text-gray-200;
  }

  .input-shadow {
    box-shadow: 0px 3.25px 15.4375px rgba(0, 0, 0, 0.25), inset 0px 1.625px 4.0625px -0.8125px #FFFFFF;
  }

  .button-shadow {
    box-shadow: 0px 4px 19px rgba(0, 0, 0, 0.25), inset 0px 2px 4px #FFFFFF;
  }

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>
