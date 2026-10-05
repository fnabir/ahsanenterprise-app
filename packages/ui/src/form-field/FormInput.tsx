"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import type { FocusableInputRef } from "../core/input/types";
import { Input } from "../core/input";

const assignRef = <T,>(ref: React.Ref<T> | undefined, value: T) => {
  if (!ref) return;

  if (typeof ref === "function") {
    ref(value);
    return;
  }

  (ref as React.MutableRefObject<T>).current = value;
};

type FormInputProps<
  T extends FieldValues,
  TContext,
  TTransformedValues extends FieldValues | undefined,
> = {
  name: Path<T>;
  control: Control<T, TContext, TTransformedValues>;
  inputRef?: React.RefObject<FocusableInputRef | null>;
} & Omit<
  React.ComponentProps<typeof Input>,
  "value" | "onChangeText" | "ref"
>;

export function FormInput<
  T extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = T,
>({
  name,
  control,
  inputRef,
  ...props
}: FormInputProps<T, TContext, TTransformedValues>) {
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
          ref={(instance) => {
            assignRef(field.ref, instance);
            assignRef(inputRef, instance);
          }}
        />
      )}
    />
  );
}
