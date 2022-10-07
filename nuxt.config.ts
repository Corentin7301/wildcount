import {
  defineNuxtConfig
} from 'nuxt'
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

      meta: [{
          charset: 'utf-8'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          hid: 'description',
          name: 'description',
          content: global.siteMetaDescription
        },

        {
          property: "og:site_name",
          content: global.siteName
        },
        {
          hid: "og:type",
          property: "og:type",
          content: global.siteType
        },
        {
          hid: "og:url",
          property: "og:url",
          content: global.siteUrl,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: global.siteName,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: global.siteMetaDescription,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "/logo.png",
        },
        {
          property: "og:image:width",
          content: "740"
        },
        {
          property: "og:image:height",
          content: "300"
        },

        {
          name: "twitter:site",
          content: global.twitterAccount
        },
        // { name: "twitter:card", content: "summary_large_image" }, 
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: global.twitterUrl,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: global.siteName,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: global.siteMetaDescription,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "/logo.png",
        },

      ],
      link: [

        {
          rel: 'icon',
          type: 'image/x-icon',
          // CHANGE FAVICON NAME HERE
          href: '/logo.png'
        },
        {
          hid: "canonical",
          rel: "canonical",
          href: global.siteUrl,
        }
      ]
    },
  },

  modules: ['@nuxtjs/tailwindcss', 'nuxt-nhost', '@pinia/nuxt', '@nuxt/content', 'nuxt-icon', '@kevinmarrec/nuxt-pwa'],
  nhost: {
    backendUrl: process.env.NHOST_URL,
  },
  pwa: {
    manifest: {
      name: 'Marrec.io',
      short_name: 'Marrec.io',
      background_color: '#111827',
      theme_color: '#3B82F6',
    },
    meta: {
      name: 'Kevin Marrec | Marrec.io',
      author: 'Kevin Marrec',
      description: 'Kevin Marrec, Full-stack Developer.',
      mobileAppIOS: true,
      ogHost: 'https://marrec.io',
      twitterCard: 'summary',
      twitterSite: '@K_Marrec',
      twitterCreator: '@K_Marrec',
    },
  },
  // pwa: {
  //   meta: {
  //     theme_color: '#373D20',
  //     name: 'WildCount',
  //     author: 'Corentin PERROUX',
  //     description: 'Compte tes observations d\'espèces sauvages sur WildCount !',
  //     lang: 'fr',
  //   },
  //   manifest: {
  //     start_url: "/",
  //     name: 'WildCount',
  //     short_name: 'WildCount',
  //     description: 'Compte tes observations d\'espèces sauvages sur WildCount !',
  //     lang: 'fr',
  //     theme_color: "#333333",
  //     background_color: "#333333",
  //     display: "standalone",
  //     // orientation: "portrait",
  //     // start_url: "/?utm_source=pwa"
  //   },
  //   workbox: {
  //     enabled: true
  //   },
  // },

  plugins: [{
    src: '@/plugins/variables.js'
  }, ],

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
