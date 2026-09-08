import { z } from "zod";
import {
  optionalDigitsOnlyString,
  optionalNonNegativeNumberField,
} from "./helpers";

export const FileInfoSchema = z.object({
  importer: z.string().trim().nonempty("Importer name is required"),
  itemPackage: z.string().trim().nonempty("Package details is required"),
  itemName: z.string().trim().nonempty("Item name is required"),
  lc: optionalDigitsOnlyString("LC"),
  be: optionalNonNegativeNumberField("BE"),
  bl: z.string().nullable().optional(),
  rotNo: z.string().nullable().optional(),
  status: z.string().trim().nonempty("Status is required"),
});

export type FileInfoFormInput = z.input<typeof FileInfoSchema>;
export type FileInfoFormOutput = z.output<typeof FileInfoSchema>;
