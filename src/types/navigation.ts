export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  VerifyEmail: { email: string };
};

export type MainStackParamList = {
  Welcome: undefined;
};

export type RootStackParamList = AuthStackParamList & MainStackParamList;
