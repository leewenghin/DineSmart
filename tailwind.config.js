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
      Image: {
        "beef-bliss": "url('./src/assets/img/beef-bliss.jpg')"
      },
      backgroundImage: (theme) => ({
        "gradient-yellow": "Linear-gradient(90deg, #FFFFFF)",
        "testing-image": "url('./src/assets/img/beef-bliss.jpg)"
      }),
      fontFamily: {
      },
      theme: {
        width: {
          '600': '600px'
        }
      }
    },
  },
  plugins: [],
}