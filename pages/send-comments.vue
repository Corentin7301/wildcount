<template>
  <div>
    <p class="text-2xl leading-6">Si tu as une question, une suggestion, une demande d'ajout d'une espèce ou quoi que ce
      soit, <span class=" text-ecstasy-500">tu
      es au bon endroit</span> !<br>Envoie moi un petit message, promis je te réponds
      par mail au plus vite !</p>
    <form>
      <Container class=" grid gap-4 mt-10">
        <label for="firstname">
          <input type="text" name="firstname" id="firstname" placeholder="Ton prénom"
            class="input-style p-0 pt-1 text-2xl text-center max-w-[75%] mx-auto flex items-center justify-center"
            v-model="firstname" required>
        </label>
        <div
          class="w-full rounded-2xl mx-auto bg-gradient-to-b px-[1px] pt-[1px] from-ecstasy-500 via-tan-hide-500 to-transparent">
          <textarea name="message" id="message" placeholder="Tout ce que tu veux !"
            class=" bg-mine-shaft-500 py-4 px-5 rounded-2xl text-white text-2xl -4 min-h-[100px] w-full resize-none -mb-2 leading-6 border-none outline-none focus:border-none focus:outline-none"
            v-model="message"></textarea>
        </div>
        <input type="submit" name="search" id="search" class="submit-button mt-5" value="Envoyer">
      </Container>
    </form>
      <NuxtLink to="/settings" class="  light-button mt-20 flex items-center justify-center gap-3"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg> Retour</NuxtLink>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: 'auth'
  })

</script>
