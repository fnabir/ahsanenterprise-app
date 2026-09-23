import { useFonts } from 'expo-font';
import { StoreInitializer } from '../../../../packages/ui/src/contexts/StoreInitializer';
import {
  PublicSans_400Regular,
  PublicSans_600SemiBold,
  PublicSans_700Bold,
} from '@expo-google-fonts/public-sans';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {
  IBMPlexMono_400Regular,
  IBMPlexMono_600SemiBold,
  IBMPlexMono_700Bold,
} from '@expo-google-fonts/ibm-plex-mono';
import '../global.css';
import { AuthProvider } from '../../../../packages/ui/src/contexts/AuthContext';
import { AuthGuard } from '@/components/AuthGuard';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PublicSans_400Regular,
    PublicSans_600SemiBold,
    PublicSans_700Bold,
    IBMPlexMono_400Regular,
    IBMPlexMono_600SemiBold,
    IBMPlexMono_700Bold,
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
    <>
      <AuthProvider>
        <AuthGuard>
          <StoreInitializer />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </AuthGuard>
      </AuthProvider>
    </>
  );
}
