import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FFFEF7',
          100: '#FFF9E6',
          200: '#FFF0C0',
          300: '#FFE799',
          400: '#FFD54D',
          500: '#D4AF37',
          600: '#B8942E',
          700: '#9C7926',
          800: '#805E1D',
          900: '#664315',
        },
        luxury: {
          black: '#0A0A0A',
          charcoal: '#1A1A1A',
          gray: '#2A2A2A',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
