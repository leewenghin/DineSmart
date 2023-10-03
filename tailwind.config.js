/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#CACACA"
      },
      backgroundImage: (theme) => ({
        "gradient-yellow": "Linear-gradient(90deg, #FFFFFF)",
        "testing-image": "url('./assets/...png')"
      }),
      fontFamily: {
      }
    },
  },
  plugins: [],
}