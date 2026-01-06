import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface UserProfile {
  userId: string;
  name: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateProfileData {
  name: string;
  lastName: string;
  email: string;
}

// Create a new user profile
export const createProfile = async (
  userId: string,
  data: CreateProfileData
): Promise<void> => {
  const profileRef = doc(db, 'profiles', userId);

  await setDoc(profileRef, {
    userId,
    name: data.name,
    lastName: data.lastName,
    email: data.email,
    createdAt: serverTimestamp(),
  });
};

// Get user profile
export const getProfile = async (userId: string): Promise<UserProfile | null> => {
  const profileRef = doc(db, 'profiles', userId);
  const snapshot = await getDoc(profileRef);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();
  return {
    userId: data.userId,
    name: data.name,
    lastName: data.lastName,
    email: data.email,
    createdAt: data.createdAt?.toDate(),
    updatedAt: data.updatedAt?.toDate(),
  };
};

// Update user profile
export const updateProfile = async (
  userId: string,
  data: Partial<CreateProfileData>
): Promise<void> => {
  const profileRef = doc(db, 'profiles', userId);

  await updateDoc(profileRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

// Check if profile exists
export const profileExists = async (userId: string): Promise<boolean> => {
  const profileRef = doc(db, 'profiles', userId);
  const snapshot = await getDoc(profileRef);
  return snapshot.exists();
};
