/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef5ff',
          100: '#d9e9ff',
          200: '#bcd7ff',
          300: '#8cbdff',
          400: '#589aff',
          500: '#4285F4', // Primary blue
          600: '#1a56db',
          700: '#1e429f',
          800: '#1e3a8a',
          900: '#1e3a76',
        },
        success: {
          500: '#34A853', // Success green
        },
        warning: {
          500: '#FBBC05', // Warning yellow
        },
        error: {
          500: '#EA4335', // Error red
        },
        dark: {
          100: '#1E293B',
          200: '#1A1F2B',
          300: '#111827',
          400: '#0F172A',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}