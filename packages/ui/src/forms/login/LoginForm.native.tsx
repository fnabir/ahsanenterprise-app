import { Message } from "../../core/message/Message.native";
import { Button } from "../../core/button";
import { FormInput } from "../../form-field/FormInput";
import { useLoginForm } from "./useLoginForm";
import { TextInput, View } from "react-native";
import { useRef } from "react";

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

  const passwordRef = useRef<TextInput>(null);

  return (
    <View className="flex-col gap-4">
      <FormInput
        name="email"
        control={control}
        label="Email"
        placeholder="user@asianliftbd.com"
        disabled={loading}
        submitAction="next"
        nextInputRef={passwordRef}
        required
      />
      <FormInput
        name="password"
        control={control}
        label="Password"
        placeholder="••••••••"
        type="password"
        onSubmitEditing={handleSubmit(onSubmit)}
        submitAction="done"
        disabled={loading}
        required
        inputRef={passwordRef}
      />
      <Button
        loading={loading || isSubmitting}
        label={buttonLabel}
        disabled={loading || isSubmitting}
        onClick={handleSubmit(onSubmit)}
        variant={
          ["Access denied", "Login failed"].includes(buttonLabel)
            ? "danger"
            : "primary"
        }
      />
      <Message type="error" message={authError} />
    </View>
  );
}
