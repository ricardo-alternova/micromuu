import { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import {
  subscribeToAuthState,
  signIn,
  signUp,
  signOut,
} from '../services/auth';
import { createProfile, profileExists } from '../services/profile';
import { AuthState, RegistrationData } from '../types/auth';

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

  // Login with email and password
  const login = useCallback(async (email: string, password: string): Promise<void> => {
    await signIn(email, password);
  }, []);

  // Register new user
  const register = useCallback(async (data: RegistrationData): Promise<void> => {
    const user = await signUp(data.email, data.password);

    // Create profile after successful registration
    await createProfile(user.uid, {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
    });

    setHasProfile(true);
    setIsNewUser(true);
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
    logout,
    clearNewUserFlag,
  };
};
