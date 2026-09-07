"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Input } from "../../core/input";

export function FormInput<T extends FieldValues>({
  name,
  control,
  ...props
}: {
  name: Path<T>;
  control: Control<T>;
} & Omit<React.ComponentProps<typeof Input>, "value" | "onChangeText">) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          {...props}
          value={field.value ?? ""}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
