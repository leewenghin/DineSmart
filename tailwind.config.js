/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#EDA345",
        secondaryColor: "# FF5C00"
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
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
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