export function Label({
  text,
  className,
  required,
}: {
  text?: string;
  className?: string;
  required?: boolean;
}) {
  if (!text) return null;

  return (
    <label className={`text-[13px] text-primary select-none ${className}`}>
      {text}
      {required && <span className="text-danger">*</span>}
    </label>
  );
}
