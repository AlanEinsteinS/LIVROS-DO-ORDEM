/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        abyss: '#050505',
        ink: '#0a0a0a',
        blood: {
          300: '#f87171',
          400: '#ef4444',
          500: '#dc2626',
          700: '#991b1b'
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(239,68,68,.15), 0 12px 40px rgba(220,38,38,.25)',
        panel: '0 8px 30px rgba(0,0,0,.6)',
        ambient: '0 20px 65px rgba(0,0,0,.6)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '.35' },
          '50%': { opacity: '.7' }
        },
        rotateBorder: {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-120%) skewX(-12deg)' },
          '100%': { transform: 'translateX(220%) skewX(-12deg)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseSoft: 'pulseSoft 6s ease-in-out infinite',
        rotateBorder: 'rotateBorder 8s linear infinite',
        shimmer: 'shimmer 2.8s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
