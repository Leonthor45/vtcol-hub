import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0b1120',
        surface: '#111827',
        surfaceSoft: '#17203a',
        accent: '#7c3aed',
        accentSoft: '#a78bfa',
        border: 'rgba(148, 163, 184, 0.24)',
      },
      boxShadow: {
        soft: '0 20px 45px rgba(15, 23, 42, 0.25)',
        glow: '0 0 0 1px rgba(124, 58, 237, 0.08), 0 24px 80px rgba(124, 58, 237, 0.16)',
      },
    },
  },
  plugins: [],
};

export default config;
