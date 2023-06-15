const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-red": "#FF9A9A",
        "main-purple": "#C296FF",
        "main-blue": "#AAEDFD",
        "main-yellow": "#ECE693",
        "primary-text": "#0B0C13",
        "secondary-text": "#9092A0",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary":
          "linear-gradient(95.87deg, #AAEDFD 0%, #C296FF 51.04%, #FF9A9A 100%)",
      },
      fontFamily: {
        sans: ["Manrope", ...defaultTheme.fontFamily.sans],
        display: ["Suisse Intl", ...defaultTheme.fontFamily.sans,],
      },
      boxShadow: {
        "inset-tr": "inset 1px -1px 1px #0B0C133D, inset -1px 1px 1px #0B0C13",
        "inset-tl": "inset -1px -1px 1px #0B0C133D, inset 1px 1px 1px #0B0C13",
        "inset-br": "inset 1px 1px 1px #0B0C133D, inset -1px -1px 1px #0B0C13",
        "inset-bl": "inset -1px 1px 1px #0B0C133D, inset 1px -1px 1px #0B0C13",
        "inset-tr-bl": "inset 1px -1px 1px #0B0C13, inset -1px 1px 1px #0B0C13",
        "inset-tl-br": "inset 1px 1px 1px #0B0C13, inset -1px -1px 1px #0B0C13",
      },
    },
  },
  plugins: [],
};
