export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  VerifyEmail: { email: string };
};

export type MainStackParamList = {
  Welcome: undefined;
  Dashboard: undefined;
  AddFarm: undefined;
  EditFarm: { farmId: string };
  Home: undefined;
};

export type RootStackParamList = AuthStackParamList & MainStackParamList;
