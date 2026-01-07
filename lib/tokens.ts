// Design tokens from Burma Court Playgroup Design System
export const tokens = {
  colors: {
    primary: {
      50: '#FEF2EE',
      100: '#FDE0D7',
      200: '#FBCEA9',
      300: '#F9A481',
      500: '#F65627', // Main Orange - CTAs, links, emphasis
      600: '#D6451A',
      700: '#B02E07',
      900: '#7A220B',
    },
    secondary: {
      50: '#F1F6F2',
      100: '#DEEAE1',
      200: '#C2D8C8',
      500: '#78A681', // Green section color
      600: '#496F51',
      700: '#496F51',
      900: '#2C4231',
    },
    accent: {
      500: '#F6BE28', // Yellow accent for illustrations
      600: '#DDA310',
      red: '#6B1C18', // Dark red for Ages illustration
    },
    neutral: {
      50: '#FFFFFF',
      100: '#F7F7F6',
      200: '#EDEBE8', // Main background
      300: '#DFDCD8',
      400: '#D0CBC5', // Navigation background
      500: '#888681',
      600: '#45403B', // Body text
      700: '#4A4A4A',
      800: '#282522', // Headings
      900: '#1A1A1A',
    },
    semantic: {
      success: '#76A681',
      warning: '#F8BC24',
      error: '#EF4444',
      info: '#3B82F6',
    },
  },
  spacing: {
    1: '4px',    // 0.25rem - Tiny spacing
    2: '8px',    // 0.5rem - Extra small
    3: '12px',   // 0.75rem - Small
    4: '16px',   // 1rem - Medium
    5: '20px',   // 1.25rem - Medium-large
    6: '24px',   // 1.5rem - Large
    8: '32px',   // 2rem - Extra large
    12: '48px',  // 3rem - 2X large
    16: '64px',  // 4rem - 3X large
    20: '80px',  // 5rem - Grid margins
  },
  borderRadius: {
    xs: '2px',    // Checkboxes, small UI
    sm: '4px',    // Buttons, inputs, badges
    md: '8px',    // Cards, testimonials
    lg: '12px',   // Large cards
    xl: '24px',   // Extra large elements
    full: '9999px', // Pills, toggles, circles
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
  typography: {
    fontFamily: {
      display: "'Burma Court Playgroup', cursive", // Custom handwritten font (local)
      body: "'Geist', sans-serif", // Clean modern font
    },
    fontSize: {
      12: { size: '12px', lineHeight: '21px' }, // Captions, small labels
      14: { size: '14px', lineHeight: '21px' }, // Small body text
      16: { size: '16px', lineHeight: '21px' }, // Body text, navigation
      18: { size: '18px', lineHeight: '26px' }, // Large body text
      20: { size: '20px', lineHeight: '26px' }, // Buttons, emphasized text
      24: { size: '24px', lineHeight: '31px' }, // Small headings (h4)
      30: { size: '30px', lineHeight: '38px' }, // Medium headings (h3)
      32: { size: '32px', lineHeight: '38px' }, // Large headings (h2)
      36: { size: '36px', lineHeight: '47px' }, // Section headings
      48: { size: '48px', lineHeight: '47px' }, // Hero headings (h1)
      64: { size: '64px', lineHeight: '38px' }, // Large page headings
    },
    fontWeight: {
      light: 300,    // Light text, subtle emphasis
      regular: 400,  // Body text, default weight
      medium: 500,   // Buttons, emphasized text, navigation
      semibold: 600, // Subheadings, labels
      bold: 700,     // Strong emphasis, headings
    },
  },
  breakpoints: {
    sm: '640px',   // Small devices
    md: '768px',   // Tablets
    lg: '1024px',  // Desktops
    xl: '1280px',  // Large desktops
    '2xl': '1440px', // Max width for content
  },
  grid: {
    desktop: {
      maxWidth: '1440px',
      columns: 12,
      gutter: '16px',
      margin: '80px',
    },
    tablet: {
      columns: 8,
      gutter: '16px',
      margin: '48px',
    },
    mobile: {
      columns: 4,
      gutter: '16px',
      margin: '24px',
    },
    keyInfo: {
      columns: 3,
      gutter: '180px',
    },
    navigation: {
      desktop: {
        height: '128px',
        contentHeight: '96px',
        paddingVertical: '16px',
      },
      tablet: {
        height: '96px', 
        contentHeight: '64px',
        paddingVertical: '16px',
      },
      mobile: {
        height: '72px',
        contentHeight: '40px', 
        paddingVertical: '16px',
      },
    },
  },
};

// CSS Custom Properties for use in components
export const cssVariables = {
  // Colors
  '--primary-50': tokens.colors.primary[50],
  '--primary-100': tokens.colors.primary[100],
  '--primary-200': tokens.colors.primary[200],
  '--primary-300': tokens.colors.primary[300],
  '--primary-500': tokens.colors.primary[500],
  '--primary-600': tokens.colors.primary[600],
  '--primary-700': tokens.colors.primary[700],
  '--primary-900': tokens.colors.primary[900],
  
  '--secondary-50': tokens.colors.secondary[50],
  '--secondary-100': tokens.colors.secondary[100],
  '--secondary-200': tokens.colors.secondary[200],
  '--secondary-500': tokens.colors.secondary[500],
  '--secondary-600': tokens.colors.secondary[600],
  '--secondary-700': tokens.colors.secondary[700],
  '--secondary-900': tokens.colors.secondary[900],
  
  '--accent-500': tokens.colors.accent[500],
  '--accent-600': tokens.colors.accent[600],
  '--accent-red': tokens.colors.accent.red,
  
  '--neutral-50': tokens.colors.neutral[50],
  '--neutral-100': tokens.colors.neutral[100],
  '--neutral-200': tokens.colors.neutral[200],
  '--neutral-300': tokens.colors.neutral[300],
  '--neutral-400': tokens.colors.neutral[400],
  '--neutral-500': tokens.colors.neutral[500],
  '--neutral-600': tokens.colors.neutral[600],
  '--neutral-700': tokens.colors.neutral[700],
  '--neutral-800': tokens.colors.neutral[800],
  '--neutral-900': tokens.colors.neutral[900],
  
  '--semantic-success': tokens.colors.semantic.success,
  '--semantic-warning': tokens.colors.semantic.warning,
  '--semantic-error': tokens.colors.semantic.error,
  '--semantic-info': tokens.colors.semantic.info,
  
  // Typography
  '--font-display': tokens.typography.fontFamily.display,
  '--font-body': tokens.typography.fontFamily.body,
  
  // Spacing
  '--space-1': tokens.spacing[1],
  '--space-2': tokens.spacing[2],
  '--space-3': tokens.spacing[3],
  '--space-4': tokens.spacing[4],
  '--space-5': tokens.spacing[5],
  '--space-6': tokens.spacing[6],
  '--space-8': tokens.spacing[8],
  '--space-12': tokens.spacing[12],
  '--space-16': tokens.spacing[16],
  '--space-20': tokens.spacing[20],
  
  // Border Radius
  '--radius-xs': tokens.borderRadius.xs,
  '--radius-sm': tokens.borderRadius.sm,
  '--radius-md': tokens.borderRadius.md,
  '--radius-lg': tokens.borderRadius.lg,
  '--radius-xl': tokens.borderRadius.xl,
  '--radius-full': tokens.borderRadius.full,
};

// Helper function to inject CSS variables into document
export const injectCSSVariables = () => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    Object.entries(cssVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }
};

// Export for use in Tailwind config
export default tokens;