import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, HelperText, Surface } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../hooks/useAuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { login } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    setError(null);

    if (!email.trim()) {
      setError(t('auth.emailRequired'));
      return;
    }

    if (!validateEmail(email)) {
      setError(t('auth.invalidEmail'));
      return;
    }

    if (!password) {
      setError(t('auth.passwordRequired'));
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential') {
        setError(t('auth.invalidCredentials'));
      } else if (err.code === 'auth/user-not-found') {
        setError(t('auth.userNotFound'));
      } else if (err.code === 'auth/wrong-password') {
        setError(t('auth.wrongPassword'));
      } else {
        setError(t('auth.signInError'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text variant="displaySmall" style={styles.logo}>
          Micromuu
        </Text>

        <Surface style={styles.card} elevation={2}>
          <Text variant="headlineMedium" style={styles.title}>
            {t('auth.login')}
          </Text>

          <TextInput
            label={t('auth.email')}
            placeholder={t('auth.emailPlaceholder')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            mode="outlined"
            error={!!error}
            style={styles.input}
          />

          <TextInput
            label={t('auth.password')}
            placeholder={t('auth.passwordPlaceholder')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            mode="outlined"
            error={!!error}
            style={styles.input}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />

          {error && (
            <HelperText type="error" visible={!!error}>
              {error}
            </HelperText>
          )}

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
            style={styles.button}
          >
            {t('auth.signIn')}
          </Button>

          <View style={styles.footer}>
            <Text variant="bodyMedium">{t('auth.noAccount')}</Text>
            <Button mode="text" onPress={() => navigation.navigate('Register')}>
              {t('auth.registerHere')}
            </Button>
          </View>
        </Surface>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: 'bold',
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
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
});
