export type SelectValue = string | number;

export type SelectOption<T extends SelectValue = string> = {
  value: T;
  label?: string;
  disabled?: boolean;
};

export interface SelectProps<T extends SelectValue = string> {
  value?: T | null;
  onChange?: (value: T) => void;
  onBlur?: () => void;

  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;

  options: SelectOption<T>[];

  className?: string;
}
