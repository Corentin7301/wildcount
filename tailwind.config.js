/** @type {import('tailwindcss').Config} */

module.exports = {
  
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'tan-hide': {
          '50': '#fffaf7',
          '100': '#fff5ef',
          '200': '#ffe6d7',
          '300': '#ffd7bf',
          '400': '#ffb98f',
          '500': '#ff9b5f',
          '600': '#e68c56',
          '700': '#bf7447',
          '800': '#995d39',
          '900': '#7d4c2f'
        },
        'ecstasy': {
          '50': '#fff8f4',
          '100': '#fff2e9',
          '200': '#ffdec7',
          '300': '#ffcaa5',
          '400': '#ffa362',
          '500': '#ff7b1f',
          '600': '#e66f1c',
          '700': '#bf5c17',
          '800': '#994a13',
          '900': '#7d3c0f'
        },
        'mine-shaft': {
          '50': '#f5f5f5',
          '100': '#ebebeb',
          '200': '#cccccc',
          '300': '#adadad',
          '400': '#707070',
          '500': '#333333',
          '600': '#2e2e2e',
          '700': '#262626',
          '800': '#1f1f1f',
          '900': '#191919'
        },
      },
      fontFamily: {
        Dongle: ['Dongle', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
