/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat, sans-serif"],
        mono: ["IBM Plex, Mono, monospace"],
      },
      height: {
        128: "32rem",
        140: "34rem",
        148: "38rem",
      },
      width: {
        152: "50rem",
      },
      backgroundImage: {
        myBg: "url('https://i.imgur.com/Yah1mvH.jpg')",
      },
    },
  },
  plugins: [],
};
