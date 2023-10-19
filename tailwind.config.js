/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin'),
  ],
  theme: {
    extend: {
      screens: {
        'xs': '450px',
      },
      width: {
        'vw-16': '16vw',
        'vw-21': '21vw'
      },
      minWidth: {
        '60': '60px',
      },
      colors: {
        primaryColor: "#EDA345",
        secondaryColor: "#FF5C00",
        goldColor: "#FFA500",
        lightOrangeColor: "#F2DEC3",
        darkOrangeColor: "#b87e35",
        lightGreyColor: '#F2F2F2',
        darkGreyColor: '#C4C4C4',

        // Admin
        bodyColor: "#FFEADB",
        sidebarColor: "#fff",
        sidebarTextColor: "#7d8da1"
      },
      spacing: {
        '142': '42rem'
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
    },
  },
}