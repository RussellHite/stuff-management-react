export const tokens = {
  colors: {
    neutral: {
      100: '#faf9f7',
      200: '#f5f3f0',
      300: '#e4e4e4',
    },
    gray: {
      100: '#f0f4f3',
      500: '#adb5bd',
      600: '#868e96',
      900: '#383a3c',
    },
    primary: {
      300: '#c8e6c9',
      400: '#b9dabb',
      500: '#81c784',
      800: '#5a7c74',
    },
    accent: {
      500: '#095673',
    },
    info: {
      200: '#e8f4f8',
      500: '#5dade2',
    },
    danger: {
      200: '#ffebef',
      500: '#b40000',
    },
    warning: {
      200: '#fffeeb',
      500: '#d09900',
    },
    white: '#ffffff',
    black: '#000000',
  },
  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
    '4xl': 80,
    '5xl': 96,
    '6xl': 128,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 24,
    xl: 32,
  },
  fontFamily: {
    header: 'Besley',
    body: 'Montserrat',
    headerFallback: 'serif',
    bodyFallback: 'sans-serif',
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 100, // For pills
  },
  shadow: {
    search: {
      shadowColor: '#b8a4c1',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 2,
    },
  },
} as const;

// Semantic color mappings
export const semanticColors = {
  background: {
    primary: tokens.colors.white,
    secondary: tokens.colors.neutral[100],
    tertiary: tokens.colors.neutral[200],
    card: tokens.colors.white,
    header: tokens.colors.primary[300],
  },
  text: {
    primary: tokens.colors.gray[900],
    secondary: tokens.colors.gray[600],
    tertiary: tokens.colors.gray[500],
    accent: tokens.colors.accent[500],
    onAccent: tokens.colors.white,
    danger: tokens.colors.danger[500],
    warning: tokens.colors.warning[500],
  },
  button: {
    primary: tokens.colors.accent[500],
    secondary: tokens.colors.gray[100],
    danger: tokens.colors.danger[500],
    disabled: tokens.colors.gray[500],
  },
  status: {
    outOfStock: {
      background: tokens.colors.danger[200],
      text: tokens.colors.danger[500],
    },
    lowStock: {
      background: tokens.colors.warning[200],
      text: tokens.colors.warning[500],
    },
    inStock: {
      background: tokens.colors.primary[300],
      text: tokens.colors.primary[800],
    },
  },
  border: {
    light: tokens.colors.neutral[300],
    medium: tokens.colors.gray[500],
  },
} as const;

// Helper function to get font family with fallback
export const getFontFamily = (type: 'header' | 'body') => {
  const primary = tokens.fontFamily[type];
  const fallback =
    type === 'header' ? tokens.fontFamily.headerFallback : tokens.fontFamily.bodyFallback;
  return `${primary}, ${fallback}`;
};
