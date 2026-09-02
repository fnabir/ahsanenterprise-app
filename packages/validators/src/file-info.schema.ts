import { z } from "zod";

const optionalDigitsOnly = z
  .string()
  .trim()
  .refine((val) => val === "" || /^\d+$/.test(val), {
    error: "Only numeric characters are allowed",
  })
  .transform((val) => (val === "" ? undefined : val))
  .optional();

export const FileInfoSchema = z.object({
  importer: z.string("Importer name is required"),
  itemPackage: z.string("Package details is required"),
  itemName: z.string("Item name is required"),
  lc: optionalDigitsOnly,
  be: z.number().optional(),
  bl: z.string().optional(),
  rotNo: z.string().optional(),
  status: z.string().optional(),
});

export type FileInfoFormValues = z.infer<typeof FileInfoSchema>;
