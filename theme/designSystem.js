export const Theme = {
  colors: {
    primary: '#6366F1',
    secondary: '#14B8A6',
    accent: '#8B5CF6',
    background: '#0A0C12',
    surface: '#1A1F2B',
    surfaceLight: '#2D3446',
    border: 'rgba(99, 102, 241, 0.15)',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    error: '#EF4444',
    success: '#10B981',
    glass: 'rgba(26, 31, 43, 0.7)',
    glassBorder: 'rgba(255, 255, 255, 0.08)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  roundness: {
    sm: 8,
    md: 12,
    lg: 18,
    xl: 28,
    full: 9999,
  },
  shadows: {
    soft: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
    },
    medium: {
      shadowColor: '#6366F1',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 10,
    },
    glow: {
      shadowColor: '#6366F1',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 15,
      elevation: 15,
    }
  }
};
