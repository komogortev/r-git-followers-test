/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Lato', ...defaultTheme.fontFamily.sans],
        body: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}