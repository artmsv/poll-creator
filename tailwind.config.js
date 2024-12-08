/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#27A98B',
        secondary: '#000000',
        tertiary: '#F2EEEE',
        quaternary: '#E15241',
      },
    },
  },
  plugins: [],
};
