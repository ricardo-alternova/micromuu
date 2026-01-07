import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from './firebase';
import { Farm, CreateFarmData, UpdateFarmData } from '../types/farms';

// Create a new farm
export const createFarm = async (
  userId: string,
  data: CreateFarmData
): Promise<string> => {
  const farmsRef = collection(db, 'farms');
  const farmDoc = doc(farmsRef);
  const farmId = farmDoc.id;

  const farmData: Record<string, any> = {
    id: farmId,
    userId,
    name: data.name,
    location: data.location,
    status: 'active',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  // Only add imageUrl if it's provided
  if (data.imageUrl) {
    farmData.imageUrl = data.imageUrl;
  }

  await setDoc(farmDoc, farmData);

  return farmId;
};

// Get all active farms for a user
export const getFarmsByUser = async (userId: string): Promise<Farm[]> => {
  const farmsRef = collection(db, 'farms');
  const q = query(
    farmsRef,
    where('userId', '==', userId),
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: data.id,
      userId: data.userId,
      name: data.name,
      location: data.location,
      imageUrl: data.imageUrl,
      status: data.status,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
      archivedAt: data.archivedAt?.toDate(),
    } as Farm;
  });
};

// Get a single farm by ID
export const getFarm = async (farmId: string): Promise<Farm | null> => {
  const farmRef = doc(db, 'farms', farmId);
  const snapshot = await getDoc(farmRef);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();
  return {
    id: data.id,
    userId: data.userId,
    name: data.name,
    location: data.location,
    imageUrl: data.imageUrl,
    status: data.status,
    createdAt: data.createdAt?.toDate(),
    updatedAt: data.updatedAt?.toDate(),
    archivedAt: data.archivedAt?.toDate(),
  };
};

// Update a farm
export const updateFarm = async (
  farmId: string,
  data: UpdateFarmData
): Promise<void> => {
  const farmRef = doc(db, 'farms', farmId);

  await updateDoc(farmRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

// Archive a farm
export const archiveFarm = async (farmId: string): Promise<void> => {
  const farmRef = doc(db, 'farms', farmId);

  await updateDoc(farmRef, {
    status: 'archived',
    archivedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

// Upload farm image to Storage
export const uploadFarmImage = async (
  userId: string,
  farmId: string,
  uri: string
): Promise<string> => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const imageRef = ref(storage, `farms/${userId}/${farmId}/profile.jpg`);
  await uploadBytes(imageRef, blob);

  const downloadUrl = await getDownloadURL(imageRef);
  return downloadUrl;
};

// Delete farm image from Storage
export const deleteFarmImage = async (
  userId: string,
  farmId: string
): Promise<void> => {
  const imageRef = ref(storage, `farms/${userId}/${farmId}/profile.jpg`);
  try {
    await deleteObject(imageRef);
  } catch (error: any) {
    // Ignore if file doesn't exist
    if (error.code !== 'storage/object-not-found') {
      throw error;
    }
  }
};
