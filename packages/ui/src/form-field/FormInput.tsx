"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import type { ReturnKeyType } from "../core/input/types";
import { Input } from "../core/input";

export function FormInput<
  T extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = T,
>({
  name,
  control,
  returnKeyType,
  ...props
}: {
  name: Path<T>;
  control: Control<T, TContext, TTransformedValues>;
  returnKeyType?: ReturnKeyType;
} & Omit<
  React.ComponentProps<typeof Input>,
  "value" | "onChangeText" | "returnKeyType"
>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          returnKeyType={returnKeyType}
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
