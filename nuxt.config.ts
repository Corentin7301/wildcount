import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    // target: 'static',

    app: {
        head: {
          title: 'Nuxt 3 Awesome Starter',
          titleTemplate: '%s - Nuxt 3 Awesome Starter',
          meta: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
              hid: 'description',
              name: 'description',
              content: 'Nuxt 3 Awesome Starter',
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
      favicon: './assets/img/icon.png',

        // auto import components
      components: true,

})
