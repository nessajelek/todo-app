/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', 
  theme: {
    extend: {
      fontFamily: {
        josefin: ['Josefin Sans'],
      },
      colors: {
        bBlue: '#3a7bfd',
        vlgBlue: '#e4e5f1',
        lgBlue: '#d2d3db',
        dgBlue: '#9394a5',
        vdgBlue: '#484b6a',
        DvdBlue: '#161722',
        DvddBlue: '#25273c',
        DlgBlue: '#cacde8',
        DlgBlueH: '#e4e5f1',
        DdgBlue: '#777a92',
        DvdgBlue: '#4d5066',
        DvdgBlue2: '#393a4c',
      },
    },
  },
  plugins: [],
};
