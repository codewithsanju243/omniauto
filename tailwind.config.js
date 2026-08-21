/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#0a0d14',
          card: '#121722',
          cardHover: '#181f2d',
          glass: 'rgba(18, 23, 34, 0.85)',
          sheet: '#0e131d'
        },
        brand: {
          yellow: '#f5a623',
          gold: '#fbb034',
          amber: '#d97706',
          glow: '#ff9800',
          yellowLight: '#fed7aa',
          yellowDark: '#c27803'
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          850: '#151d2c',
          900: '#0f172a',
          950: '#090d16'
        },
        sos: {
          red: '#ef4444',
          crimson: '#dc2626'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        'glow-gold': '0 0 25px rgba(245, 166, 35, 0.35)',
        'glow-gold-lg': '0 0 45px rgba(245, 166, 35, 0.45)',
        'glow-red': '0 0 25px rgba(239, 68, 68, 0.45)',
        'card-dark': '0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
        'card-elevated': '0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 2px 1px rgba(245, 166, 35, 0.15)',
        'inner-glow': 'inset 0 1px 1px rgba(255, 255, 255, 0.1)'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInCar: {
          '0%': { opacity: '0', transform: 'translateY(25px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
        },
        floatBell: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-4px) rotate(-6deg)' },
          '75%': { transform: 'translateY(-2px) rotate(6deg)' }
        },
        radarSweep: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' }
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'car-transition': 'slideInCar 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'float-bell': 'floatBell 3s infinite ease-in-out',
        'radar': 'radarSweep 2s infinite cubic-bezier(0, 0.2, 0.8, 1)'
      }
    },
  },
  plugins: [],
}
