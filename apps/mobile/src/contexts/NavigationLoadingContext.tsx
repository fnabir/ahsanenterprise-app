import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useGlobalSearchParams, usePathname } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Loading from '@/components/Loading';

type NavigationLoadingContextValue = {
  isNavigating: boolean;
  startNavigation: () => void;
  stopNavigation: () => void;
};

const NavigationLoadingContext = createContext<NavigationLoadingContextValue | null>(null);

export function NavigationLoadingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useGlobalSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationStartRouteRef = useRef<string | null>(null);
  const hideFallbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const routeKey = useMemo(
    () => `${pathname}?${JSON.stringify(searchParams)}`,
    [pathname, searchParams]
  );

  const clearHideFallbackTimeout = () => {
    if (hideFallbackTimeoutRef.current !== null) {
      clearTimeout(hideFallbackTimeoutRef.current);
      hideFallbackTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (!isNavigating) return;
    if (navigationStartRouteRef.current === null) return;
    if (routeKey === navigationStartRouteRef.current) return;
    clearHideFallbackTimeout();
    setIsNavigating(false);
    navigationStartRouteRef.current = null;
  }, [routeKey, isNavigating]);

  useEffect(
    () => () => {
      clearHideFallbackTimeout();
    },
    []
  );

  const value = useMemo(
    () => ({
      isNavigating,
      startNavigation: () => {
        clearHideFallbackTimeout();
        navigationStartRouteRef.current = routeKey;
        setIsNavigating(true);
        hideFallbackTimeoutRef.current = setTimeout(() => {
          navigationStartRouteRef.current = null;
          setIsNavigating(false);
          hideFallbackTimeoutRef.current = null;
        }, 1500);
      },
      stopNavigation: () => {
        clearHideFallbackTimeout();
        navigationStartRouteRef.current = null;
        setIsNavigating(false);
      },
    }),
    [isNavigating, routeKey]
  );

  return (
    <NavigationLoadingContext.Provider value={value}>
      <View style={styles.container}>
        <View style={styles.content}>{children}</View>
        {isNavigating ? (
          <View style={styles.overlay}>
            <Loading text="Opening..." />
          </View>
        ) : null}
      </View>
    </NavigationLoadingContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 9999,
    elevation: 9999,
  },
});

export function useNavigationLoading() {
  const context = useContext(NavigationLoadingContext);
  if (!context) {
    throw new Error('useNavigationLoading must be used within NavigationLoadingProvider');
  }

  return context;
}
