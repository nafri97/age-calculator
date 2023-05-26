/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          Purple: 'hsl(259, 100%, 65%)',
          LightRed: 'hsl(0, 100%, 67%)',
          OffWhite: 'hsl(0, 0%, 94%)',
          LightGrey: 'hsl(0, 0%, 86%)',
          SmokeyGrey: 'hsl(0, 1%, 44%)',
          OffBlack: 'hsl(0, 0%, 8%)',
        },
        dark: {
          100: '#333',
          200: '#444',
          300: '#555'
        },
      },
  },
  plugins: [],
}

