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
          onChangeText={(value: string) => {
            if (props.type === "number") {
              const trimmed = value.trim();
              if (trimmed === "") {
                field.onChange("");
                return;
              }

              field.onChange(trimmed);
            } else {
              field.onChange(value);
            }
          }}
          onBlur={(rawValue) => {
            if (props.type === "number") {
              const trimmed = String(rawValue ?? "").trim();
              if (trimmed === "" || trimmed === "." || trimmed === ",") {
                field.onChange(undefined);
              } else {
                const normalized = trimmed.replace(",", ".");
                const parsed = Number(normalized);
                field.onChange(Number.isNaN(parsed) ? undefined : parsed);
              }
            }

            field.onBlur();
          }}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
