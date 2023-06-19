/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.625rem',
      },
      minWidth: {
        'screen-md-2': '980px',
        'card': '200px',
        'button': '80px',
        'button-m': '120px',
      },
      maxWidth: {
        'screen-md-2': '980px',
      },
      minHeight: {
        'toast': '0',
        'announcement': '100px',
      },
      maxHeight: {
        'card': '300px',
      },
      height: {
        'content-area': '70vh',
      },
      colors: {
        'red': '#E56363',
        'turquoise': '#B9FFE4',
        'turquoise-inactive': '#97CEB8',
        'light-blue': '#E0E3EF',
        'medium-light-blue': '#ABB1C7',
        'medium-blue': '#5A617C',
        'dark-blue': '#343B53',
      }
    },
  },
  plugins: [],
};