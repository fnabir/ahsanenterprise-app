import { styleVariant } from "./styles";
import { BadgeVariant } from "./types";

export function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: BadgeVariant }) {
  return (
    <div
      className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-sm select-none ${styleVariant[variant]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
}
