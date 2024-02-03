/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/views/**/*.{html,js,ts}"],
  theme: {
    extend: {
      fontFamily: {
        mainFontFamily: ["Poppins", "Almarai", "sans-serif"],
      },
      colors: {
        mainFont: "#333",
        main: "#4481eb",
        minor: "#5995fd",
        gradient: "#04befe",
      },
      backgroundImage: {
        "gradient-45":
          "linear-gradient(-45deg, var(--tw-gradient-from)0%, var(--tw-gradient-from)100%)",
      },
    },
  },
  plugins: [],
};
