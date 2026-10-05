export interface MessageProps {
  variant?: "soft" | "outline";
  message?: string | null;
  type?: "info" | "success" | "error" | "warning";
  className?: string;
}
