import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Button, HelperText, Surface } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../hooks/useAuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
};

interface FormErrors {
  name?: string;
  lastName?: string;
  email?: string;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { register } = useAuthContext();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [linkSent, setLinkSent] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = t('registration.nameRequired');
    }

    if (!lastName.trim()) {
      newErrors.lastName = t('registration.lastNameRequired');
    }

    if (!email.trim()) {
      newErrors.email = t('auth.emailRequired');
    } else if (!validateEmail(email)) {
      newErrors.email = t('auth.invalidEmail');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);

    try {
      await register({ name, lastName, email });
      setLinkSent(true);
    } catch (err) {
      setErrors({ email: t('registration.error') });
    } finally {
      setIsLoading(false);
    }
  };

  if (linkSent) {
    return (
      <View style={styles.container}>
        <Surface style={styles.card} elevation={2}>
          <Text variant="headlineMedium" style={styles.title}>
            {t('auth.magicLinkSent')}
          </Text>
          <Text variant="bodyLarge" style={styles.description}>
            {t('auth.magicLinkSentDescription', { email })}
          </Text>
          <Button mode="text" onPress={() => setLinkSent(false)}>
            {t('common.back')}
          </Button>
        </Surface>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Surface style={styles.card} elevation={2}>
            <Text variant="headlineMedium" style={styles.title}>
              {t('registration.title')}
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              {t('registration.subtitle')}
            </Text>

            <TextInput
              label={t('registration.name')}
              placeholder={t('registration.namePlaceholder')}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              mode="outlined"
              error={!!errors.name}
              style={styles.input}
            />
            {errors.name && (
              <HelperText type="error" visible={!!errors.name}>
                {errors.name}
              </HelperText>
            )}

            <TextInput
              label={t('registration.lastName')}
              placeholder={t('registration.lastNamePlaceholder')}
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
              mode="outlined"
              error={!!errors.lastName}
              style={styles.input}
            />
            {errors.lastName && (
              <HelperText type="error" visible={!!errors.lastName}>
                {errors.lastName}
              </HelperText>
            )}

            <TextInput
              label={t('auth.email')}
              placeholder={t('auth.emailPlaceholder')}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              mode="outlined"
              error={!!errors.email}
              style={styles.input}
            />
            {errors.email && (
              <HelperText type="error" visible={!!errors.email}>
                {errors.email}
              </HelperText>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
              style={styles.button}
            >
              {t('registration.submit')}
            </Button>

            <View style={styles.footer}>
              <Text variant="bodyMedium">{t('auth.hasAccount')}</Text>
              <Button mode="text" onPress={() => navigation.navigate('Login')}>
                {t('auth.signInHere')}
              </Button>
            </View>
          </Surface>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    padding: 24,
    borderRadius: 12,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.7,
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
});
