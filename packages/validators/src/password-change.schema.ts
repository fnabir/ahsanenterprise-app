import { z } from "zod";

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().nonempty("Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters long"),
    confirmNewPassword: z.string().nonempty("Confirm new password is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    error: "Passwords do not match",
  });

export type PasswordChangeFormValues = z.infer<typeof passwordChangeSchema>;
