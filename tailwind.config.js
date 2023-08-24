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
        primary: "#5B6BDF",
        "primary-text": "#131217",
        "secondary-text": "#6D6C6F",
        "primary-white": "#FFFEF8",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary":
          "linear-gradient(95.87deg, #AAEDFD 0%, #C296FF 51.04%, #FF9A9A 100%)",
      },
      fontFamily: {
        sans: ["Suisse Intl", ...defaultTheme.fontFamily.sans],
        explain: ["Manrope", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        "inset-tr": "inset 1px -1px 1px #1312173D, inset -1px 1px 1px #131217",
        "inset-tl": "inset -1px -1px 1px #1312173D, inset 1px 1px 1px #131217",
        "inset-br": "inset 1px 1px 1px #1312173D, inset -1px -1px 1px #131217",
        "inset-bl": "inset -1px 1px 1px #1312173D, inset 1px -1px 1px #131217",
        "inset-tr-bl": "inset 1px -1px 1px #131217, inset -1px 1px 1px #131217",
        "inset-tl-br": "inset 1px 1px 1px #131217, inset -1px -1px 1px #131217",
      },
    },
  },
  plugins: [],
};
