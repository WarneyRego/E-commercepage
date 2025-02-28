/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-bg': '#f8f7f4',
        'light-text': '#1a1a1a',
        'light-accent': '#f59e0b',
        'light-primary': '#f8f7f4',
        'light-secondary': '#f5f2ed',
        'light-border': '#e5e5e5',
        
        'dark-bg': '#0a0a0a',
        'dark-text': '#FFFFFF',
        'dark-accent': '#E53E3E',
        'dark-primary': '#0a0a0a',
        'dark-secondary': '#121212',
        'dark-border': '#1a1a1a',
      },
      animation: {
        'slide-in': 'slideIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 4s ease-in-out infinite',
        'glow-reverse': 'glowReverse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        glow: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '50%': { transform: 'translateX(100%)', opacity: 0.5 },
          '100%': { transform: 'translateX(100%)', opacity: 0 }
        },
        glowReverse: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '50%': { transform: 'translateX(-100%)', opacity: 0.5 },
          '100%': { transform: 'translateX(-100%)', opacity: 0 }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'hover': '0 10px 25px rgba(0, 0, 0, 0.1)'
      }
    }
  },
  plugins: []
};