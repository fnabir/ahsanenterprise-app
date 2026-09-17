import { z } from "zod";

export const UserDetailsSchema = z.object({
  name: z.string().nonempty("Name is required"),
  phone: z.string().optional(),
});

export type UserDetailsFormValues = z.infer<typeof UserDetailsSchema>;
