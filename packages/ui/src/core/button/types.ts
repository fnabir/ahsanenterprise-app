export type ButtonVariant =
  | "default"
  | "primary"
  | "danger"
  | "outline"
  | "transparent"
  | "custom"
  | "subtle";

export interface ButtonProps {
  label?: string;
  loadingLabel?: string;

  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";

  loading?: boolean;
  disabled?: boolean;

  onClick?: () => void;

  ariaLabel?: string;
  className?: string;
  textClassName?: string;
  iconSize?: number;
  iconClassName?: string;
}
