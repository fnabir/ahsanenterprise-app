import { CheckboxProps } from "./types";

export function Checkbox({
  value,
  onChange,
  label,
  disabled,
  error,
  helperText,
  className,
}: CheckboxProps) {
  return (
    <div className={`flex flex-col gap-1 ${className ?? ""}`}>
      <label
        className={`flex items-center gap-2 cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className={`size-4 rounded accent-primary cursor-pointer ${error ? "outline outline-error" : ""}`}
        />
        {label && <span className="text-primary">{label}</span>}
      </label>
      {error ? (
        <p className="text-xs text-danger">{error}</p>
      ) : (
        helperText && <p className="text-xs text-muted">{helperText}</p>
      )}
    </div>
  );
}
