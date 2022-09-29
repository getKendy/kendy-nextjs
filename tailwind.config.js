/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('@tailwindcss/line-clamp'),
    require('daisyui'),
    'tailwindcss',
    'autoprefixer',
  ],
  daisyui: {
    styled: true,
    themes: ['garden', 'luxury'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'luxury',
  },
};
