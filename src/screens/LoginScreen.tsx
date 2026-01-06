import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { HelperText } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../hooks/useAuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import {
  CowboyBackground,
  BrandMark,
  RanchCard,
  WesternButton,
  LeatherInput,
} from '../components/cowboy';
import Svg, { Path } from 'react-native-svg';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const MailIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24">
    <Path
      d="M3 6 L12 13 L21 6 M3 6 L3 18 L21 18 L21 6 L3 6"
      stroke="#8B4513"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CheckIcon = () => (
  <Svg width={60} height={60} viewBox="0 0 24 24">
    <Path
      d="M5 12 L10 17 L19 7"
      stroke="#2E7D32"
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { login } = useAuthContext();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [linkSent, setLinkSent] = useState(false);

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

    setIsLoading(true);

    try {
      await login(email);
      setLinkSent(true);
    } catch (err) {
      setError(t('auth.signInError'));
    } finally {
      setIsLoading(false);
    }
  };

  if (linkSent) {
    return (
      <CowboyBackground variant="parchment">
        <View style={styles.container}>
          <View style={styles.content}>
            <RanchCard variant="parchment">
              <View style={styles.successContainer}>
                <View style={styles.checkIconContainer}>
                  <CheckIcon />
                </View>
                <Text style={styles.successTitle}>{t('auth.magicLinkSent')}</Text>
                <Text style={styles.successDescription}>
                  {t('auth.magicLinkSentDescription', { email })}
                </Text>
                <WesternButton
                  variant="text"
                  onPress={() => setLinkSent(false)}
                  title={t('common.back')}
                />
              </View>
            </RanchCard>
          </View>
        </View>
      </CowboyBackground>
    );
  }

  return (
    <CowboyBackground variant="parchment">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <BrandMark size={100} color="#5D4037" />
          </View>

          <RanchCard variant="parchment" style={styles.card}>
            <Text style={styles.title}>{t('auth.login')}</Text>
            <Text style={styles.subtitle}>Saddle up and sign in, partner</Text>

            <LeatherInput
              label={t('auth.email')}
              placeholder={t('auth.emailPlaceholder')}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              error={error || undefined}
              icon={<MailIcon />}
            />

            <WesternButton
              variant="primary"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
              title={t('auth.sendMagicLink')}
              icon="mail"
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>{t('auth.noAccount')}</Text>
              <WesternButton
                variant="text"
                onPress={() => navigation.navigate('Register')}
                title={t('auth.registerHere')}
              />
            </View>
          </RanchCard>

          <View style={styles.decorativeText}>
            <Text style={styles.tagline}>Cattle inventory made simple</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </CowboyBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  card: {
    marginHorizontal: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#5D4037',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 14,
    color: '#8B7355',
    textAlign: 'center',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  checkIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    borderWidth: 3,
    borderColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5D4037',
    textAlign: 'center',
    marginBottom: 12,
  },
  successDescription: {
    fontSize: 16,
    color: '#795548',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#795548',
  },
  decorativeText: {
    marginTop: 32,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 12,
    color: '#A0522D',
    letterSpacing: 3,
    textTransform: 'uppercase',
    opacity: 0.7,
  },
});
