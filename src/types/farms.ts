export interface Farm {
  id: string;
  userId: string;
  name: string;
  location: string;
  imageUrl?: string;
  status: 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;
}

export interface CreateFarmData {
  name: string;
  location: string;
  imageUrl?: string;
}

export interface UpdateFarmData {
  name?: string;
  location?: string;
  imageUrl?: string;
}

export type FarmStatus = 'active' | 'archived';
