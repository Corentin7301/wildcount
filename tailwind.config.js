const global = require("./site.config.json");

module.exports = {
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content:[
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
},
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        backgroundColor: global.style.colors.backgroundColor,
        darkGrey: global.style.colors.darkGrey,
        lightGrey: global.style.colors.lightGrey,
        lightColor: global.style.colors.lightColor,
      },
      outline: theme => ( {
        lightGrey: global.style.colors.lightGrey,
        })
    },
    fontFamily: {
      'quicksand': ['Quicksand', 'sans-serif'],
      'dmMono': ['DM Mono', 'monospace'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
