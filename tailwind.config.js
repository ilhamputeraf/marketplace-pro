/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class' ,
  theme: {
    extend: {
      colors: {
        primary:  "#e597e7",
        secondary: "#d96dd9"
      },
      container: {
        center: true,
        padding:{
          DEFAULT: "rem" ,
          sm : "3rem" ,
        }
      }
    },
  },
  plugins: [],
}

