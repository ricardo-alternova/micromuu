import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Text, TextInput, Button, Surface, useTheme, ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useAuthContext } from '../hooks/useAuthContext';
import { getFarm, updateFarm, archiveFarm, uploadFarmImage } from '../services/farms';
import { MainStackParamList } from '../types/navigation';
import { Farm } from '../types/farms';
import { ImagePicker } from '../components/ImagePicker';

type EditFarmScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'EditFarm'>;
  route: RouteProp<MainStackParamList, 'EditFarm'>;
};

interface FormErrors {
  name?: string;
}

export const EditFarmScreen: React.FC<EditFarmScreenProps> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const theme = useTheme();
  const { farmId } = route.params;

  const [farm, setFarm] = useState<Farm | null>(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const loadFarm = async () => {
      try {
        const farmData = await getFarm(farmId);
        if (farmData) {
          setFarm(farmData);
          setName(farmData.name);
          setLocation(farmData.location);
          setImageUri(farmData.imageUrl || null);
          setOriginalImageUrl(farmData.imageUrl || null);
        }
      } catch (error) {
        console.error('Error loading farm:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFarm();
  }, [farmId]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = t('farms.nameRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate() || !user || !farm) return;

    setIsSaving(true);

    try {
      let imageUrl = originalImageUrl;

      // Upload new image if changed
      if (imageUri && imageUri !== originalImageUrl) {
        imageUrl = await uploadFarmImage(user.uid, farmId, imageUri);
      }

      await updateFarm(farmId, {
        name: name.trim(),
        location: location.trim(),
        imageUrl: imageUrl || undefined,
      });

      navigation.goBack();
    } catch (error) {
      console.error('Error updating farm:', error);
      setErrors({ name: t('farms.updateError') });
    } finally {
      setIsSaving(false);
    }
  };

  const handleArchive = () => {
    Alert.alert(
      t('farms.archive'),
      t('farms.archiveConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('farms.archive'),
          style: 'destructive',
          onPress: async () => {
            setIsSaving(true);
            try {
              await archiveFarm(farmId);
              navigation.goBack();
            } catch (error) {
              console.error('Error archiving farm:', error);
            } finally {
              setIsSaving(false);
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!farm) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.colors.background }]}>
        <Text>{t('farms.notFound')}</Text>
      </View>
    );
  }

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
              {t('farms.editFarm')}
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
              onSubmitEditing={handleSave}
            />

            <Button
              mode="contained"
              onPress={handleSave}
              loading={isSaving}
              disabled={isSaving}
              style={styles.button}
            >
              {t('farms.save')}
            </Button>

            <Button
              mode="outlined"
              onPress={handleArchive}
              disabled={isSaving}
              style={styles.archiveButton}
              textColor={theme.colors.error}
            >
              {t('farms.archive')}
            </Button>

            <Button
              mode="text"
              onPress={() => navigation.goBack()}
              disabled={isSaving}
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
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
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
  archiveButton: {
    marginTop: 12,
    borderColor: 'transparent',
  },
  cancelButton: {
    marginTop: 8,
  },
});

export default EditFarmScreen;
