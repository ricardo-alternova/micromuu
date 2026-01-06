import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from './firebase';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const EMAIL_STORAGE_KEY = 'emailForSignIn';

// For email link authentication, we use the web URL
// On mobile, users complete sign-in by returning to the app and pasting the link
// or by opening the web version
const getActionCodeSettings = () => {
  // Use web URL for the redirect - works on all platforms
  const baseUrl = Platform.OS === 'web'
    ? window.location.origin
    : `https://${process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN}`;

  return {
    url: `${baseUrl}/auth/callback`,
    handleCodeInApp: true,
  };
};

// Store email for later verification
const storeEmail = async (email: string): Promise<void> => {
  if (Platform.OS === 'web') {
    localStorage.setItem(EMAIL_STORAGE_KEY, email);
  } else {
    await SecureStore.setItemAsync(EMAIL_STORAGE_KEY, email);
  }
};

// Retrieve stored email
export const getStoredEmail = async (): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(EMAIL_STORAGE_KEY);
  }
  return SecureStore.getItemAsync(EMAIL_STORAGE_KEY);
};

// Clear stored email
const clearStoredEmail = async (): Promise<void> => {
  if (Platform.OS === 'web') {
    localStorage.removeItem(EMAIL_STORAGE_KEY);
  } else {
    await SecureStore.deleteItemAsync(EMAIL_STORAGE_KEY);
  }
};

// Send magic link email
export const sendMagicLink = async (email: string): Promise<void> => {
  const actionCodeSettings = getActionCodeSettings();
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  await storeEmail(email);
};

// Verify if URL is a sign-in link
export const isValidSignInLink = (url: string): boolean => {
  return isSignInWithEmailLink(auth, url);
};

// Complete sign-in with email link
export const completeSignIn = async (url: string, email?: string): Promise<User> => {
  const storedEmail = email || (await getStoredEmail());

  if (!storedEmail) {
    throw new Error('No email found. Please enter your email to complete sign-in.');
  }

  const result = await signInWithEmailLink(auth, storedEmail, url);
  await clearStoredEmail();
  return result.user;
};

// Sign out
export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

// Subscribe to auth state changes
export const subscribeToAuthState = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
