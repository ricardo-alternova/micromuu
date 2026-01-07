import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useAuthContext } from '../hooks/useAuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { AddFarmScreen } from '../screens/AddFarmScreen';
import { EditFarmScreen } from '../screens/EditFarmScreen';
import { AuthStackParamList, MainStackParamList } from '../types/navigation';
import * as Linking from 'expo-linking';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();

const linking = {
  prefixes: [Linking.createURL('/'), 'micromuu://'],
  config: {
    screens: {
      Login: 'auth/callback',
      Register: 'register',
      Welcome: 'welcome',
      Dashboard: 'dashboard',
      AddFarm: 'farms/add',
      EditFarm: 'farms/:farmId',
    },
  },
};

const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

const MainNavigator: React.FC<{ initialRoute: 'Welcome' | 'Dashboard' }> = ({ initialRoute }) => {
  return (
    <MainStack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Welcome" component={WelcomeScreen} />
      <MainStack.Screen name="Dashboard" component={DashboardScreen} />
      <MainStack.Screen name="AddFarm" component={AddFarmScreen} />
      <MainStack.Screen name="EditFarm" component={EditFarmScreen} />
    </MainStack.Navigator>
  );
};

const LoadingScreen: React.FC = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" />
  </View>
);

export const AppNavigator: React.FC = () => {
  const { isLoading, isAuthenticated, isNewUser, hasProfile } = useAuthContext();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return (
      <NavigationContainer linking={linking}>
        <AuthNavigator />
      </NavigationContainer>
    );
  }

  // New users see Welcome screen first, returning users go to Dashboard
  const initialRoute = isNewUser ? 'Welcome' : 'Dashboard';

  return (
    <NavigationContainer linking={linking}>
      <MainNavigator initialRoute={initialRoute} />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
