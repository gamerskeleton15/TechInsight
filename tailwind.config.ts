import { type Config } from 'tailwindcss';

/**
 * TechInsight design system.
 *
 * This file is the SINGLE source of truth for the theme. Every color used by
 * the UI is defined here as a named token; `src/app/globals.css` aliases its
 * raw CSS variables to these tokens, so a one-line change here re-themes the
 * whole site.
 *
 * Palette (dark editorial): warm paper-on-ink feel, amber accent.
 *   - 60% background  #0A0E1A  deep ink
 *   - 30% surface     #131A2B  raised panels
 *   - 10% accent      #B45309  amber-700 (5.9:1 on white, 11.1:1 on bg — passes AA)
 *   - text            #E8ECF1  /  #8892A8 muted
 *   - border          #232C42  hairline
 */
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        // 60% — page background
        background: '#0A0E1A',
        // 30% — raised panels, cards, nav, footer
        surface: '#131A2B',
        // primary + secondary text
        foreground: '#E8ECF1',
        muted: '#8892A8',
        // 10% — accent (amber) and its soft tint
        accent: '#B45309',
        'accent-soft': 'rgba(180, 83, 9, 0.12)',
        // success states
        success: '#4ADE80',
        'success-soft': 'rgba(74, 222, 128, 0.12)',
        // hairline borders
        border: '#232C42',
        // code blocks: darker than surface, distinct border
        'code-bg': '#060912',
        'code-fg': '#E8ECF1',
        'code-border': '#232C42',
      },
      fontFamily: {
        // Inter for UI text (loaded via next/font in layout.tsx)
        sans: ['Inter', 'sans-serif'],
        // JetBrains Mono for code (loaded via next/font in layout.tsx)
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '1px': '0.25rem',
      },
      borderRadius: {
        xl: '0.75rem',
      },
      transitionDuration: {
        DEFAULT: '150ms',
        '75ms': '75ms',
        '300ms': '300ms',
      },
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        loose: '1.75',
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;