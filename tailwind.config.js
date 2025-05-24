export const content = [
  './src/**/*.{js,jsx,ts,tsx}',
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}'
]
export const theme = {
  extend: {
    colors: {
      spiritual: {
        light: '#f0e5d8',
        DEFAULT: '#d9c6b2',
        dark: '#b29a7a'
      },
      mystical: {
        light: '#e0c3f0',
        DEFAULT: '#b59cd9',
        dark: '#8b6bbf',
        purple: '#667eea',
        violet: '#764ba2',
        gold: '#ffd700',
        bronze: '#8b4513'
      }
    },
    fontFamily: {
      serif: ['"Garamond"', 'serif'],
      sans: ['"Open Sans"', 'sans-serif'],
      mystical: ['Cinzel', 'serif'],
      spiritual: ['Crimson Text', 'serif']
    },
    animation: {
      glow: 'glow 2s ease-in-out infinite alternate',
      starfield: 'starfield 20s linear infinite'
    },
    backdropBlur: {
      xs: '2px'
    }
  }
}
export const plugins = []
