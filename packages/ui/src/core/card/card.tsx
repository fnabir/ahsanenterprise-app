const Card = ({
  children,
  className,
  clickable,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { clickable?: boolean }) => {
  return (
    <div
      className={`bg-surface border px-3 lg:px-6 py-1.5 lg:py-3 rounded-lg shadow hover:shadow-md transition-all ${clickable ? "hover:border-primary hover:cursor-pointer" : ""} ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card };
