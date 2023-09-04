/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
      body:['Kablammo', 'cursive'],
      test : ['Bungee', 'cursive'],
      forname : ['Rammetto One', 'cursive'],
      forgame:['Neucha', 'cursive'],
      username:['Chonburi', "cursive"]
     , poppins:['Poppins', 'sans-serif']
      } ,
      backgroundImage: {
        hero: "url('/pic.jpeg')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    },
  },
  plugins: [],
}