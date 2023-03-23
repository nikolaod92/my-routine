/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '6rem',
        '2xl': '9rem',
      },
    },
  },

  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#2296EE',
          secondary: '#F000B8',
          accent: '#37CDBE',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          'base-200': '#f6f6f6',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
          '--rounded-box': '0.5rem', // border radius rounded-box utility class, used in card and other large boxes
          '--rounded-btn': '0.25rem',
        },
      },
    ],
  },
}
