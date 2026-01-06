import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface WesternButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'text';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  icon?: 'horseshoe' | 'star' | 'arrow' | 'mail' | none;
}

const HorseshoeIcon = ({ color }: { color: string }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24">
    <Path
      d="M5 12 C5 6 9 3 12 3 C15 3 19 6 19 12 L19 18 L16 18 L16 12 C16 8 14 6 12 6 C10 6 8 8 8 12 L8 18 L5 18 Z"
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const StarIcon = ({ color }: { color: string }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24">
    <Path
      d="M12 2 L14.5 9 L22 9 L16 14 L18.5 22 L12 17 L5.5 22 L8 14 L2 9 L9.5 9 Z"
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeLinejoin="round"
    />
  </Svg>
);

const ArrowIcon = ({ color }: { color: string }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24">
    <Path
      d="M5 12 L19 12 M14 7 L19 12 L14 17"
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MailIcon = ({ color }: { color: string }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24">
    <Path
      d="M3 6 L12 13 L21 6 M3 6 L3 18 L21 18 L21 6 L3 6"
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const icons = {
  horseshoe: HorseshoeIcon,
  star: StarIcon,
  arrow: ArrowIcon,
  mail: MailIcon,
};

export const WesternButton: React.FC<WesternButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  icon,
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: styles.primaryContainer,
          text: styles.primaryText,
          textColor: '#FDF5E6',
        };
      case 'secondary':
        return {
          container: styles.secondaryContainer,
          text: styles.secondaryText,
          textColor: '#5D4037',
        };
      case 'text':
        return {
          container: styles.textContainer,
          text: styles.textButtonText,
          textColor: '#8B4513',
        };
      default:
        return {
          container: styles.primaryContainer,
          text: styles.primaryText,
          textColor: '#FDF5E6',
        };
    }
  };

  const variantStyles = getStyles();
  const IconComponent = icon ? icons[icon] : null;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        variantStyles.container,
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.8}
    >
      {/* Decorative stitching for primary/secondary */}
      {variant !== 'text' && <View style={styles.stitching} />}

      <View style={styles.contentRow}>
        {loading ? (
          <ActivityIndicator color={variantStyles.textColor} />
        ) : (
          <>
            {IconComponent && (
              <View style={styles.iconContainer}>
                <IconComponent color={variantStyles.textColor} />
              </View>
            )}
            <Text style={[styles.buttonText, variantStyles.text]}>{title}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  primaryContainer: {
    backgroundColor: '#8B4513',
    borderWidth: 2,
    borderColor: '#5D4037',
    shadowColor: '#3E2723',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  secondaryContainer: {
    backgroundColor: '#DEB887',
    borderWidth: 2,
    borderColor: '#A0522D',
    shadowColor: '#5D4037',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  textContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
  },
  stitching: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderStyle: 'dashed',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  primaryText: {
    color: '#FDF5E6',
  },
  secondaryText: {
    color: '#5D4037',
  },
  textButtonText: {
    color: '#8B4513',
    textDecorationLine: 'underline',
  },
  disabled: {
    opacity: 0.5,
  },
});
