import { z } from "zod";

export const passwordForgetSchema = z.object({
  email: z.email("Invalid email"),
});

export type PasswordForgetFormValues = z.infer<typeof passwordForgetSchema>;
