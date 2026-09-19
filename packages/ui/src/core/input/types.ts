export type ReturnKeyType = "done" | "go" | "next" | "search" | "send";

export interface InputProps {
  value?: string | number;
  onChangeText?: (text: string) => void;
  onBlur?: (value?: string) => void;

  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;

  secureTextEntry?: boolean;
  disabled?: boolean;
  required?: boolean;

  allowDecimal?: boolean;

  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  returnKeyType?: ReturnKeyType;
  className?: string;
}
