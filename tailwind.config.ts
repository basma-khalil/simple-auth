/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        mainFontFamily: ['Poppins', 'Almarai', 'sans-serif'],
      },
      colors: {
        mainFont: '#333',
        main: '#4481eb',
        minor: '#5995fd',
        gradient: '#04befe',
      },
      backgroundImage: {
        'gradient-45':
          'linear-gradient(-45deg, var(--tw-gradient-from)0%, var(--tw-gradient-to)100%)',
        'user': "url('../images/user.svg')",
        'email': "url('../images/envelope.svg')",
        'password': "url('../images/lock.svg')",
        'exclamation': "url('../images/exclamation.svg')",
      },
    },
  },
  plugins: [],
};
