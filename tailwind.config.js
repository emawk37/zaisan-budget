/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          900: '#0A0A0A',
          800: '#171717',
          700: '#262626',
        },
        terminal: {
          text: '#E5E5E5',
          dim: '#A3A3A3',
          muted: '#737373',
          green: '#00FF41',
          alert: '#FF3333',
        },
        emerald: {
          night: '#064E3B', 
        },
        amber: {
          horizon: '#D97706',
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace', 'Consolas'],
      },
      boxShadow: {
        'terminal-glow': '0 0 10px rgba(0, 255, 65, 0.2)',
      }
    },
  },
  plugins: [],
}