import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Input, InputProps } from "../../core/input/input.native";

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
} & Omit<InputProps, "value" | "onChangeText">;

export function FormInput<T extends FieldValues>({
  name,
  control,
  ...props
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          {...props}
          value={
            props.type === "number"
              ? field.value === 0
                ? ""
                : String(field.value ?? "")
              : String(field.value ?? "")
          }
          onChangeText={(text: string) => {
            if (props.type === "number") {
              const trimmed = text.trim();
              if (trimmed === "") {
                field.onChange("");
                return;
              }

              // Keep raw text while typing; normalize on blur.
              field.onChange(trimmed);
            } else {
              field.onChange(text);
            }
          }}
          onBlur={(rawValue) => {
            if (props.type === "number") {
              const trimmed = String(rawValue ?? "").trim();
              if (trimmed === "" || trimmed === "." || trimmed === ",") {
                field.onChange(undefined);
              } else {
                const normalized = props.allowDecimal
                  ? trimmed.replace(",", ".")
                  : trimmed;
                const num = Number(normalized);
                field.onChange(Number.isNaN(num) ? undefined : num);
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
