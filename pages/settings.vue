<template>
  <div class=" relative px-10 space-y-4">
    <p class=" text-base">Merci beaucoup d'avoir installé et d'utiliser cette application,
      j'espère qu'elle te plaît !<br />Le concept est simple mais c'est toujours sympa de savoir combien d'observations
      on a fait de chaque espèces non ? (paroles de photographe animalier 😉)<br /><br />Corentin PERROUX</p>
    <button id="installApp"
      class="w-full flex space-x-4 items-center justify-between bg-darkGrey text-left rounded-lg px-4 py-3 focus:outline-none"
      @click="installApp">
      <div>
        <h2>Installer l'application</h2>
        <p class=" text-sm">(Ça ne prend même pas 1 Mo 😉)</p>
      </div>
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>

    </button>
    <button class="w-full bg-darkGrey text-left rounded-lg  focus:outline-none">
      <a href="https://know-wildlife.fr" target="_blank" class="flex space-x-4 px-4 py-3 items-center justify-between">
        <div>
          <h2>Connaître les espèces</h2>
          <p class=" text-sm">(Par le même créateur : moi 😊)</p>
        </div>
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
      </a>
    </button>
    <button class="w-full flex space-x-4 items-center bg-darkGrey text-left rounded-lg px-4 py-3 focus:outline-none">
      <nuxt-link to="/mentions">Mentions légales</nuxt-link>
    </button>
    <button class="w-full flex space-x-5 items-center bg-darkGrey text-left rounded-lg px-4 py-3 focus:outline-none"
      @click="deleteConfimation = true">
      <svg class="w-8 h-8 text-[#fd2829]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
      <h2 class=" text-[#fd2829]">Supprimer toutes<br />les observations</h2>
    </button>

    <!-- modal delete -->
    <transition name="modal">
      <div class=" fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center"
        v-if="deleteConfimation === true">
        <div class=" w-full h-full blur z-10" @click="deleteConfimation = false"></div>
        <div
          class=" z-50 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-11/12 px-3 py-5 bg-lightGrey rounded-lg">
          <svg class="w-10 h-10 text-[#fd2829] mx-auto mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>

          <p class="">Vous êtes sûr de vouloir supprimer <span class=" text-red-500 font-bold">toutes</span> les
            observations ?</p>
          <p class=" text-xs">(Elles ne sont sauvegardées nul part ailleurs !)</p>
          <div class="grid grid-cols-2 gap-x-2 mt-8">
            <button @click="deleteConfimation = false" class=" bg-darkGrey rounded-lg px-3 py-2">Annuler</button>
            <button @click="deleteAllSightings"
              class="   text-red-500 rounded-lg px-3 py-2">Supprimer</button>
          </div>
        </div>
      </div>
  </transition>
  <!-- /modal delete -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        deleteConfimation: false
      }
    },
    transitions: 'modal',
    methods: {
      async installApp() {
        let deferredPrompt;

        window.addEventListener('beforeinstallprompt', (e) => {
          console.log('OK 2');

          deferredPrompt = e;
        })

        if (deferredPrompt) {
          deferredPrompt.prompt();
          const {
            outcome
          } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            deferredPrompt = null
          }
        }
      },

      deleteAllSightings() {
        if (localStorage.getItem('listOfSpaces')) {
          localStorage.removeItem('listOfSpaces')
        }
        this.deleteConfimation = false
      }

    }
  }

</script>

<style scoped>
  .blur {
    backdrop-filter: blur(11px);
  }

</style>
