import { z } from "zod";
import { numberField } from "./helpers";

export const FileNoChangeSchema = z
  .object({
    fileNo1: numberField("File No").superRefine((val, ctx) => {
      if (val < 0) {
        ctx.addIssue({
          code: "custom",
          message: "File number starts from 1.",
        });
      }
    }),
    fileNo2: numberField("File No").superRefine((val, ctx) => {
      if (val < 0) {
        ctx.addIssue({
          code: "custom",
          message: "File number starts from 1.",
        });
      }
    }),
  })
  .refine((data) => data.fileNo1 !== data.fileNo2, {
    path: ["fileNo2"],
    message: "File number must be different from the current file number",
  });

export type FileNoChangeFormInput = z.input<typeof FileNoChangeSchema>;
export type FileNoChangeFormOutput = z.output<typeof FileNoChangeSchema>;
