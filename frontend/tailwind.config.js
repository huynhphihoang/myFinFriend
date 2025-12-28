/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        sm: "1px 1px 2px rgba(0,0,0,0.25)",
        lg: "2px 2px 6px rgba(0,0,0,0.35)",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
       keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(15deg)" },
          "20%": { transform: "rotate(-15deg)" },
          "30%": { transform: "rotate(10deg)" },
          "40%": { transform: "rotate(-10deg)" },
          "50%": { transform: "rotate(5deg)" },
          "60%": { transform: "rotate(-5deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        ring: "ring 0.8s ease-in-out",
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({ textShadow: value }),
        },
        { values: theme('textShadow') }
      )
    }
  ],
}