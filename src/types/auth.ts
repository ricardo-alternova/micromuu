import { User } from 'firebase/auth';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface RegistrationData {
  name: string;
  lastName: string;
  email: string;
}

export interface PendingRegistration extends RegistrationData {
  timestamp: number;
}
