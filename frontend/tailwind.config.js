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