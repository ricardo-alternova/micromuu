import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { RopeDecoration } from './RopeDecoration';

interface RanchCardProps {
  children: ReactNode;
  style?: ViewStyle;
  showRope?: boolean;
  variant?: 'leather' | 'parchment' | 'wood';
}

export const RanchCard: React.FC<RanchCardProps> = ({
  children,
  style,
  showRope = true,
  variant = 'parchment',
}) => {
  const cardStyles = {
    leather: {
      backgroundColor: '#8B7355',
      borderColor: '#5D4037',
      shadowColor: '#3E2723',
    },
    parchment: {
      backgroundColor: '#FDF5E6',
      borderColor: '#D2B48C',
      shadowColor: '#8B7355',
    },
    wood: {
      backgroundColor: '#DEB887',
      borderColor: '#A0522D',
      shadowColor: '#5D4037',
    },
  };

  const colors = cardStyles[variant];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
          shadowColor: colors.shadowColor,
        },
        style,
      ]}
    >
      {/* Corner decorations */}
      <View style={[styles.corner, styles.topLeft]}>
        <RopeDecoration variant="corner" color={colors.borderColor} />
      </View>
      <View style={[styles.corner, styles.topRight]}>
        <View style={{ transform: [{ rotate: '90deg' }] }}>
          <RopeDecoration variant="corner" color={colors.borderColor} />
        </View>
      </View>
      <View style={[styles.corner, styles.bottomLeft]}>
        <View style={{ transform: [{ rotate: '-90deg' }] }}>
          <RopeDecoration variant="corner" color={colors.borderColor} />
        </View>
      </View>
      <View style={[styles.corner, styles.bottomRight]}>
        <View style={{ transform: [{ rotate: '180deg' }] }}>
          <RopeDecoration variant="corner" color={colors.borderColor} />
        </View>
      </View>

      {/* Inner content */}
      <View style={styles.innerContent}>
        {showRope && (
          <View style={styles.ropeTop}>
            <RopeDecoration color={colors.borderColor} />
          </View>
        )}
        <View style={styles.content}>{children}</View>
        {showRope && (
          <View style={styles.ropeBottom}>
            <RopeDecoration color={colors.borderColor} />
          </View>
        )}
      </View>

      {/* Weathered texture overlay */}
      <View style={styles.textureOverlay} pointerEvents="none" />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 3,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    zIndex: 1,
  },
  topLeft: {
    top: 0,
    left: 0,
  },
  topRight: {
    top: 0,
    right: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
  },
  innerContent: {
    padding: 8,
  },
  ropeTop: {
    marginBottom: 16,
    marginTop: 24,
  },
  ropeBottom: {
    marginTop: 16,
    marginBottom: 24,
  },
  content: {
    paddingHorizontal: 16,
  },
  textureOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.03,
    // This creates a subtle grain effect
  },
});
