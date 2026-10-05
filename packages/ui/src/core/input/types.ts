export type InputSubmitAction = "next" | "done" | "go" | "search" | "send";

export type FocusableInputRef = {
  focus: () => void;
};

export interface InputProps {
  value?: string | number;
  onChangeText?: (text: string) => void;
  onBlur?: (value?: string) => void;
  onSubmit?: () => void;
  onSubmitEditing?: () => void;

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
  submitAction?: InputSubmitAction;
  nextInputRef?: React.RefObject<FocusableInputRef | null>;
  className?: string;
}
