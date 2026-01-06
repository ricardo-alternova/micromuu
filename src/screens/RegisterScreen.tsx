import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
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
import Svg, { Path, Circle } from 'react-native-svg';

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

const UserIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24">
    <Circle cx={12} cy={8} r={4} stroke="#8B4513" strokeWidth={2} fill="none" />
    <Path
      d="M4 20 C4 16 8 14 12 14 C16 14 20 16 20 20"
      stroke="#8B4513"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
    />
  </Svg>
);

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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <BrandMark size={80} color="#5D4037" showText={false} />
            </View>

            <RanchCard variant="parchment" style={styles.card}>
              <Text style={styles.title}>{t('registration.title')}</Text>
              <Text style={styles.subtitle}>{t('registration.subtitle')}</Text>

              <LeatherInput
                label={t('registration.name')}
                placeholder={t('registration.namePlaceholder')}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                error={errors.name}
                icon={<UserIcon />}
              />

              <LeatherInput
                label={t('registration.lastName')}
                placeholder={t('registration.lastNamePlaceholder')}
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
                error={errors.lastName}
                icon={<UserIcon />}
              />

              <LeatherInput
                label={t('auth.email')}
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={errors.email}
                icon={<MailIcon />}
              />

              <WesternButton
                variant="primary"
                onPress={handleSubmit}
                loading={isLoading}
                disabled={isLoading}
                title={t('registration.submit')}
                icon="star"
              />

              <View style={styles.footer}>
                <Text style={styles.footerText}>{t('auth.hasAccount')}</Text>
                <WesternButton
                  variant="text"
                  onPress={() => navigation.navigate('Login')}
                  title={t('auth.signInHere')}
                />
              </View>
            </RanchCard>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </CowboyBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  card: {
    marginHorizontal: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#5D4037',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 14,
    color: '#8B7355',
    textAlign: 'center',
    marginBottom: 24,
    fontStyle: 'italic',
    paddingHorizontal: 16,
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
});
