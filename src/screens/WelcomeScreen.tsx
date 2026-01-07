import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../hooks/useAuthContext';
import { getProfile, UserProfile } from '../services/profile';

export const WelcomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { user, clearNewUserFlag, logout } = useAuthContext();
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
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="displaySmall" style={styles.logo}>
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
            onPress={() => clearNewUserFlag()}
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
