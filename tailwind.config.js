import scrollbar from 'tailwind-scrollbar';
import scrollbarHide from 'tailwind-scrollbar-hide';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        magical: ['Cinzel', 'serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#10b981',
        secondary: '#8b5cf6',
        accent: '#f59e0b',
        dark: '#1f2937',
      },
    },
  },
  plugins: [
    scrollbarHide,
    scrollbar,
    typography,
  ],
};
