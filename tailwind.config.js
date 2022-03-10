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
      backgroundImage: {
        pattern: 'var(--pattern)',
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: {
          DEFAULT: 'var(--accent)',
          secondary: 'var(--accent-secondary)',
        },
        highlight: {
          DEFAULT: 'var(--highlight)',
          dark: 'var(--highlight-dark)',
        },
        card: 'var(--card)',
        text: 'var(--text)',
        overlay: 'var(--overlay)',
        sub: {
          DEFAULT: 'var(--sub)',
          secondary: 'var(--sub-secondary)',
          highlight: 'var(--sub-highlight)',
          bright: 'var(--sub-bright)',
        }
      },
      transitionProperty: {
        'size': 'width, max-width, height, max-height, margin, padding',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        }
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
