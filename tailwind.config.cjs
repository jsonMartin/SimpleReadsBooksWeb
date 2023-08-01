const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],

  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/typography'),
  ],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#faf5ff',
          '100': '#f4e8ff',
          '200': '#ebd5ff',
          '300': '#dcb3ff',
          '400': '#c683fd',
          '500': '#b054f8',
          '600': '#9c32eb',
          '700': '#8621cf',
          '800': '#7220a9',
          '900': '#5d1b88',
          '950': '#3c065f',
        },
        'blue': {
          '50': '#ecfbff',
          '100': '#d4f4ff',
          '200': '#b2eeff',  // This is the one to use I think
          '300': '#7de7ff',
          '400': '#40d5ff',
          '500': '#14b7ff',
          '600': '#0098ff',
          '700': '#0080ff',
          '800': '#0066cc',
          '900': '#0857a0',
          '950': '#0a3561',
        },

        'green': {
          '50': '#edfff2',
          '100': '#d6ffe3',
          '200': '#afffc9', //This is the one to use I think
          '300': '#71ffa0',
          '400': '#2dfb70',
          '500': '#02e54d',
          '600': '#00bf3b',
          '700': '#009933',
          '800': '#06752c',
          '900': '#085f26',
          '950': '#003613',
        },
      },
      screens: {
        // 'sm': '576px',
        'md': '960px',
        'lg': '1280px',
        'xl': '1440px',
      },

      keyframes: {
        flipInX: {
          '0%': { transform: 'rotateX(85deg)', opacity: 0 },
          '100%': { transform: 'rotateX(0deg)', opacity: 1 },
        },
        slideUp: {
          '0%': { transform: `translateY(75%)` },
          '100%': { transform: `translateY(0%)` },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        bouncefrog: {
          "0%": {
            "transform": "translateY(0)"
          },
          "50%": {
            "transform": "translateY(-5px)"
          },
          "100%": {
            "transform": "translateY(0)"
          }
        },
        "rotateSlow": {
          "0%": {
            "transform": "scaleX(1)"
          },
          "50%": {
            "transform": "scaleX(0.975)"
          },
          "100%": {
            "transform": "scaleX(1)"
          }
        },
        animation: {
          flipInX: 'flipInX .8s cubic-bezier(0.68, -0.55, 0.27, 1.55) 1',
          slideUp: 'slideUp 2s ease-in-out 1',
          fadeIn: 'fadeIn 2s ease-in-out 1',
          bouncefrog: 'bouncefrog 1s infinite steps(50)',
          rotateSlow: 'rotate 2s ease-in-out infinite'
        }
      },
    }
  }
}

module.exports = config;
