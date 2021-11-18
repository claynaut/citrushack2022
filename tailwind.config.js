module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: '', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Rubik', 'sans-serif'],
    },
    extend: {
      colors: {
        accent: {
          primary: '#fa9932',
          'primary-dark': '#e37c22',
        },
        overlay: '#00000032',
        'white-50': '#ffffff32',
      },
      transitionProperty: {
        'size': 'width, max-width, height, max-height, margin, padding',
       },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
