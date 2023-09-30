/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'light-sand': '#FCF7E6',
      'black': '#000000',
      'white': '#ffffff',
      extend: {},
    },
      fontFamily: {
      sans: ['Space Grotesk', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    plugins: [],
  }
}
  