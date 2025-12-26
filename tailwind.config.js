/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",   // px-4
        sm: "1.25rem",      // px-5
        md: "1.5rem",       // px-6
        lg: "2rem",         // px-8
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",    // важно: контейнер шире, чем стандарт 1536
      },
    },
    extend: {
      fontFamily: {
        sans: ['GT Walsheim Medium', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        'gt-walsheim': ['GT Walsheim Medium', 'sans-serif'],
        'gt-walsheim-placeholder': ['GT Walsheim Medium Placeholder', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
          light: '#60a5fa',
          glow: '#3b82f6',
        },
        secondary: {
          DEFAULT: '#8b5cf6',
          dark: '#7c3aed',
          light: '#a78bfa',
          glow: '#8b5cf6',
        },
        accent: {
          DEFAULT: '#06b6d4',
          dark: '#0891b2',
          light: '#22d3ee',
        },
        orange: {
          DEFAULT: '#f97316',
          dark: '#ea580c',
          light: '#fb923c',
          glow: '#f97316',
        },
        metal: {
          DEFAULT: '#1e293b',
          light: '#334155',
          dark: '#0f172a',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-metal': 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)',
        'gradient-glow': 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.6)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.5)',
        'glow-purple-lg': '0 0 40px rgba(139, 92, 246, 0.6)',
        'glow-orange': '0 0 20px rgba(249, 115, 22, 0.5)',
        'glow-orange-lg': '0 0 40px rgba(249, 115, 22, 0.6)',
        'inner-glow': 'inset 0 0 20px rgba(59, 130, 246, 0.3)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

