/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'retro-black': '#121212',
        'retro-blue': '#00b4d8',
        'retro-pink': '#ff0080',
        'retro-purple': '#9900ff',
        'retro-green': '#00ff95',
        // Vintage nostalgic colors
        'vintage-orange': '#ff6600',
        'vintage-brown': '#8b4513',
        'vintage-cream': '#f5e6d3',
        'vintage-gold': '#d4a574',
        'vintage-rust': '#cc6600',
        // Old-school retro colors
        'sepia': 'var(--color-sepia)',
        'neon-cyan': 'var(--color-neon-cyan)',
        'neon-gold': 'var(--color-neon-gold)',
        'neon-pink': 'var(--color-neon-pink)',
        'neon-green': 'var(--color-neon-green)',
        'bg-dark': 'var(--color-bg-dark)',
        'bg-darker': 'var(--color-bg-darker)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
      },
      fontFamily: {
        'retro': ['VT323', 'monospace'],
        'future': ['Orbitron', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'scan': 'scan 2s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'vintage-glow': 'vintage-glow 2s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-5px, 5px)' },
          '40%': { transform: 'translate(-5px, -5px)' },
          '60%': { transform: 'translate(5px, 5px)' },
          '80%': { transform: 'translate(5px, -5px)' },
        },
        scan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        flicker: {
          '0%': { opacity: '0.98' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.98' },
        },
        'vintage-glow': {
          '0%, 100%': { textShadow: '0 0 5px currentColor' },
          '50%': { textShadow: '0 0 8px currentColor, 0 0 12px currentColor' },
        },
      },
    },
  },
  plugins: [],
};