import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../hooks/useAuthContext';
import { getProfile, UserProfile } from '../services/profile';
import {
  CowboyBackground,
  BrandMark,
  RanchCard,
  WesternButton,
  RopeDecoration,
} from '../components/cowboy';
import Svg, { Path, Circle, G } from 'react-native-svg';

const CowIcon = ({ size = 60, color = '#5D4037' }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <G>
      {/* Horns */}
      <Path
        d="M8 20 Q4 12 12 8 M56 20 Q60 12 52 8"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Head */}
      <Circle cx="32" cy="32" r="18" stroke={color} strokeWidth="3" fill="none" />
      {/* Ears */}
      <Path
        d="M16 24 Q12 20 14 16 M48 24 Q52 20 50 16"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Eyes */}
      <Circle cx="26" cy="28" r="2.5" fill={color} />
      <Circle cx="38" cy="28" r="2.5" fill={color} />
      {/* Nose */}
      <Path
        d="M28 38 Q32 42 36 38"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Nostrils */}
      <Circle cx="29" cy="36" r="1.5" fill={color} />
      <Circle cx="35" cy="36" r="1.5" fill={color} />
    </G>
  </Svg>
);

const StarBurst = ({ color = '#CD853F' }) => (
  <Svg width="200" height="200" viewBox="0 0 200 200" style={styles.starBurst}>
    <G opacity="0.1">
      {[...Array(12)].map((_, i) => (
        <Path
          key={i}
          d={`M100 100 L${100 + 90 * Math.cos((i * 30 * Math.PI) / 180)} ${100 + 90 * Math.sin((i * 30 * Math.PI) / 180)}`}
          stroke={color}
          strokeWidth="2"
        />
      ))}
    </G>
  </Svg>
);

export const WelcomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { user, clearNewUserFlag, logout } = useAuthContext();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        const userProfile = await getProfile(user.uid);
        setProfile(userProfile);
      }
    };

    loadProfile();

    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [user]);

  useEffect(() => {
    return () => {
      clearNewUserFlag();
    };
  }, [clearNewUserFlag]);

  const userName = profile?.name || '';

  return (
    <CowboyBackground variant="parchment">
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Decorative star burst behind logo */}
          <View style={styles.logoSection}>
            <StarBurst />
            <View style={styles.cowIconContainer}>
              <CowIcon size={80} color="#8B4513" />
            </View>
          </View>

          <RanchCard variant="parchment" style={styles.card}>
            <View style={styles.welcomeContent}>
              <Text style={styles.title}>{t('welcome.title')}</Text>

              <RopeDecoration width="60%" color="#D2B48C" />

              <Text style={styles.greeting}>
                {t('welcome.greeting', { name: userName })}
              </Text>

              <Text style={styles.subtitle}>{t('welcome.subtitle')}</Text>

              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{t('welcome.description')}</Text>
              </View>

              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <BrandMark size={50} color="#8B4513" showText={false} />
                </View>
                <Text style={styles.badgeText}>CERTIFIED RANCHER</Text>
              </View>

              <WesternButton
                variant="primary"
                onPress={() => clearNewUserFlag()}
                title={t('welcome.getStarted')}
                icon="horseshoe"
              />

              <WesternButton
                variant="text"
                onPress={logout}
                title={t('auth.logout')}
              />
            </View>
          </RanchCard>

          <View style={styles.footer}>
            <Text style={styles.footerText}>EST. 2024</Text>
            <View style={styles.footerDot} />
            <Text style={styles.footerText}>MICROMUU RANCH CO.</Text>
          </View>
        </Animated.View>
      </View>
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
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    height: 120,
  },
  starBurst: {
    position: 'absolute',
  },
  cowIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FDF5E6',
    borderWidth: 4,
    borderColor: '#D2B48C',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5D4037',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  card: {
    marginHorizontal: 0,
  },
  welcomeContent: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#5D4037',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#8B4513',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#795548',
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  descriptionContainer: {
    backgroundColor: '#F5E6D3',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#CD853F',
  },
  description: {
    fontSize: 14,
    color: '#5D4037',
    textAlign: 'center',
    lineHeight: 22,
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  badge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FDF5E6',
    borderWidth: 3,
    borderColor: '#CD853F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#A0522D',
    letterSpacing: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 10,
    color: '#A0522D',
    letterSpacing: 2,
    fontWeight: '600',
  },
  footerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CD853F',
    marginHorizontal: 12,
  },
});
