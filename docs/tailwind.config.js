/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './.vitepress/**/*.{vue,js,ts,jsx,tsx}',
    './**/*.md',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--vp-c-brand)',
          light: 'var(--vp-c-brand-light)',
          dark: 'var(--vp-c-brand-dark)',
        },
      },
    },
  },
  plugins: [],
}
