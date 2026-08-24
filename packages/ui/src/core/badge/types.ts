export type BadgeVariant =
  "default" | "info" | "outline" | "success" | "warning" | "error";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}
