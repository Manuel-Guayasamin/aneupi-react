const plugin = require("tailwindcss/plugin");
const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/button.js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    // or you can use a glob pattern (multiple component styles)
    "./node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        colores: "#004564",
        colorcito: "#00335F",
        academia: "#004564",
        colorcitoleceni1: "#004563",
        colorcitoleceni2: "#EB6608",
        colorcitoamarillo: "#EAB308",
        colorcarruselAcademia: "#2a2a2a",
        colorCoop: "#25466a", //Color de la Cooperativa
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
      },
      transitionProperty: {
        w: "width",
      },
      keyframes: {
        anim: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "anim 2s ease-in-out",
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "corporate"],
  },
  plugins: [
    nextui(),
    require("daisyui"),
    require("@tailwindcss/typography"),
    plugin(function({ addVariant }) {
      addVariant("current", "&.active");
    }),
  ],
};
