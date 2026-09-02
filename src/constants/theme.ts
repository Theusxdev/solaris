import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export const theme = {
  colors,
  spacing,
  typography,

  radius: {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 18,
    xxl: 24,
    full: 999,
  },

  shadows: {
    small: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 2,
    },

    medium: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },

    large: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.25,
      shadowRadius: 16,
      elevation: 8,
    },
  },
} as const;