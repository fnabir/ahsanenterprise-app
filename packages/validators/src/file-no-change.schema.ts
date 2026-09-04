import { z } from "zod";

export const FileNoChangeSchema = z
  .object({
    fileNo1: z
      .number("File number required.")
      .min(1, "File number starts from 1."),
    fileNo2: z
      .number("File number required.")
      .min(1, "File number starts from 1."),
  })
  .refine((data) => data.fileNo1 !== data.fileNo2, {
    path: ["fileNo2"],
    message: "New file number must be different from the current file number",
  });

export type FileNoChangeFormValues = z.infer<typeof FileNoChangeSchema>;
