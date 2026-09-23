import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginForm } from '../../../../../packages/ui/src/forms/login/LoginForm';

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex flex-col items-center justify-center gap-2 space-y-2">
      <LoginForm />
    </SafeAreaView>
  );
}
