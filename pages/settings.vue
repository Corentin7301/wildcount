<template>
  <div class=" px-10 space-y-4">
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
    <button class="w-full flex space-x-4 items-center bg-darkGrey text-left rounded-lg px-4 py-3 focus:outline-none">
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
  </div>
</template>

<script>
  export default {
    mounted() {
      let deferredPrompt;
      window.addEventListener('beforeinstallprompt', (e) => {
        console.log('OK');
        deferredPrompt = e;
        this.deferredPrompt = deferredPrompt
      })
      const installApp = document.getElementById('installApp')

      window.addEventListener('beforeinstallprompt', (e) => {
        deferredPrompt = e;
      })

      installApp.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const {
            outcome
          } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            deferredPrompt = null
          }
        }
      })
    },
  }

</script>
