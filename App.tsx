import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/hooks/useAuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { cowboyTheme } from './src/theme';
import './src/i18n';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={cowboyTheme}>
        <AuthProvider>
          <StatusBar style="dark" />
          <AppNavigator />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
