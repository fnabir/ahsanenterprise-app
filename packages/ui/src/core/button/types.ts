export type ButtonVariant =
  | "default"
  | "primary"
  | "danger"
  | "outline"
  | "transparent"
  | "custom"
  | "subtle"
  | "muted";

export interface ButtonProps {
  label?: string;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";

  loading?: boolean;
  disabled?: boolean;
  Icon?: React.ReactNode;

  onClick?: () => void;

  ariaLabel?: string;
  className?: string;
  textClassName?: string;
  iconSize?: number;
  iconClassName?: string;
}
