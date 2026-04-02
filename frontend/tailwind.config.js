/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0B0F1A',
          purple: '#7C3AED',
          blue: '#06B6D4',
          neon: '#22C55E',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Sora', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 20px 60px rgba(6, 12, 30, 0.4)',
      },
      backgroundImage: {
        'premium-gradient':
          'radial-gradient(circle at 10% 20%, rgba(124,58,237,0.24), transparent 32%), radial-gradient(circle at 85% 35%, rgba(6,182,212,0.2), transparent 34%), radial-gradient(circle at 55% 85%, rgba(34,197,94,0.16), transparent 28%)',
      },
    },
  },
  plugins: [],
}
