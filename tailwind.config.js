/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

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
            'border': 'none'
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
          }
        }
      }
    ]
  }
}
