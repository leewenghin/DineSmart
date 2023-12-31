/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js"
  ],
  plugins: [
    require('flowbite/plugin')
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
        sidebarTextColor: "#7d8da1",

        // Admin - Category
        imageColor: '#ffe3c3',
      },
      spacing: {
        '142': '42rem'
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
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      animation: {
        slideIn: 'slideIn 0.1s ease-in-out',
      },
    },
  },
}