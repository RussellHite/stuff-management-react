import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
  Besley_400Regular,
  Besley_500Medium,
  Besley_600SemiBold,
  Besley_700Bold,
} from '@expo-google-fonts/besley';
import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import { semanticColors } from '../src/design';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Besley_400Regular,
    Besley_500Medium,
    Besley_600SemiBold,
    Besley_700Bold,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    // Add aliases for easier use
    Besley: Besley_400Regular,
    'Besley-Medium': Besley_500Medium,
    'Besley-SemiBold': Besley_600SemiBold,
    'Besley-Bold': Besley_700Bold,
    Montserrat: Montserrat_400Regular,
    'Montserrat-Light': Montserrat_300Light,
    'Montserrat-Medium': Montserrat_500Medium,
    'Montserrat-SemiBold': Montserrat_600SemiBold,
    'Montserrat-Bold': Montserrat_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="design-system" options={{ headerShown: false }} />
      <Stack.Screen name="app-settings" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false }} />
      <Stack.Screen name="developer-tools" options={{ headerShown: false }} />
      <Stack.Screen name="authentication" options={{ headerShown: false }} />
    </Stack>
  );
}
