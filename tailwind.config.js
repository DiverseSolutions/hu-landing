const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      averta: ["Averta CY"],
      'sans': ['Averta CY', ...defaultTheme.fontFamily.sans],
      'body': ['Averta CY', ...defaultTheme.fontFamily.sans],
      'display': ['Averta CY', ...defaultTheme.fontFamily.sans],
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'mw-md': {
        'raw': '(max-width: 769px)'
      },

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1900px',
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      screens: {
        'sm': '100%',
        'md': '100%',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1600px',
        '3xl': '1800px',
      }
    },
    extend: {
      // that is animation class
      animation: {
        fade: 'fadeOut 1s ease-in-out forwards',
        hero: 'heroMove 500ms ease-in-out forwards',
        heroRevert: 'heroMoveRevert 500ms ease-in-out forwards',
        heroMobile: 'heroMobileMove 500ms ease-in-out forwards',
        heroMobileRevert: 'heroMobileMoveRevert 500ms ease-in-out forwards',
      },

      // that is actual animation
      keyframes: theme => ({
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        heroMove: {
          '0%': { transform: `translate(100%, -100%)` },
          '100%': { transform: `translate(0%, 0%)` },
        },
        heroMoveRevert: {
          '0%': { transform: `translate(0%, 0%)` },
          '100%': { transform: `translate(100%, -100%)` },
        },
        heroMobileMove: {
          '0%': { transform: `translate(0%, -100%)` },
          '100%': { transform: `translate(0%, 0%)` },
        },
        heroMobileMoveRevert: {
          '0%': { transform: `translate(0%, 0%)` },
          '100%': { transform: `translate(0%, -100%)` },
        },
      }),
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        'the-hu': {
          ...require('daisyui/src/colors/themes')['[data-theme=lofi]'],
          '.btn': {
            'border': 'none',
            'text-transform': 'none'
          },
          '.btn-black': {
            'background-color': '#000',
            'border-radius': '8px'
          },
          '.btn-primary': {
            'border-radius': '8px'
          },
          '.btn-secondary': {
            'border-radius': '8px'
          },
          '.input': {
            'border-radius': '8px'
          },
          '.text-dark-secondary': {
            'color': 'rgba(39, 41, 55, 0.75)',
            'font-weight': 400,
          },
          '.text-terteriary': {
            'color': 'rgba(39, 41, 55, 0.35)'
          }
        }
      }
    ]
  }
}
