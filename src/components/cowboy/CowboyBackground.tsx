import React, { ReactNode } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Defs, Pattern, Rect, Path, Circle, G } from 'react-native-svg';

interface CowboyBackgroundProps {
  children: ReactNode;
  variant?: 'desert' | 'barn' | 'parchment';
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const CowboyBackground: React.FC<CowboyBackgroundProps> = ({
  children,
  variant = 'parchment',
}) => {
  const backgrounds = {
    desert: {
      base: '#F5E6D3',
      accent: '#DEB887',
      pattern: '#D2B48C',
    },
    barn: {
      base: '#8B7355',
      accent: '#6B5344',
      pattern: '#5D4037',
    },
    parchment: {
      base: '#FDF8F0',
      accent: '#F5E6D3',
      pattern: '#E8DCC8',
    },
  };

  const colors = backgrounds[variant];

  return (
    <View style={[styles.container, { backgroundColor: colors.base }]}>
      {/* Subtle pattern overlay */}
      <View style={styles.patternContainer}>
        <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} style={StyleSheet.absoluteFill}>
          <Defs>
            {/* Western diamond pattern */}
            <Pattern
              id="westernPattern"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              {/* Diamond shape */}
              <Path
                d="M30 5 L55 30 L30 55 L5 30 Z"
                stroke={colors.pattern}
                strokeWidth="0.5"
                fill="none"
                opacity="0.3"
              />
              {/* Small corner dots */}
              <Circle cx="30" cy="5" r="1.5" fill={colors.pattern} opacity="0.2" />
              <Circle cx="55" cy="30" r="1.5" fill={colors.pattern} opacity="0.2" />
              <Circle cx="30" cy="55" r="1.5" fill={colors.pattern} opacity="0.2" />
              <Circle cx="5" cy="30" r="1.5" fill={colors.pattern} opacity="0.2" />
            </Pattern>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#westernPattern)" />
        </Svg>
      </View>

      {/* Gradient-like effect using overlapping views */}
      <View style={[styles.gradientTop, { backgroundColor: colors.accent }]} />
      <View style={[styles.gradientBottom, { backgroundColor: colors.accent }]} />

      {/* Decorative border frame */}
      <View style={styles.frameContainer} pointerEvents="none">
        {/* Top border */}
        <View style={[styles.borderLine, styles.borderTop, { backgroundColor: colors.pattern }]} />
        {/* Bottom border */}
        <View style={[styles.borderLine, styles.borderBottom, { backgroundColor: colors.pattern }]} />
        {/* Left border */}
        <View style={[styles.borderLineVertical, styles.borderLeft, { backgroundColor: colors.pattern }]} />
        {/* Right border */}
        <View style={[styles.borderLineVertical, styles.borderRight, { backgroundColor: colors.pattern }]} />

        {/* Corner decorations */}
        <View style={[styles.cornerDecoration, styles.cornerTopLeft]}>
          <Svg width="30" height="30" viewBox="0 0 30 30">
            <G opacity="0.4">
              <Path d="M5 25 L5 5 L25 5" stroke={colors.pattern} strokeWidth="2" fill="none" />
              <Circle cx="5" cy="5" r="3" fill={colors.pattern} />
            </G>
          </Svg>
        </View>
        <View style={[styles.cornerDecoration, styles.cornerTopRight]}>
          <Svg width="30" height="30" viewBox="0 0 30 30">
            <G opacity="0.4">
              <Path d="M25 25 L25 5 L5 5" stroke={colors.pattern} strokeWidth="2" fill="none" />
              <Circle cx="25" cy="5" r="3" fill={colors.pattern} />
            </G>
          </Svg>
        </View>
        <View style={[styles.cornerDecoration, styles.cornerBottomLeft]}>
          <Svg width="30" height="30" viewBox="0 0 30 30">
            <G opacity="0.4">
              <Path d="M5 5 L5 25 L25 25" stroke={colors.pattern} strokeWidth="2" fill="none" />
              <Circle cx="5" cy="25" r="3" fill={colors.pattern} />
            </G>
          </Svg>
        </View>
        <View style={[styles.cornerDecoration, styles.cornerBottomRight]}>
          <Svg width="30" height="30" viewBox="0 0 30 30">
            <G opacity="0.4">
              <Path d="M25 5 L25 25 L5 25" stroke={colors.pattern} strokeWidth="2" fill="none" />
              <Circle cx="25" cy="25" r="3" fill={colors.pattern} />
            </G>
          </Svg>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  patternContainer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    opacity: 0.3,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    opacity: 0.2,
  },
  frameContainer: {
    ...StyleSheet.absoluteFillObject,
    margin: 16,
  },
  borderLine: {
    position: 'absolute',
    height: 1,
    left: 30,
    right: 30,
    opacity: 0.3,
  },
  borderLineVertical: {
    position: 'absolute',
    width: 1,
    top: 30,
    bottom: 30,
    opacity: 0.3,
  },
  borderTop: {
    top: 0,
  },
  borderBottom: {
    bottom: 0,
  },
  borderLeft: {
    left: 0,
  },
  borderRight: {
    right: 0,
  },
  cornerDecoration: {
    position: 'absolute',
    width: 30,
    height: 30,
  },
  cornerTopLeft: {
    top: -5,
    left: -5,
  },
  cornerTopRight: {
    top: -5,
    right: -5,
  },
  cornerBottomLeft: {
    bottom: -5,
    left: -5,
  },
  cornerBottomRight: {
    bottom: -5,
    right: -5,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});
