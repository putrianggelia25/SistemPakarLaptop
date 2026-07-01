export default {
  content: ['./src/**/*.{html,js,svelte}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: '#172033',
        muted: '#64748b',
        brand: '#0f766e',
        copper: '#b45309'
      },
      boxShadow: {
        soft: '0 18px 45px rgba(15, 23, 42, 0.08)',
        glow: '0 0 20px rgba(15, 118, 110, 0.15)',
        'glow-lg': '0 0 40px rgba(15, 118, 110, 0.2)'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'slide-left': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'count-up': {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.8)' },
          '60%': { transform: 'translateY(-2px) scale(1.05)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
        },
        'bar-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        pulse_soft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-down': 'fade-down 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.5s ease both',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-left': 'slide-left 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-right': 'slide-right 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'count-up': 'count-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'bar-grow': 'bar-grow 1s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 2s linear infinite',
        float: 'float 3s ease-in-out infinite',
        pulse_soft: 'pulse_soft 2s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
