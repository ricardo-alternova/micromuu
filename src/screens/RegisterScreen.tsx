import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Button, HelperText, Surface, useTheme } from 'react-native-paper';
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
  password?: string;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { register } = useAuthContext();
  const theme = useTheme();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

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

    if (!password) {
      newErrors.password = t('auth.passwordRequired');
    } else if (password.length < 6) {
      newErrors.password = t('auth.passwordTooShort');
    } else if (password !== confirmPassword) {
      newErrors.password = t('auth.passwordMismatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);

    try {
      await register({ name, lastName, email, password });
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setErrors({ email: t('auth.emailInUse') });
      } else if (err.code === 'auth/weak-password') {
        setErrors({ password: t('auth.weakPassword') });
      } else {
        setErrors({ email: t('registration.error') });
      }
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
              returnKeyType="next"
              autoFocus
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
              returnKeyType="next"
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
              returnKeyType="next"
            />
            {errors.email && (
              <HelperText type="error" visible={!!errors.email}>
                {errors.email}
              </HelperText>
            )}

            <TextInput
              label={t('auth.password')}
              placeholder={t('auth.passwordPlaceholder')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              mode="outlined"
              error={!!errors.password}
              style={styles.input}
              returnKeyType="next"
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />

            <TextInput
              label={t('auth.confirmPassword')}
              placeholder={t('auth.confirmPasswordPlaceholder')}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              mode="outlined"
              error={!!errors.password}
              style={styles.input}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
            {errors.password && (
              <HelperText type="error" visible={!!errors.password}>
                {errors.password}
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
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.7,
  },
  input: {
    marginBottom: 4,
  },
  button: {
    marginTop: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
});
