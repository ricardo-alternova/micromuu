import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Surface, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthContext } from '../hooks/useAuthContext';
import { createFarm, uploadFarmImage, updateFarm } from '../services/farms';
import { MainStackParamList } from '../types/navigation';
import { ImagePicker } from '../components/ImagePicker';

type AddFarmScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'AddFarm'>;
};

interface FormErrors {
  name?: string;
}

export const AddFarmScreen: React.FC<AddFarmScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const theme = useTheme();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = t('farms.nameRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate() || !user) return;

    setIsLoading(true);

    try {
      // Create the farm first
      const farmId = await createFarm(user.uid, {
        name: name.trim(),
        location: location.trim(),
      });

      // Upload image if selected
      if (imageUri) {
        const imageUrl = await uploadFarmImage(user.uid, farmId, imageUri);
        await updateFarm(farmId, { imageUrl });
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error creating farm:', error);
      setErrors({ name: t('farms.createError') });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formWrapper}>
          <Surface style={styles.card} elevation={2}>
            <Text variant="headlineMedium" style={styles.title}>
              {t('farms.addFarm')}
            </Text>

            <ImagePicker
              imageUri={imageUri}
              onImageSelected={setImageUri}
            />

            <TextInput
              label={t('farms.name')}
              placeholder={t('farms.namePlaceholder')}
              value={name}
              onChangeText={setName}
              mode="outlined"
              error={!!errors.name}
              style={styles.input}
              returnKeyType="next"
              autoFocus
            />
            {errors.name && (
              <Text variant="bodySmall" style={[styles.error, { color: theme.colors.error }]}>
                {errors.name}
              </Text>
            )}

            <TextInput
              label={t('farms.location')}
              placeholder={t('farms.locationPlaceholder')}
              value={location}
              onChangeText={setLocation}
              mode="outlined"
              style={styles.input}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />

            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
              style={styles.button}
            >
              {t('farms.save')}
            </Button>

            <Button
              mode="text"
              onPress={() => navigation.goBack()}
              disabled={isLoading}
              style={styles.cancelButton}
            >
              {t('common.cancel')}
            </Button>
          </Surface>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  formWrapper: {
    width: '100%',
    maxWidth: 400,
  },
  card: {
    padding: 24,
    borderRadius: 12,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 8,
  },
  error: {
    marginBottom: 8,
    marginLeft: 4,
  },
  button: {
    marginTop: 16,
  },
  cancelButton: {
    marginTop: 8,
  },
});

export default AddFarmScreen;
