module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          light: '#96b6ff',
          DEFAULT: '#55b6ff',
          dark: '#2b6a99',
        },
        pink: {
          light: '#ff98e6',
          DEFAULT: '#ff59d6',
          dark: '#a13a87',
        },
        purple: {
          light: '#858cfb',
          DEFAULT: '#5d60ff',
          dark: '#333cdf',
        },
        green: {
          DEFAULT: '#386641',
          light: '#a7c957',
        },
        red: {
          DEFAULT: '#bc4749',
        },
        grey: {
          DEFAULT: '#f2e8cf',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
