/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    '../../node_modules/flowbite-react/lib/**/*.js',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orangee: '#ff4c00',
        darkgrey: '#373635',
        lightbrown: '#d6c5bc',
        milk: '#faf5f0',
        lightorange: '#ff8b02',
        greenn: '#4c5f05',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
