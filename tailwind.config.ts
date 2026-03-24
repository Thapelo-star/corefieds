import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#edfaf3',
          100: '#d4f5e6',
          200: '#a7eacb',
          300: '#2ecc80',
          400: '#22a063',
          500: '#1a7a4a',
          600: '#0f5c35',
          700: '#0a3d24',
        },
        charcoal: '#111714',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(26,122,74,0.08)',
        'card-hover': '0 8px 32px rgba(26,122,74,0.16)',
        'green': '0 8px 24px rgba(26,122,74,0.30)',
      },
    },
  },
  plugins: [],
}
export default config
