module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: '', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Rubik', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
    },
    screens: {
      'xs': '420px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
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
