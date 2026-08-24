"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Checkbox, CheckboxProps } from "../core/checkbox";

type FormCheckboxProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
} & Omit<CheckboxProps, "value" | "onChange" | "error">;

export function FormCheckbox<T extends FieldValues>({
  name,
  control,
  ...props
}: FormCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Checkbox
          {...props}
          value={!!field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
