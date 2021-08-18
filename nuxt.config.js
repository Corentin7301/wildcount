import global from './site.config.json'


export default {
  ssr: false,
  target: 'static',
  head: {
    title: global.siteName,
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
        content: global.mainImage,
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
        content: global.twitterCardImage,
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
      },

      {
        rel: 'manifest',
        href: '/manifest.json'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;700&display=swap'
      }
    ]
  },
  css: ['~/assets/css/main.css', '~/assets/css/transition.css', '~/assets/css/tailwind.css'],
  plugins: [{
      src: '@/plugins/variables.js'
    },
  ],
  // auto import des comp.
  components: true,
  buildModules: [
    '@nuxtjs/google-analytics',
    '@nuxtjs/tailwindcss',
  ],

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
  },
  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    },
  },

  // tailwindcss: {
  //   jit: true
  // },


  modules: [


    // always at the end of array
    '@nuxtjs/sitemap',

  ],



  sitemap: {
    hostname: global.siteUrl,
    routes: async () => {


      // const content = await $content('content').only(['path', 'createdAt']).fetch()
      // const dynamicArticles = content.map((content) => {
      //   return {
      //     url: content.path,
      //     priority: 1,
      //     lastmod: content.createdAt
      //   }
      // })
      // ADD STATIC PAGES IN SITEMAP HERE
      const staticPages = [
        "/contact",
        // ...
      ]
      return [...staticPages]
      // return [...dynamicArticles, ...staticPages]
    },
  },

  styleResources: {
    // scss: ['~/assets/scss/*.scss'],
    css: ['~assets/css/*.css']
  },
  build: {},
  generate: {},
  layoutTransition: {
    name: 'layout-transition',
    mode: 'out-in'
  },
  pageTransition: {
    name: 'page-transition',
    mode: 'out-in',
  },

}
