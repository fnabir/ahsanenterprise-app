"use client";

import { SelectProps, SelectValue } from "./types";
import { FaChevronDown } from "react-icons/fa6";
import { Label } from "../label";

export function Select<T extends SelectValue = string>({
  value,
  onChange,
  onBlur,
  label,
  placeholder = "Select…",
  helperText,
  error,
  options,
  disabled,
  required,
  className = "",
}: SelectProps<T>) {
  return (
    <div className={`w-full space-y-1 ${className}`}>
      <Label text={label} required={required} />

      <div
        className={`
          relative rounded-lg border bg-card transition-colors duration-150
          ${error ? "border-danger" : "border-muted/50"}
          ${disabled ? "opacity-70" : "focus-within:border-primary"}
        `}
      >
        <select
          value={value == null ? "" : String(value)}
          onChange={(e) => {
            const rawValue = e.target.value;
            const selectedOption = options.find(
              (option) => String(option.value) === rawValue,
            );

            onChange?.((selectedOption?.value ?? (rawValue as T)) as T);
          }}
          onBlur={() => onBlur?.()}
          disabled={disabled}
          className={`
            w-full px-3 py-1 text-sm rounded-lg bg-transparent text-foreground
            outline-none appearance-none pr-10 border-none
            focus:outline-none focus:ring-0
            disabled:cursor-not-allowed
            [color-scheme:light] dark:[color-scheme:dark]
          `}
        >
          <option value="" className="bg-surface text-foreground">
            {placeholder}
          </option>

          {options.map((o) => (
            <option
              key={o.value}
              value={String(o.value)}
              disabled={o.disabled ?? false}
              className="bg-surface-raised text-foreground"
            >
              {o.label ?? o.value}
            </option>
          ))}
        </select>

        <FaChevronDown
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted"
          size={12}
        />
      </div>

      {error || helperText ? (
        <div className="text-xs text-muted mt-1">
          {error ? (
            <p className="text-danger">{error}</p>
          ) : (
            helperText && <p>{helperText}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
