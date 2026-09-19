import { Button } from "../../core/button";
import { FormInput } from "../../form-field/FormInput";
import { useLoginForm } from "./useLoginForm";
import { View, Text } from "react-native";

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const {
    control,
    handleSubmit,
    onSubmit,
    loading,
    isSubmitting,
    buttonLabel,
    authError,
  } = useLoginForm(onSuccess);

  return (
    <View>
      <FormInput
        name="email"
        control={control}
        label="Email"
        placeholder="user@asianliftbd.com"
        disabled={loading}
        returnKeyType="next"
        required
      />
      <FormInput
        name="password"
        control={control}
        label="Password"
        placeholder="••••••••"
        type="password"
        returnKeyType="done"
        disabled={loading}
        required
      />
      <Button
        type="submit"
        loading={loading || isSubmitting}
        label={buttonLabel}
        aria-label="Login Button"
        disabled={loading || isSubmitting}
        onClick={handleSubmit(onSubmit)}
        className="w-full text-base! mt-6"
        variant={
          ["Login", "Logging in…", "Access granted"].includes(buttonLabel)
            ? "primary"
            : "danger"
        }
      />

      {authError && <Text className="text-red-500">{authError}</Text>}
    </View>
  );
}
