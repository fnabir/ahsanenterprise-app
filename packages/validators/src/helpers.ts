import { z } from "zod";

export const optionalDigitsOnlyString = (label: string) =>
  z
    .string()
    .trim()
    .transform((val) => (val === "" ? null : val))
    .refine(
      (val) => val === null || /^\d+$/.test(val),
      `${label} must contain digits only`,
    )
    .nullable()
    .optional();

/** Required numeric field backed by a text input. */
export const numberField = (label = "Value") =>
  z
    .string()
    .min(1, `${label} is required`)
    .transform((val, ctx) => {
      const parsed = Number(val);
      if (Number.isNaN(parsed)) {
        ctx.addIssue({
          code: "custom",
          message: `${label} must be a number`,
        });
        return z.NEVER;
      }
      return parsed;
    });

/** Required numeric field that also can't be negative, e.g. amounts. */
export const nonNegativeNumberField = (label: string) =>
  numberField(label).superRefine((val, ctx) => {
    if (val < 0) {
      ctx.addIssue({
        code: "custom",
        message: `${label} cannot be negative`,
      });
    }
  });

/** Optional numeric field — empty input is valid and becomes `undefined`. */
export const optionalNumberField = (label = "Value") =>
  z
    .string()
    .optional()
    .transform((val, ctx) => {
      if (val === undefined || val === "") return undefined;
      const parsed = Number(val);
      if (Number.isNaN(parsed)) {
        ctx.addIssue({
          code: "custom",
          message: `${label} must be a number`,
        });
        return z.NEVER;
      }
      return parsed;
    });

/** Optional numeric field that can't be negative when provided. */
export const optionalNonNegativeNumberField = (label: string) =>
  optionalNumberField(label).superRefine((val, ctx) => {
    if (val !== undefined && val < 0) {
      ctx.addIssue({
        code: "custom",
        message: `${label} cannot be negative`,
      });
    }
  });
