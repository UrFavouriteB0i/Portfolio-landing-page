/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Montblack: ['MontserratBlk'],
        Afacad: ['Afacad'],
        IBM: ['IBM'],
        InterReg: ['Interreg'],
        InterMed: ['Intermed'],
        InterBld: ['Interbold'],
        InterSemi: ['Intersemi']
      }
    },
  },
  plugins: [],
}