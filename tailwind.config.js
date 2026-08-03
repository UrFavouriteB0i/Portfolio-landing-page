/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        Montblack: ['MontserratBlk'],
        Afacad: ['Afacad'],
        IBM: ['IBM'],
        InterReg: ['Interreg'],
        InterMed: ['Intermed'],
        InterBld: ['Interbold'],
        InterSemi: ['Intersemi']
      },
      colors:{
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
}