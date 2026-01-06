import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  Animated,
} from 'react-native';

interface LeatherInputProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const LeatherInput: React.FC<LeatherInputProps> = ({
  label,
  error,
  icon,
  value,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

  const handleFocus = (e: any) => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    onBlur?.(e);
  };

  const labelStyle = {
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, -8],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#8B7355', '#5D4037'],
    }),
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          isFocused && styles.focused,
          error && styles.errorContainer,
        ]}
      >
        {/* Leather texture effect */}
        <View style={styles.leatherTexture} />

        {/* Stitching decoration */}
        <View style={styles.stitchTop} />
        <View style={styles.stitchBottom} />

        <Animated.Text style={[styles.label, labelStyle]}>
          {label}
        </Animated.Text>

        <View style={styles.inputRow}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <TextInput
            style={[styles.input, icon && styles.inputWithIcon]}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor="#A0522D80"
            {...props}
          />
        </View>

        {/* Corner rivets */}
        <View style={[styles.rivet, styles.rivetTopLeft]} />
        <View style={[styles.rivet, styles.rivetTopRight]} />
        <View style={[styles.rivet, styles.rivetBottomLeft]} />
        <View style={[styles.rivet, styles.rivetBottomRight]} />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  container: {
    backgroundColor: '#E8DCC8',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#A0522D',
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'relative',
    shadowColor: '#5D4037',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  focused: {
    borderColor: '#8B4513',
    shadowOpacity: 0.25,
  },
  errorContainer: {
    borderColor: '#B22222',
  },
  leatherTexture: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(139, 115, 85, 0.05)',
    borderRadius: 6,
  },
  stitchTop: {
    position: 'absolute',
    top: 4,
    left: 12,
    right: 12,
    height: 1,
    borderTopWidth: 1,
    borderColor: '#A0522D40',
    borderStyle: 'dashed',
  },
  stitchBottom: {
    position: 'absolute',
    bottom: 4,
    left: 12,
    right: 12,
    height: 1,
    borderTopWidth: 1,
    borderColor: '#A0522D40',
    borderStyle: 'dashed',
  },
  label: {
    position: 'absolute',
    left: 16,
    backgroundColor: '#E8DCC8',
    paddingHorizontal: 4,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#3E2723',
    paddingVertical: 8,
    paddingTop: 12,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  rivet: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CD853F',
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  rivetTopLeft: {
    top: 6,
    left: 6,
  },
  rivetTopRight: {
    top: 6,
    right: 6,
  },
  rivetBottomLeft: {
    bottom: 6,
    left: 6,
  },
  rivetBottomRight: {
    bottom: 6,
    right: 6,
  },
  errorText: {
    color: '#B22222',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 16,
    fontWeight: '500',
  },
});
