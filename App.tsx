import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import {
  Rajdhani_500Medium,
  Rajdhani_700Bold,
} from '@expo-google-fonts/rajdhani';

import { Routes } from './src/routes';
import { AuthProvider } from './src/hooks/auth';

import AppLoading from 'expo-app-loading';
import { Background } from './src/components/Background';

LogBox.ignoreLogs([
  'You are not currently signed in to Expo on your development machine.',
]);

export default function App() {
  // hook para utilizar as fontes. Sempre declarar antes do return
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold,
  });

  // Enquanto a fonte não carregar, esse componente vai seguar a tela de splash
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Background>
  );
}
