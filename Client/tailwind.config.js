export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0f1123',
          800: '#161929',
        },
        card: '#1e2235',
        accent: {
          blue: '#5b6ef5',
          purple: '#7c3aed',
        }
      }
    },
  },
  plugins: [],
};