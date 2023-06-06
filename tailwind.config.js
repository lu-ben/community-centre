/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        'screen-md-2': '980px',
        'card': '200px',
      },
      maxWidth: {
        'screen-md-2': '980px',
      },
      minHeight: {
        'announcement': '100px',
      },
      maxHeight: {
        'card': '300px',
      },
      height: {
        'content-area': '70vh',
      },
      colors: {
        'turqoise': '#B9FFE4',
        'turqoise-inactive': '#97CEB8',
        'light-blue': '#E0E3EF',
        'dark-blue': '#343B53',
      }
    },
  },
  plugins: [],
}