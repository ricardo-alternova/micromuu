import { MD3LightTheme, configureFonts } from 'react-native-paper';
import { MD3Theme } from 'react-native-paper';
import { Platform } from 'react-native';

// Cowboy/Ranch Color Palette - "Dusty Trail"
// Warm, earthy tones inspired by leather, desert sand, and rustic barns
const colors = {
  // Primary - Saddle Brown (leather)
  primary: '#8B4513',
  onPrimary: '#FFFFFF',
  primaryContainer: '#FFDDB8',
  onPrimaryContainer: '#2E1500',

  // Secondary - Burnt Sienna (rust/clay)
  secondary: '#855318',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#FFDCBE',
  onSecondaryContainer: '#2C1600',

  // Tertiary - Sage (ranch vegetation)
  tertiary: '#5E6237',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#E3E7B1',
  onTertiaryContainer: '#1B1D00',

  // Error
  error: '#BA1A1A',
  onError: '#FFFFFF',
  errorContainer: '#FFDAD6',
  onErrorContainer: '#410002',

  // Background & Surface - Warm cream/parchment
  background: '#FFF8F4',
  onBackground: '#211A14',
  surface: '#FFF8F4',
  onSurface: '#211A14',
  surfaceVariant: '#F3DFD2',
  onSurfaceVariant: '#51443B',

  // Outline
  outline: '#847469',
  outlineVariant: '#D7C3B7',

  // Inverse
  inverseSurface: '#372F29',
  inverseOnSurface: '#FCEDE4',
  inversePrimary: '#FFB866',

  // Additional surface tones
  surfaceDisabled: 'rgba(33, 26, 20, 0.12)',
  onSurfaceDisabled: 'rgba(33, 26, 20, 0.38)',
  backdrop: 'rgba(58, 46, 38, 0.4)',

  // Elevation overlay
  elevation: {
    level0: 'transparent',
    level1: '#FBF1EA',
    level2: '#F8EBE1',
    level3: '#F5E5D9',
    level4: '#F4E3D6',
    level5: '#F2E0D0',
  },
};

// Font configuration - using system fonts for performance
const fontConfig = {
  fontFamily: Platform.select({
    web: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
};

export const theme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...colors,
  },
  fonts: configureFonts({ config: fontConfig }),
};

// Export individual colors for use in StyleSheets
export const themeColors = colors;

export default theme;
