/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0a0a0a',
          secondary: '#111111',
          card: '#1a1a1a',
        },
        text: {
          primary: '#e5e5e5',
          secondary: '#a3a3a3',
          accent: '#737373',
        },
        border: '#262626',
        accent: {
          blue: '#3b82f6',
          hover: '#525252',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        serif: ['Source Serif Pro', 'serif'],
      },
    },
  },
  plugins: [],
}