/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fairy: {
          50: '#fdf4f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        twilight: {
          800: '#231038',
          900: '#160826',
          950: '#0c0416',
        },
        lavender: {
          50: '#f8f6fc',
          100: '#f0ecf9',
          200: '#e4dcf4',
          300: '#d0c0ec',
          400: '#b49be0',
          500: '#9875d4',
          600: '#7f54c4',
          700: '#693ea8',
          800: '#543286',
          900: '#432a68',
        },
        gold: {
          glow: '#ffd875',
          sparkle: '#ffeaa7',
          deep: '#d4af37',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-pink': '0 0 25px rgba(244, 114, 182, 0.45)',
        'glow-gold': '0 0 30px rgba(255, 216, 117, 0.5)',
        'glow-purple': '0 0 35px rgba(152, 117, 212, 0.35)',
        'glass': '0 8px 32px 0 rgba(31, 10, 52, 0.37)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(244, 114, 182, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(255, 216, 117, 0.8))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}

