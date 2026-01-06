import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useAuthContext } from '../hooks/useAuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { AuthStackParamList, MainStackParamList } from '../types/navigation';
import * as Linking from 'expo-linking';
import { cowboyTheme } from '../theme';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();

const linking = {
  prefixes: [Linking.createURL('/'), 'micromuu://'],
  config: {
    screens: {
      Login: 'auth/callback',
      Register: 'register',
      Welcome: 'welcome',
    },
  },
};

const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: cowboyTheme.colors.background },
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

const MainNavigator: React.FC = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: cowboyTheme.colors.background },
      }}
    >
      <MainStack.Screen name="Welcome" component={WelcomeScreen} />
    </MainStack.Navigator>
  );
};

const LoadingScreen: React.FC = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={cowboyTheme.colors.primary} />
  </View>
);

export const AppNavigator: React.FC = () => {
  const { isLoading, isAuthenticated, isNewUser, hasProfile } = useAuthContext();

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Show auth screens if not authenticated
  if (!isAuthenticated) {
    return (
      <NavigationContainer linking={linking}>
        <AuthNavigator />
      </NavigationContainer>
    );
  }

  // Show welcome screen for new users or users who just registered
  if (isNewUser || hasProfile) {
    return (
      <NavigationContainer linking={linking}>
        <MainNavigator />
      </NavigationContainer>
    );
  }

  // Fallback to main navigator
  return (
    <NavigationContainer linking={linking}>
      <MainNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
  },
});
