import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    // nitro: {
    //   preset: 'service-worker'
    // },

    app: {
        head: {
          title: 'Wildcount',
          // titleTemplate: '%s - Wildcount',
          meta: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
              hid: 'L\'application qui permet de sauvegarder les rencontres avec les animaux sauvages !',
              name: 'L\'application qui permet de sauvegarder les rencontres avec les animaux sauvages !',
              content: 'L\'application qui permet de sauvegarder les rencontres avec les animaux sauvages !',
            },
          ],
          link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.png' }],
        },
      },


    modules: ['@nuxtjs/tailwindcss','nuxt-nhost','@pinia/nuxt','@nuxt/content'],
    nhost: {
      backendUrl: process.env.NHOST_URL,
    },

    css: [
        // CSS file in the project
        '@/assets/css/tailwind.css',
        '@/assets/css/fonts.css',
        '@/assets/css/transition.css',
        '@/assets/css/style-perso.css',
      ],

        // auto import components
      components: true,

})
