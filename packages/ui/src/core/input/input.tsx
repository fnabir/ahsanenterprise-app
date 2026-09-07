"use client";

import { InputProps } from "./types";
import { inputStyles } from "./styles";
import { useState } from "react";
import { Label } from "../label";

export function Input(props: InputProps) {
  const {
    value,
    onChangeText,
    onBlur,
    label,
    placeholder,
    helperText,
    error,
    secureTextEntry,
    type = "text",
    allowDecimal = false,
    disabled,
    required,
    startAdornment,
    endAdornment,
    className = "",
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const isNumber = type === "number";

  const sanitizeNumeric = (raw: string) => {
    let val = raw.replace(/,/g, ".");

    if (allowDecimal) {
      val = val.replace(/[^0-9.]/g, "");

      const firstDotIndex = val.indexOf(".");
      if (firstDotIndex !== -1) {
        val =
          val.slice(0, firstDotIndex + 1) +
          val.slice(firstDotIndex + 1).replace(/\./g, "");
      }
    } else {
      val = val.replace(/[^0-9]/g, "");
    }

    return val;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const next = isNumber ? sanitizeNumeric(raw) : raw;
    onChangeText?.(next);
  };

  return (
    <div className={`w-full space-y-1 text-start ${className}`}>
      <Label text={label} required={required} />

      <div
        className={`${inputStyles.fieldWrapper}
          ${error ? "border-error" : "border-muted/50"}
          focus-within:border-primary
          ${disabled ? "opacity-70 pointer-events-none" : ""}
        `}
      >
        {startAdornment}

        <input
          value={value ?? ""}
          onChange={handleChange}
          onBlur={(e) => onBlur?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={inputStyles.field}
          type={
            secureTextEntry
              ? showPassword
                ? "text"
                : "password"
              : isNumber
                ? "text"
                : type
          }
          inputMode={
            isNumber ? (allowDecimal ? "decimal" : "numeric") : undefined
          }
          pattern={
            isNumber
              ? allowDecimal
                ? "[0-9]*[.,]?[0-9]*"
                : "[0-9]*"
              : undefined
          }
        />

        {secureTextEntry && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setShowPassword((p) => !p)}
            className="text-muted text-sm select-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}

        {endAdornment}
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
