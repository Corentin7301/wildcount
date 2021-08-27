<template>
  <div id="layout" class="lg:flex lg:flex-col lg:items-center lg:justify-center font-quicksand text-lightColor relative text-xl min-h-screen">
    <div class="hidden lg:block">
    <img src="@/assets/img/logo.png" alt="wildcount" class="mx-auto h-[30vh]">
    <p class="text-4xl text-center mt-20">Pour utiliser cette application, rendez-vous sur votre mobile
      ! 😉</p>
    </div>

    <Header class=" lg:hidden z-50" />
    <Nuxt class=" lg:hidden pb-32 px-10" />
    <Navbar class="lg:hidden" />
    <scroll-to-top>
      <svg class="w-6 h-6 top" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7">
        </path>
      </svg>
    </scroll-to-top>
  </div>
</template>

<script>
  import blogConfig from "@/site.config.json"
  export default {
    data() {
      return {
        blogConfig,
      }
    },
    mounted() {
      let deferredPrompt;


      window.addEventListener('beforeinstallprompt', (e) => {
        console.log('OK');
        deferredPrompt = e;
        this.deferredPrompt = deferredPrompt
      })


    },
  }

</script>
