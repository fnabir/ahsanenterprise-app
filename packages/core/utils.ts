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
