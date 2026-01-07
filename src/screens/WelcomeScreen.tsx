import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Surface, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthContext } from '../hooks/useAuthContext';
import { getProfile, UserProfile } from '../services/profile';
import { MainStackParamList } from '../types/navigation';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'Welcome'>;
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { user, clearNewUserFlag, logout } = useAuthContext();
  const theme = useTheme();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        const userProfile = await getProfile(user.uid);
        setProfile(userProfile);
      }
    };

    loadProfile();
  }, [user]);

  useEffect(() => {
    return () => {
      clearNewUserFlag();
    };
  }, [clearNewUserFlag]);

  const userName = profile?.name || '';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.formWrapper}>
          <Text variant="displaySmall" style={[styles.logo, { color: theme.colors.primary }]}>
            Micromuu
          </Text>

          <Surface style={styles.card} elevation={2}>
          <Text variant="headlineMedium" style={styles.title}>
            {t('welcome.title')}
          </Text>

          <Text variant="headlineSmall" style={styles.greeting}>
            {t('welcome.greeting', { name: userName })}
          </Text>

          <Text variant="bodyLarge" style={styles.subtitle}>
            {t('welcome.subtitle')}
          </Text>

          <Text variant="bodyMedium" style={styles.description}>
            {t('welcome.description')}
          </Text>

          <Button
            mode="contained"
            onPress={() => {
              clearNewUserFlag();
              navigation.replace('Dashboard');
            }}
            style={styles.button}
          >
            {t('welcome.getStarted')}
          </Button>

          <Button mode="text" onPress={logout} style={styles.logoutButton}>
            {t('auth.logout')}
          </Button>
        </Surface>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  formWrapper: {
    width: '100%',
    maxWidth: 400,
  },
  logo: {
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: 'bold',
  },
  card: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  greeting: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.7,
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    marginTop: 16,
    minWidth: 200,
  },
  logoutButton: {
    marginTop: 16,
  },
});
