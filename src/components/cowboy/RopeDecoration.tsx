import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, Pattern, Rect } from 'react-native-svg';

interface RopeDecorationProps {
  width?: number | string;
  variant?: 'horizontal' | 'border' | 'corner';
  color?: string;
}

export const RopeDecoration: React.FC<RopeDecorationProps> = ({
  width = '100%',
  variant = 'horizontal',
  color = '#8B7355',
}) => {
  if (variant === 'horizontal') {
    return (
      <View style={[styles.container, { width }]}>
        <Svg height={12} width="100%" preserveAspectRatio="xMidYMid slice">
          <Defs>
            <Pattern id="ropePattern" x={0} y={0} width={24} height={12} patternUnits="userSpaceOnUse">
              <Path
                d="M0 6 Q6 2 12 6 Q18 10 24 6"
                stroke={color}
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
              />
              <Path
                d="M0 6 Q6 10 12 6 Q18 2 24 6"
                stroke={color}
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                opacity={0.5}
              />
            </Pattern>
          </Defs>
          <Rect x={0} y={0} width="100%" height={12} fill="url(#ropePattern)" />
        </Svg>
      </View>
    );
  }

  if (variant === 'corner') {
    return (
      <View style={styles.cornerContainer}>
        <Svg width={40} height={40} viewBox="0 0 40 40">
          <Path
            d="M5 35 L5 10 Q5 5 10 5 L35 5"
            stroke={color}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d="M8 32 L8 13 Q8 8 13 8 L32 8"
            stroke={color}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            opacity={0.4}
          />
        </Svg>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    height: 12,
    overflow: 'hidden',
  },
  cornerContainer: {
    width: 40,
    height: 40,
  },
});
