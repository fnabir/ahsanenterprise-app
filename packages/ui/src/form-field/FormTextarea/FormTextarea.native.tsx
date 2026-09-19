import type { FormTextareaProps } from "./types";
import { FieldValues, useController } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { Textarea } from "../../core/textarea";

export function FormTextarea<T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  placeholder,
  className,
  ...props
}: FormTextareaProps<T> & React.ComponentProps<typeof TextInput>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <View className={`gap-1 ${className ?? ""}`}>
      {label && (
        <Text className="text-sm text-primary font-medium">{label}</Text>
      )}

      <Textarea
        value={field.value}
        onChangeText={field.onChange}
        placeholder={placeholder}
        error={!!error}
        {...props}
      />

      {error ? (
        <Text className="text-sm text-error">{error.message}</Text>
      ) : (
        helperText && <Text className="text-sm text-muted">{helperText}</Text>
      )}
    </View>
  );
}
