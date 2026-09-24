/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // The Canvas: Charcoal-obsidian with a cold slate-blue cast
        void: {
          DEFAULT: '#050608',
          deep: '#030406',
          slate: '#080A10',
          surface: '#0B0D14',
        },
        // X-Ray Glass Petals: Translucent frosted silver-cyan (#D8ECF8)
        xray: {
          DEFAULT: '#D8ECF8',
          petals: '#D8ECF8',
          translucent: 'rgba(216, 236, 248, 0.25)',
          vein: '#C5E4F8',
          border: 'rgba(216, 236, 248, 0.16)',
          faint: 'rgba(216, 236, 248, 0.06)',
          glow: 'rgba(103, 232, 249, 0.25)',
        },
        // The Living Core: Molten Amber Flame (#FF5500 / #FFAA00)
        amber: {
          flame: '#FF5500',
          molten: '#FFAA00',
          gold: '#FFB800',
          glow: 'rgba(255, 85, 0, 0.45)',
        },
        // Klein Blue Caustics (#002FA7)
        klein: {
          DEFAULT: '#002FA7',
          bright: '#0044FF',
          dark: '#001A66',
          glow: 'rgba(0, 47, 167, 0.35)',
        },
        // Forensic Annotation Tint (#94A3B8 / #67E8F9)
        forensic: {
          slate: '#94A3B8',
          cyan: '#67E8F9',
          faint: 'rgba(103, 232, 249, 0.16)',
          line: 'rgba(148, 163, 184, 0.22)',
        },
      },
      fontFamily: {
        // Identity Display: Switella / Ogg Roman with Bodoni Moda & Instrument Serif
        display: [
          '"Switella"',
          '"Ogg"',
          '"Bodoni Moda"',
          '"Instrument Serif"',
          '"Cormorant Garamond"',
          'Georgia',
          'serif',
        ],
        serif: [
          '"Switella"',
          '"Ogg"',
          '"Bodoni Moda"',
          '"Instrument Serif"',
          '"Cormorant Garamond"',
          'Georgia',
          'serif',
        ],
        // System Labels & HUD Pins: JetBrains Mono / Space Mono
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
        // Narrative & Case Studies: Plus Jakarta Sans
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        syne: ['"Syne"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};