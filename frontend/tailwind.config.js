/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'titan-black': '#050505',
        'titan-dark': '#121212',
        'titan-lime': '#B4FF00',
        'titan-grey': '#222222',
        'titan-muted': '#777777',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Archivo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}