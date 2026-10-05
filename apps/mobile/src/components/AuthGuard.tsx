import { View, ActivityIndicator, Text } from 'react-native';
import { useAuth } from '../../../../packages/ui/src/contexts/AuthContext';
import { useSegments } from 'expo-router';
import Loading from './Loading';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const segments = useSegments();

  const inAuthGroup = segments[0] === '(auth)';

  // Show loading during auth check or when on protected route without user
  if (loading || (!inAuthGroup && !user)) {
    return (
      <View className="bg-background py-safe flex-1 items-center justify-center">
        <Loading />
      </View>
    );
  }

  return <>{children}</>;
}
