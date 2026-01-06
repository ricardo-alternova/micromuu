import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';

interface BrandMarkProps {
  size?: number;
  color?: string;
  showText?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  size = 120,
  color = '#5D4037',
  showText = true,
}) => {
  const scale = size / 120;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 120 120">
        <G>
          {/* Outer circle - like a branding iron */}
          <Circle
            cx="60"
            cy="60"
            r="55"
            stroke={color}
            strokeWidth="3"
            fill="none"
          />
          <Circle
            cx="60"
            cy="60"
            r="48"
            stroke={color}
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="4 2"
          />

          {/* Stylized M for Micromuu - looks like cattle horns */}
          <Path
            d="M30 75 L30 45 L45 65 L60 45 L75 65 L90 45 L90 75"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Small cattle head silhouette */}
          <Path
            d="M52 85 Q60 90 68 85 M55 82 L52 78 M65 82 L68 78"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <Circle cx="57" cy="83" r="1.5" fill={color} />
          <Circle cx="63" cy="83" r="1.5" fill={color} />

          {/* Decorative corner marks */}
          <Path d="M20 25 L25 20 M95 20 L100 25 M20 95 L25 100 M95 100 L100 95"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </G>
      </Svg>
      {showText && (
        <Text style={[styles.brandText, { color, fontSize: 24 * scale }]}>
          MICROMUU
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  brandText: {
    marginTop: 8,
    fontWeight: '800',
    letterSpacing: 6,
  },
});
