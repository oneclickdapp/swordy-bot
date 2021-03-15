const path = require('path')

module.exports = {
  plugins: [
    require('tailwindcss')(path.resolve(__dirname, '../tailwind.config.js')),
    require('autoprefixer'),
    require('@tailwindcss/typography'),
  ],
  fontFamily: {
    sans: ['Graphik', 'sans-serif'],
    serif: ['Merriweather', 'serif'],
  },
  theme: {
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            h3: {
              margin: '20px',
            },

            p: {
              margin: '20px',
            },
          },
        },
      },
    },
  },
}
