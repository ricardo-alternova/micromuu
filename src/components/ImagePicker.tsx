import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import * as ExpoImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';

interface ImagePickerProps {
  imageUri?: string | null;
  onImageSelected: (uri: string) => void;
  size?: number;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  imageUri,
  onImageSelected,
  size = 120,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const pickImage = async () => {
    const permissionResult = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      return;
    }

    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} style={styles.container}>
      <View
        style={[
          styles.imageContainer,
          {
            width: size,
            height: size,
            backgroundColor: theme.colors.surfaceVariant,
            borderColor: theme.colors.outline,
          },
        ]}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={[styles.image, { width: size, height: size }]}
          />
        ) : (
          <View style={styles.placeholder}>
            <IconButton
              icon="barn"
              size={size * 0.4}
              iconColor={theme.colors.outline}
            />
          </View>
        )}
        <View
          style={[
            styles.editBadge,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <IconButton
            icon="camera"
            size={16}
            iconColor={theme.colors.onPrimary}
            style={styles.editIcon}
          />
        </View>
      </View>
      <Text variant="bodySmall" style={[styles.label, { color: theme.colors.primary }]}>
        {imageUri ? t('farms.changeImage') : t('farms.addImage')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imageContainer: {
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    margin: 0,
  },
  label: {
    marginTop: 8,
  },
});

export default ImagePicker;
