const Skeleton = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`flex flex-col bg-surface px-4 lg:px-6 py-1.5 lg:py-3 gap-2 animate-pulse *:bg-foreground/20 *:rounded-md ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { Skeleton };
