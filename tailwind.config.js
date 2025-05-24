module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spiritual: {
          light: '#f0e5d8',
          DEFAULT: '#d9c6b2',
          dark: '#b29a7a',
        },
        mystical: {
          light: '#e0c3f0',
          DEFAULT: '#b59cd9',
          dark: '#8b6bbf',
        },
      },
      fontFamily: {
        'serif': ['"Garamond"', 'serif'],
        'sans': ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}