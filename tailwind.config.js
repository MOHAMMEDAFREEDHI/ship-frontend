/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: "#020617",
        steel: "#94a3b8",
        accent: "#38bdf8",
      },
    },
  },
  plugins: [],
}

