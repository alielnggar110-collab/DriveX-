/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#d4a24e', dark: '#b8862e', light: '#e8c373' },
        surface: { light: '#f8f6f3', dark: '#0c0f1a' }
      },
      fontFamily: { inter: ['Inter', 'sans-serif'] }
    }
  },
  plugins: []
};