import { MD3LightTheme, configureFonts } from 'react-native-paper';
import { MD3Theme } from 'react-native-paper';

// Cowboy-inspired color palette
const cowboyColors = {
  primary: '#8B4513', // Saddle Brown
  primaryContainer: '#D2691E', // Chocolate
  secondary: '#A0522D', // Sienna
  secondaryContainer: '#DEB887', // Burlywood
  tertiary: '#CD853F', // Peru
  tertiaryContainer: '#F5DEB3', // Wheat
  surface: '#FFF8F0', // Cream White
  surfaceVariant: '#FAEBD7', // Antique White
  background: '#FFF8F0', // Cream White
  error: '#B22222', // Fire Brick
  errorContainer: '#FFB4A9',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#3E2723',
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#3E2723',
  onTertiary: '#FFFFFF',
  onTertiaryContainer: '#3E2723',
  onSurface: '#5D4037', // Dark Brown
  onSurfaceVariant: '#795548', // Medium Brown
  onError: '#FFFFFF',
  onErrorContainer: '#410002',
  onBackground: '#5D4037',
  outline: '#A1887F', // Light Brown
  outlineVariant: '#BCAAA4',
  shadow: '#000000',
  scrim: '#000000',
  inverseSurface: '#5D4037',
  inverseOnSurface: '#FFF8F0',
  inversePrimary: '#FFB74D',
  elevation: {
    level0: 'transparent',
    level1: '#FFF8F0',
    level2: '#FAEBD7',
    level3: '#F5DEB3',
    level4: '#DEB887',
    level5: '#D2B48C',
  },
  surfaceDisabled: 'rgba(93, 64, 55, 0.12)',
  onSurfaceDisabled: 'rgba(93, 64, 55, 0.38)',
  backdrop: 'rgba(93, 64, 55, 0.4)',
};

const fontConfig = {
  displayLarge: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: 0,
  },
  displayMedium: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    fontSize: 45,
    lineHeight: 52,
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0,
  },
  headlineLarge: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
  },
  headlineSmall: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },
  titleLarge: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily: 'System',
    fontWeight: '500' as const,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontFamily: 'System',
    fontWeight: '500' as const,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelLarge: {
    fontFamily: 'System',
    fontWeight: '500' as const,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily: 'System',
    fontWeight: '500' as const,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily: 'System',
    fontWeight: '500' as const,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  bodyLarge: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
};

export const cowboyTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...cowboyColors,
  },
  fonts: configureFonts({ config: fontConfig }),
};

export default cowboyTheme;
