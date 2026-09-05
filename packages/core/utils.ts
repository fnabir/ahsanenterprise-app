import { FILE_DB_KEY_PREFIX } from "./constants";
import { parse, isValid, format } from "date-fns";

type ClassValue = string | number | boolean | undefined | null;

export function cn(...inputs: (ClassValue | ClassValue[])[]): string {
  return inputs
    .flat(Infinity)
    .filter((x) => typeof x === "string" && x.length > 0)
    .join(" ");
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function toFileDbKey(fileNo: number | string): string {
  const normalized = String(fileNo).trim();
  return normalized.startsWith(FILE_DB_KEY_PREFIX)
    ? normalized
    : `${FILE_DB_KEY_PREFIX}${normalized}`;
}

export function fromFileDbKey(fileKey: string): string {
  return fileKey.startsWith(FILE_DB_KEY_PREFIX)
    ? fileKey.slice(FILE_DB_KEY_PREFIX.length)
    : fileKey;
}

export function getFullFileNo(
  fileNo: number | string,
  year: number | string,
  fileType?: "export" | "import",
): string {
  if (Number(fileNo) < 0) {
    throw new Error("File number cannot be negative.");
  }
  const yearNumber = Number(year);
  if (yearNumber < 2000 || yearNumber > 9999) {
    throw new Error("Invalid file year.");
  }
  const typeCode = fileType ? fileType.slice(0, 3).toUpperCase() : "IMP";
  const fileNoFormatted = fileNo.toString().padStart(2, "0");
  return `AE/${typeCode}/${fileNoFormatted}/${year}`;
}

export function getFullRequisitionNo(
  requisitionNo: number | string,
  year: number | string,
): string {
  if (Number(requisitionNo) < 0) {
    throw new Error("Requisition number cannot be negative.");
  }
  const yearNumber = Number(year);
  if (yearNumber < 2000 || yearNumber > 9999) {
    throw new Error("Invalid requisition year.");
  }
  const requisitionNoFormatted = requisitionNo.toString().padStart(2, "0");
  return `AE/POR/${requisitionNoFormatted}/${year}`;
}

export function fromISODate(dateFormat: string, value?: string) {
  if (!value) return "";
  const date = parse(value, "yyyy-MM-dd", new Date());
  return isValid(date) ? format(date, dateFormat) : "";
}
