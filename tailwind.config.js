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
        soft: '0 18px 45px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};
