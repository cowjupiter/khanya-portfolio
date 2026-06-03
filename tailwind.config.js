/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', 'Inter', 'sans-serif'],
      },
      colors: {
        main: 'var(--bg-main)',
        textMain: 'var(--text-main)',
        inverted: 'var(--bg-inverted)',
        textInverted: 'var(--text-inverted)',
        borderLight: 'var(--border-light)'
      }
    },
  },
  plugins: [],
}
