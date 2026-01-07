
import type { Config } from 'tailwindcss'
import tokens from './lib/tokens'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './index.html',
    './App.tsx',
  ],
  theme: {
    extend: {
      // Colors from design system
      colors: tokens.colors,
      
      // Typography system
      fontFamily: {
        display: ['Burma Court Playgroup', 'cursive'], // Local font first, then fallback
        body: ['Geist', 'sans-serif'],
        sans: ['Geist', 'sans-serif'],
      },
      fontSize: {
        '12': [tokens.typography.fontSize[12].size, tokens.typography.fontSize[12].lineHeight],
        '14': [tokens.typography.fontSize[14].size, tokens.typography.fontSize[14].lineHeight],
        '16': [tokens.typography.fontSize[16].size, tokens.typography.fontSize[16].lineHeight],
        '18': [tokens.typography.fontSize[18].size, tokens.typography.fontSize[18].lineHeight],
        '20': [tokens.typography.fontSize[20].size, tokens.typography.fontSize[20].lineHeight],
        '24': [tokens.typography.fontSize[24].size, tokens.typography.fontSize[24].lineHeight],
        '30': [tokens.typography.fontSize[30].size, tokens.typography.fontSize[30].lineHeight],
        '32': [tokens.typography.fontSize[32].size, tokens.typography.fontSize[32].lineHeight],
        '36': [tokens.typography.fontSize[36].size, tokens.typography.fontSize[36].lineHeight],
        '48': [tokens.typography.fontSize[48].size, tokens.typography.fontSize[48].lineHeight],
        '64': [tokens.typography.fontSize[64].size, tokens.typography.fontSize[64].lineHeight],
      },
      fontWeight: {
        light: tokens.typography.fontWeight.light.toString(),
        regular: tokens.typography.fontWeight.regular.toString(),
        medium: tokens.typography.fontWeight.medium.toString(),
        semibold: tokens.typography.fontWeight.semibold.toString(),
        bold: tokens.typography.fontWeight.bold.toString(),
      },
      lineHeight: {
        '21': '21px',
        '26': '26px',
        '31': '31px',
        '38': '38px',
        '40': '40px',
        '47': '47px',
      },
      
      // Spacing system
      spacing: {
        ...tokens.spacing,
        // Grid-specific spacing
        'grid-margin-desktop': tokens.grid.desktop.margin,
        'grid-margin-tablet': tokens.grid.tablet.margin,
        'grid-margin-mobile': tokens.grid.mobile.margin,
        'grid-gutter-keyinfo': tokens.grid.keyInfo.gutter,
        // Section padding
        'section': '64px', // Standard section padding
        'section-mobile': '32px', // Mobile section padding
        // Navigation positioning
        'nav-left': '80px', // Left navigation link position
        'nav-right': '80px', // Right navigation CTA position
        'nav-right-link': '202px', // Right navigation link position
        // Navigation padding
        'nav-padding-vertical': '16px', // Navigation top/bottom padding
      },
      
      // Border radius system
      borderRadius: tokens.borderRadius,
      
      // Box shadows
      boxShadow: tokens.shadows,
      
      // Breakpoints
      screens: {
        sm: tokens.breakpoints.sm,
        md: tokens.breakpoints.md,
        lg: tokens.breakpoints.lg,
        xl: tokens.breakpoints.xl,
        '2xl': tokens.breakpoints['2xl'],
      },
      
      // Grid system and container
      maxWidth: {
        'container': tokens.grid.desktop.maxWidth,
        'hero': '600px', // For hero description text
        'navigation': tokens.grid.desktop.maxWidth,
      },
      
      // Component-specific sizing from design system
      width: {
        'testimonial': '524px', // Testimonial card width
        'navigation-cta': '122px', // Navigation CTA button width
        'avatar': '40px', // Avatar width
        'logo-nav': '32px', // Navigation logo width
        'logo-footer': '48px', // Footer logo width
      },
      
      height: {
        'testimonial': '339px', // Testimonial card height
        'navigation': '128px', // Desktop navigation height (96px + 32px padding)
        'navigation-tablet': '96px', // Tablet navigation height (64px + 32px padding)  
        'navigation-mobile': '72px', // Mobile navigation height (40px + 32px padding)
        'navigation-cta': '43px', // Navigation CTA button height
        'input': '48px', // Input field height
        'avatar': '48px', // Avatar height
        'logo-nav': '48px', // Navigation logo height
        'logo-footer': '72px', // Footer logo height
      },
      
      // Grid template columns for specific layouts
      gridTemplateColumns: {
        'key-info': 'repeat(4, 1fr)', // Key Info 4-column grid
        'key-info-special': 'repeat(3, 1fr)', // Key Info special 3-column
        'find-us': '2fr 1fr', // Find Us section layout
        'testimonial': 'repeat(auto-fit, minmax(524px, 1fr))', // Testimonial grid
      },
      
      // Animation and transitions
      transitionDuration: {
        'fast': '0.15s',
        'normal': '0.2s',
        'slow': '0.3s',
      },
      
      // Transform utilities for the 2-degree rotation brand element
      rotate: {
        '2': '2deg',
        '-2': '-2deg',
      },
      
      // Gap sizes for Key Info special grid
      gap: {
        'key-info': '180px', // Special Key Info grid gap
      },
    },
  },
  plugins: [
    // Add any additional Tailwind plugins here
    // Example: require('@tailwindcss/forms'),
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Container utility matching design system
        '.container-bcp': {
          maxWidth: theme('maxWidth.container'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.grid-margin-mobile'),
          paddingRight: theme('spacing.grid-margin-mobile'),
          '@screen md': {
            paddingLeft: theme('spacing.grid-margin-tablet'),
            paddingRight: theme('spacing.grid-margin-tablet'),
          },
          '@screen lg': {
            paddingLeft: theme('spacing.grid-margin-desktop'),
            paddingRight: theme('spacing.grid-margin-desktop'),
          },
        },
        // Key Info special grid
        '.key-info-grid': {
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: theme('spacing.8'),
          '@screen md': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@screen lg': {
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: theme('gap.key-info'),
          },
        },
        // Testimonial grid with horizontal scroll
        '.testimonial-grid': {
          display: 'grid',
          gridTemplateColumns: theme('gridTemplateColumns.testimonial'),
          gap: theme('spacing.6'),
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          '@screen max-lg': {
            display: 'flex',
            overflowX: 'scroll',
            scrollSnapType: 'x mandatory',
            '& > *': {
              scrollSnapAlign: 'start',
              flexShrink: 0,
            },
          },
        },
        // Brand rotation utility
        '.brand-rotation': {
          transform: 'rotate(2deg)',
        },
        // Navigation specific positioning and sizing
        '.nav-center-logo': {
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        },
        '.nav-left-link': {
          position: 'absolute',
          left: theme('spacing.nav-left'),
          top: '50%',
          transform: 'translateY(-50%)',
        },
        '.nav-right-link': {
          position: 'absolute',
          right: theme('spacing.nav-right-link'),
          top: '50%',
          transform: 'translateY(-50%)',
        },
        '.nav-right-cta': {
          position: 'absolute',
          right: theme('spacing.nav-right'),
          top: '50%',
          transform: 'translateY(-50%)',
        },
        // Navigation responsive heights with padding
        '.navigation-desktop': {
          height: theme('height.navigation'),
          paddingTop: theme('spacing.nav-padding-vertical'),
          paddingBottom: theme('spacing.nav-padding-vertical'),
        },
        '.navigation-tablet': {
          height: theme('height.navigation-tablet'),
          paddingTop: theme('spacing.nav-padding-vertical'),
          paddingBottom: theme('spacing.nav-padding-vertical'),
        },
        '.navigation-mobile': {
          height: theme('height.navigation-mobile'),
          paddingTop: theme('spacing.nav-padding-vertical'),
          paddingBottom: theme('spacing.nav-padding-vertical'),
        },
        // Responsive testimonial card widths following Grid component system
        '.testimonial-card-grid-responsive': {
          // Mobile: 3/4 of grid (px-6 = 24px each side = 48px total)
          width: 'calc((100vw - 48px) / 4 * 3)',
          '@screen md': {
            // Tablet: 3/8 of grid (px-12 = 48px each side = 96px total)
            width: 'calc((100vw - 96px) / 8 * 3)',
          },
          '@screen lg': {
            // Desktop: 5/12 of grid (px-20 = 80px each side = 160px total, max 1440px)
            width: 'min(calc((100vw - 160px) / 12 * 5), calc((1440px - 160px) / 12 * 5))',
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

export default config
