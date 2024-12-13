/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      backgroundImage: {
        'footer-texture': "url('/src/images/footer-texture.png')",
      },
      colors: {
        maple: {
          50: '#fff2f1',
          100: '#ffe1df', // disabled background
          200: '#ffc9c5',
          300: '#ffa29c',
          400: '#ff6d64',
          500: '#ff3f33', // default
          600: '#ee2114', // hover
          700: '#c1170c', // active
          800: '#a5180f',
          900: '#891a13',
          950: '#4b0804',
        },
        darkGray: '#333',
      },
    },
  },
  plugins: [],
  darkMode: ['class'],
}
