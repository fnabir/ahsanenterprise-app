"use client";

import { InputProps } from "./types";
import { inputStyles } from "./styles";
import { useState } from "react";
import { Label } from "../label";
import { forwardRef } from "react";

type InputType = "text" | "email" | "password" | "number" | "date";

export const Input = forwardRef<
  HTMLInputElement,
  InputProps & { type?: InputType }
>(
  (
    {
      value,
      onChangeText,
      onBlur,
      label,
      placeholder,
      helperText,
      error,
      type = "text",
      allowDecimal = false,
      disabled,
      required,
      startAdornment,
      endAdornment,
      className = "",
      onSubmit,
      onSubmitEditing,
      submitAction,
      nextInputRef,
    },
    ref,
  ) => {
    const secureTextEntry = type === "password";
    const [showPassword, setShowPassword] = useState(false);

    const isNumber = type === "number";

    const sanitizeNumeric = (raw: string) => {
      let val = raw;

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
            ref={ref}
            onKeyDown={(e) => {
              if (e.key !== "Enter") {
                return;
              }

              const submitHandler = onSubmitEditing ?? onSubmit;
              const hasCustomSubmit =
                submitAction === "next" ||
                Boolean(submitHandler);

              if (!hasCustomSubmit) {
                return;
              }

              e.preventDefault();

              if (submitAction === "next") {
                nextInputRef?.current?.focus();
                return;
              }

              submitHandler?.();
            }}
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
  },
);
