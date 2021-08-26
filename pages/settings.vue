<template>
  <div class=" relative px-10 space-y-4">
    <p class=" text-base">Merci beaucoup d'avoir installé et d'utiliser cette application,
      j'espère qu'elle te plaît !<br />Le concept est simple mais c'est toujours sympa de savoir combien d'observations
      on a fait de chaque espèces non ? (paroles de photographe animalier 😉)<br /><br />Corentin PERROUX</p>
    <button id="installApp"
      class="w-full flex space-x-4 items-center bg-darkGrey text-left rounded-lg px-4 py-3 focus:outline-none"
      @click="installApp">
      <div>
        <h2>Installer l'application</h2>
        <p class=" text-sm">(Ça ne prend même pas 1 Mo 😉)</p>
      </div>
      <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
        </path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
        </path>
      </svg>
    </button>
    <button class="w-full bg-darkGrey text-left rounded-lg  focus:outline-none">
      <a href="https://know-wildlife.fr" target="_blank" class="flex space-x-4 px-4 py-3 items-center">
        <div>
          <h2>Connaître les espèces</h2>
          <p class=" text-sm">(Par le même créateur : moi 😊)</p>
        </div>
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
          </path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
          </path>
        </svg>
      </a>
    </button>
    <button class="w-full flex space-x-4 items-center bg-darkGrey text-left rounded-lg px-4 py-3 focus:outline-none">
      <nuxt-link to="/mentions">Mentions légales</nuxt-link>
    </button>
    <button class="w-full flex space-x-4 items-center bg-darkGrey text-left rounded-lg px-4 py-3 focus:outline-none"
      @click="deleteConfimation = true">
      <svg class="w-10 h-10 text-[#fd2829]" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
        </path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
        </path>
      </svg>
      <h2 class=" text-[#fd2829]">Supprimer toutes<br />les observations</h2>
    </button>

    <!-- modal delete -->
    <transition name="modal">
      <div class=" fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center"
        v-if="deleteConfimation === true">
        <div class=" w-full h-full blur z-10" @click="deleteConfimation = false"></div>
        <div
          class=" z-50 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-11/12 px-3 py-5 bg-lightGrey rounded-lg">
          <svg class="w-10 h-10 text-[#fd2829] mx-auto mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
            </path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
            </path>
          </svg>
          <p class="">Vous êtes sûr de vouloir supprimer <span class=" text-red-500">toutes</span> les
            observations ?</p>
          <p class=" text-xs">(Elles ne sont sauvegardées nul part ailleurs !)</p>
          <div class="grid grid-cols-2 gap-x-2 mt-8">
            <button @click="deleteConfimation = false" class=" bg-darkGrey rounded-lg px-3 py-2">Non</button>
            <button @click="deleteAllSightings"
              class=" border-2 border-red-500  text-red-500 rounded-lg px-3 py-2">Oui</button>
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
