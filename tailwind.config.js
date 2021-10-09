module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        100: 100,
      },
      minHeight: {
        'min': 'min-content',
      },
      colors: {
        accent: {
          primary: '#fa9932',
          'primary-dark': '#e37c22',
        },
        overlay: '#00000032',
        'white-50': '#ffffff32',
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
