import { Control, FieldValues, Path } from "react-hook-form";

export type FormTextareaProps<
  T extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = T,
> = {
  name: Path<T>;
  control: Control<T, TContext, TTransformedValues>;
  label?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
};
