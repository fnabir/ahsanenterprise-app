import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StoreInitializer } from '../../../../packages/ui/src/contexts/StoreInitializer';
import {
  PublicSans_400Regular,
  PublicSans_500Medium,
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
import { ToastProvider } from '../../../../packages/ui/src/core/toast/toast-provider.native';
import { NavigationLoadingProvider } from '@/contexts/NavigationLoadingContext';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const theme = useColorScheme();

  const [fontsLoaded] = useFonts({
    PublicSans_400Regular,
    PublicSans_500Medium,
    PublicSans_600SemiBold,
    PublicSans_700Bold,
    IBMPlexMono_400Regular,
    IBMPlexMono_600SemiBold,
    IBMPlexMono_700Bold,
  });

  SplashScreen.setOptions({
    duration: 1000,
    fade: true,
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

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
        <NavigationLoadingProvider>
          <AuthGuard>
            <StoreInitializer />
            <ToastProvider />
            <StatusBar animated={true} />
          </AuthGuard>
        </NavigationLoadingProvider>
      </AuthProvider>
    </>
  );
}
