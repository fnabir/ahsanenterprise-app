import Link from "next/link";
import { cn } from "../../../../core/utils";
import type { CardProps } from "./types";

const Card = ({ children, className, clickable, href }: CardProps) => {
  const classNameComputed = cn(
    "bg-surface border px-2 lg:px-4 py-1.5 lg:py-3 rounded-lg shadow hover:shadow-md transition-all",
    href || clickable ? "hover:border-primary hover:cursor-pointer" : "",
    className ?? "",
  );

  if (href) {
    return (
      <Link href={href} className={classNameComputed}>
        {children}
      </Link>
    );
  }

  return <div className={classNameComputed}>{children}</div>;
};

export { Card };
