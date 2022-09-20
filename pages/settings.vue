<template>
  <div>
    <Container>
      <section class=" grid gap-4 divide-y-[1px] overflow-y-scroll snap-y scroll-pt-2 calc-max-h no-scroll">
        <button class=" button-container text-ecstasy-500" v-if="deferredPrompt" @click="clickCallback()">
          <div class="label-container">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            <span>Installer l'application</span>
          </div>
          <div class="w-2 h-2 mr-2 rounded-full bg-ecstasy-500 animate-ping"></div>
        </button>
        <NuxtLink to="/tutorial" class=" button-container">
          <div class="label-container">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Tutorial</span>
          </div>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </NuxtLink>
        <button class=" button-container" @click="whyThisAppModal = true">
          <div class="label-container">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
              </path>
            </svg>
            <span>Pourquoi cette application ?</span>
          </div>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
        <a href="https://www.buymeacoffee.com/corentin7301" class=" button-container text-tan-hide-500" target="_blank">
          <div class="label-container">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z">
              </path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
            </svg>
            <span>Payes moi un café <span class="text-base">☕️</span> ! </span>
          </div>
        </a>
        <NuxtLink to="/account/new-password" class=" button-container">
          <div class="label-container">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
              </path>
            </svg>
            <span>Modification du mot de passe</span>
          </div>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </NuxtLink>
        <NuxtLink to="/send-comments" class=" button-container">
          <div class="label-container">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z">
              </path>
            </svg>
            <span>Envoie tes remarques</span>
          </div>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </NuxtLink>
        <NuxtLink to="/legal/legal-notice" class=" button-container">
          <div class="label-container">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
              </path>
            </svg>
            <span>Mentions légales</span>
          </div>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </NuxtLink>
        <NuxtLink to="/legal/privacy-policy" class=" button-container">
          <div class="label-container">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
              </path>
            </svg>
            <span>Police de confidentialité</span>
          </div>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </NuxtLink>
        <button class="text-red-500 button-container" @click="deleteModale = true">
          <div class="label-container">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
              </path>
            </svg>
            <span>Supprimer TOUTES les observations</span>
          </div>
        </button>
        <button v-if="user" @click="signout()" class="text-red-500 button-container">
          <div class="label-container">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            <span>Déconnexion</span>
          </div>
        </button>
      </section>
      <p class="text-xl mt-7">Application réalisée par <a href="https://portfolio.corentinperroux.fr"
          class=" text-tan-hide-500">Corentin PERROUX</a> <span class="text-base">🦌</span></p>
      <!--why this app modale-->
      <Transition name="slide-top" appear>
        <CtaModal v-if="whyThisAppModal" @close-modal="whyThisAppModal = false"
          job="showText" class=" content-container">
        <template #title>
          Pourquoi cette application ?
        </template>
          <template #showText>
            <ContentRenderer :value="data" />
          </template>
        </CtaModal>
      </Transition>
      <!--delete modale-->
      <Transition name="slide-top" appear>
        <CtaModal v-if="deleteModale" @close-modal="deleteModale = false"
          buttonMessage="Tout supprimer" :warn="true" job="deletingAllObservations">
          <template #title>
            Supprimer TOUTES les observations ?<br>(Attention ! Tu ne pourras pas annuler !)
          </template>
        </CtaModal>
      </Transition>
    </Container>
  </div>
</template>


<script setup>
  definePageMeta({
    middleware: 'auth'
  })
  const {
    auth
  } = useNhostClient()
  const user = useNhostUser()

  const signout = async () => {
    try {
      const res = await auth.signOut()

      if (res.error === null) {
        return navigateTo('/login')
      }
    } catch (err) {
      console.log(err)
    }
  }

  onMounted(() => {
    captureEvent()
  })
  const deferredPrompt = ref(null)
  const captureEvent = () => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      // Stash the event so it can be triggered later.
      deferredPrompt.value = e
    })
  }
  const clickCallback = () => {
    // Show the prompt
    deferredPrompt.prompt()
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        // Call another function?
      }
      deferredPrompt.value = null
    })
  }

  const whyThisAppModal = ref(false)
  const {
    data
  } = await useAsyncData('page-data', () => queryContent('/why-this-app').findOne())

  const deleteModale = ref(false)

</script>

<style scoped>
  .button-container {
    @apply flex items-center justify-between snap-start;
  }

  .label-container {
    @apply flex items-center gap-4 text-2xl pt-4;
  }

  .calc-max-h {
    /* base height - navbar height and copyright height */
    /* max-height: calc(var(--base-max-h) - (55px)); */
    max-height: calc(var(--base-max-h) - (55px));
  }

</style>
