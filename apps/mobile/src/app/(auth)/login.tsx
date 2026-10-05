import { LoginForm } from '../../../../../packages/ui/src/forms/login/LoginForm';
import { View, Text, Image, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';

export default function LoginScreen() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // adjust if needed
    >
      <ScrollView
        className="py-safe"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View className="flex-col justify-center gap-2 p-4">
          <Image
            source={require('../../../assets/adaptive-icon.png')}
            className="mx-auto h-20 w-20 rounded-lg"
            resizeMode="contain"
          />
          <Text className="text-foreground font-sans-bold mb-8 text-center text-3xl">
            AHSAN ENTERPRISE
          </Text>
          <View className="mb-6">
            <Text className="text-foreground font-sans-bold text-center text-2xl">
              Welcome Back
            </Text>
            <Text className="text-foreground font-sans-medium text-center text-lg">
              Login to your account to continue
            </Text>
          </View>

          <LoginForm />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
