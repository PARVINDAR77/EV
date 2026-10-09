/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050708',
        secondary: '#0B0F12',
        tertiary: '#11171B',
        brand: '#00FF00',
        brandDark: '#00C800',
        accent: '#00FF00',
        textMain: '#F3F4F6',
        textMuted: '#9CA3AF'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
