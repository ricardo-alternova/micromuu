import { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import {
  subscribeToAuthState,
  sendMagicLink,
  completeSignIn,
  signOut,
  isValidSignInLink,
  getStoredEmail,
} from '../services/auth';
import { createProfile, getProfile, profileExists } from '../services/profile';
import { AuthState, RegistrationData, PendingRegistration } from '../types/auth';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const PENDING_REGISTRATION_KEY = 'pendingRegistration';

// Store pending registration data
const storePendingRegistration = async (data: RegistrationData): Promise<void> => {
  const pendingData: PendingRegistration = {
    ...data,
    timestamp: Date.now(),
  };

  if (Platform.OS === 'web') {
    localStorage.setItem(PENDING_REGISTRATION_KEY, JSON.stringify(pendingData));
  } else {
    await SecureStore.setItemAsync(PENDING_REGISTRATION_KEY, JSON.stringify(pendingData));
  }
};

// Get pending registration data
const getPendingRegistration = async (): Promise<PendingRegistration | null> => {
  let data: string | null = null;

  if (Platform.OS === 'web') {
    data = localStorage.getItem(PENDING_REGISTRATION_KEY);
  } else {
    data = await SecureStore.getItemAsync(PENDING_REGISTRATION_KEY);
  }

  if (!data) return null;

  const parsed = JSON.parse(data) as PendingRegistration;
  // Expire after 1 hour
  if (Date.now() - parsed.timestamp > 3600000) {
    await clearPendingRegistration();
    return null;
  }

  return parsed;
};

// Clear pending registration data
const clearPendingRegistration = async (): Promise<void> => {
  if (Platform.OS === 'web') {
    localStorage.removeItem(PENDING_REGISTRATION_KEY);
  } else {
    await SecureStore.deleteItemAsync(PENDING_REGISTRATION_KEY);
  }
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthState(async (user: User | null) => {
      if (user) {
        const exists = await profileExists(user.uid);
        setHasProfile(exists);

        // Check for pending registration
        const pending = await getPendingRegistration();
        if (!exists && pending) {
          // Complete registration by creating profile
          await createProfile(user.uid, {
            name: pending.name,
            lastName: pending.lastName,
            email: pending.email,
          });
          await clearPendingRegistration();
          setHasProfile(true);
          setIsNewUser(true);
        }
      } else {
        setHasProfile(null);
      }

      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: !!user,
      });
    });

    return unsubscribe;
  }, []);

  // Send magic link for login
  const login = useCallback(async (email: string): Promise<void> => {
    await sendMagicLink(email);
  }, []);

  // Register new user (sends magic link and stores pending data)
  const register = useCallback(async (data: RegistrationData): Promise<void> => {
    await storePendingRegistration(data);
    await sendMagicLink(data.email);
  }, []);

  // Complete sign-in from email link
  const handleEmailLink = useCallback(async (url: string): Promise<boolean> => {
    if (!isValidSignInLink(url)) {
      return false;
    }

    const storedEmail = await getStoredEmail();
    if (storedEmail) {
      await completeSignIn(url, storedEmail);
      return true;
    }

    return false;
  }, []);

  // Sign out
  const logout = useCallback(async (): Promise<void> => {
    await signOut();
    setHasProfile(null);
    setIsNewUser(false);
  }, []);

  // Clear new user flag
  const clearNewUserFlag = useCallback(() => {
    setIsNewUser(false);
  }, []);

  return {
    ...authState,
    hasProfile,
    isNewUser,
    login,
    register,
    handleEmailLink,
    logout,
    clearNewUserFlag,
  };
};
