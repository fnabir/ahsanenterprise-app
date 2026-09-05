import { FileData, RequisitionData } from "@repo/types";
import { getDatabaseReference } from "./helpers";
import { remove, set, update, get } from "firebase/database";
import {
  REQUISITION_DB_KEY_PREFIX,
  getFullFileNo,
  toFileDbKey,
} from "../../core";
import { toast } from "../../ui";
import { FirebaseError } from "firebase/app";

export async function addNewFile(
  fileNo: number | string,
  fileYear: number,
  data: FileData,
) {
  const fileKey = toFileDbKey(fileNo);
  const fileRef = getDatabaseReference(`file/${fileYear}/${fileKey}`);
  try {
    await set(fileRef, data);
    toast.success("New file added successfully.");
  } catch (error) {
    toast.error("Failed to add the new file", (error as FirebaseError).message);
  }
}

export async function updateFile(
  fileNo: number | string,
  fileYear: number,
  data: FileData,
) {
  const prefixedRef = getDatabaseReference(
    `file/${fileYear}/${toFileDbKey(fileNo)}`,
  );
  const legacyRef = getDatabaseReference(`file/${fileYear}/${fileNo}`);

  try {
    const prefixedSnapshot = await get(prefixedRef);
    const fileRef = prefixedSnapshot.exists() ? prefixedRef : legacyRef;

    await update(fileRef, data);
    toast.success("File updated successfully.");
  } catch (error) {
    toast.error("Failed to update the file", (error as FirebaseError).message);
  }
}

export async function updateFileStatus(
  fileNo: number | string,
  fileYear: number | string,
  currentStatus: string,
  status: string,
) {
  const fileCode = getFullFileNo(fileNo, fileYear);
  const prefixedRef = getDatabaseReference(
    `file/${fileYear}/${toFileDbKey(fileNo)}`,
  );
  const legacyRef = getDatabaseReference(`file/${fileYear}/${fileNo}`);

  try {
    const prefixedSnapshot = await get(prefixedRef);
    const fileRef = prefixedSnapshot.exists() ? prefixedRef : legacyRef;

    await update(fileRef, { status });
    const toastId = toast.add({
      title: fileCode,
      description: "File status updated successfully.",
      type: "success",
      actionLabel: "Undo",
      action: async () => {
        toast.close(toastId);
        try {
          await update(fileRef, { status: currentStatus });
          toast.success(fileCode, "Status reverted successfully.");
        } catch {
          toast.error(fileCode, "Failed to revert the file status.");
        }
      },
    });
  } catch {
    toast.error(fileCode, "Failed to update the file status.");
  }
}

export async function deleteFile(
  fileNo: number | string,
  fileYear: number | string,
) {
  const fileNoStr = String(fileNo);
  const fileCode = getFullFileNo(fileNo, fileYear);
  const prefixedRef = getDatabaseReference(
    `file/${fileYear}/${toFileDbKey(fileNoStr)}`,
  );
  const legacyRef = getDatabaseReference(`file/${fileYear}/${fileNoStr}`);

  try {
    await Promise.all([remove(prefixedRef), remove(legacyRef)]);
    toast.success(fileCode, "File deleted successfully.");
  } catch (error) {
    console.error("Failed to delete the file:", error);
    toast.error(fileCode, "Failed to delete the file.");
  }
}

export async function changeFileNo(
  currentFileNo: number | string,
  newFileNo: number | string,
  fileYear: number | string,
  currentFileVal: FileData,
  newFileVal?: FileData,
) {
  const currentFileNoStr = String(currentFileNo);
  const newFileNoStr = String(newFileNo);
  const currentFileKey = toFileDbKey(currentFileNo);
  const newFileKey = toFileDbKey(newFileNo);

  const currentFileRef = getDatabaseReference(
    `file/${fileYear}/${currentFileKey}`,
  );
  const newFileRef = getDatabaseReference(`file/${fileYear}/${newFileKey}`);
  const currentLegacyRef = getDatabaseReference(
    `file/${fileYear}/${currentFileNoStr}`,
  );
  const newLegacyRef = getDatabaseReference(`file/${fileYear}/${newFileNoStr}`);

  try {
    await Promise.all([remove(currentFileRef), remove(currentLegacyRef)]);
    if (!newFileVal) {
      await set(newFileRef, currentFileVal);
    } else {
      await Promise.all([remove(newFileRef), remove(newLegacyRef)]);
      await set(newFileRef, currentFileVal);
      await set(currentFileRef, newFileVal);
    }
    toast.success("File number changed successfully.");
  } catch (error) {
    console.error("Failed to change the file number:", error);
    toast.error(
      "Failed to change the file number",
      (error as FirebaseError).message,
    );
  }
}

export function toRequisitionDbKey(requisitionNo: number | string): string {
  const normalized = String(requisitionNo).trim();
  return normalized.startsWith(REQUISITION_DB_KEY_PREFIX)
    ? normalized
    : `${REQUISITION_DB_KEY_PREFIX}${normalized}`;
}

export async function addNewRequisition(
  requisitionNo: number | string,
  requisitionYear: number,
  data: RequisitionData,
) {
  const requisitionKey = toRequisitionDbKey(requisitionNo);
  const requisitionRef = getDatabaseReference(
    `requisition/${requisitionYear}/${requisitionKey}`,
  );
  try {
    await set(requisitionRef, data);
    toast.success("New requisition added successfully.");
  } catch (error) {
    toast.error(
      "Failed to add the new requisition",
      (error as FirebaseError).message,
    );
  }
}

export async function updateRequisition(
  requisitionNo: number | string,
  requisitionYear: number,
  data: Partial<RequisitionData>,
) {
  const requisitionKey = toRequisitionDbKey(requisitionNo);
  const requisitionRef = getDatabaseReference(
    `requisition/${requisitionYear}/${requisitionKey}`,
  );
  try {
    await update(requisitionRef, data);
    toast.success("Requisition updated successfully.");
  } catch (error) {
    toast.error(
      "Failed to update the requisition",
      (error as FirebaseError).message,
    );
  }
}

export async function deleteRequisition(
  requisitionNo: number | string,
  requisitionYear: number | string,
) {
  const requisitionNoStr = String(requisitionNo);
  const prefixedRef = getDatabaseReference(
    `requisition/${requisitionYear}/${toRequisitionDbKey(requisitionNoStr)}`,
  );
  const legacyRef = getDatabaseReference(
    `requisition/${requisitionYear}/${requisitionNoStr}`,
  );

  try {
    await Promise.all([remove(prefixedRef), remove(legacyRef)]);

    toast.success("Deleted the requisition successfully.");
  } catch (error) {
    console.error("Failed to delete the requisition:", error);
    toast.error(
      "Failed to delete the requisition",
      (error as FirebaseError).message,
    );
  }
}
