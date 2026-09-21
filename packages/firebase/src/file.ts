import { FileData } from "@repo/types";
import { getDatabaseReference, sanitizeData } from "./helpers";
import { remove, set, update } from "firebase/database";
import { toFileDbKey } from "../../core/utils";
import { getFullFileNo } from "../../core/utils";
import { toast } from "../../ui/src/core/toast";
import { FirebaseError } from "firebase/app";

export async function addNewFile(
  fileNo: number | string,
  fileYear: number,
  data: FileData,
) {
  const fileKey = toFileDbKey(fileNo);
  const fileRef = getDatabaseReference(`file/${fileYear}/${fileKey}`);
  try {
    await set(fileRef, sanitizeData(data));
    toast.success("New file added successfully.");
  } catch (error) {
    toast.error("Failed to add the new file", (error as FirebaseError).message);
  }
}

export async function updateFile(
  fileNo: number | string,
  fileYear: number | string,
  data: FileData,
) {
  const fileRef = getDatabaseReference(
    `file/${fileYear}/${toFileDbKey(fileNo)}`,
  );

  try {
    await update(fileRef, sanitizeData(data));
    toast.success("File updated successfully.");
  } catch (error) {
    toast.error("Failed to update the file", (error as FirebaseError).message);
  }
}

export async function updateFileExpense(
  fileNo: number | string,
  fileYear: number | string,
  expenseType: "port" | "custom" | "delivery" | "other",
  data: FileData,
) {
  const fileRef = getDatabaseReference(
    `file/${fileYear}/${toFileDbKey(fileNo)}/${expenseType}`,
  );

  try {
    await set(fileRef, sanitizeData(data));
    toast.success(
      getFullFileNo(fileNo, fileYear),
      `${expenseType.charAt(0).toUpperCase() + expenseType.slice(1)} expense updated successfully.`,
    );
  } catch (error) {
    toast.error(
      `Failed to update the ${expenseType.charAt(0).toUpperCase() + expenseType.slice(1)} expense`,
      (error as FirebaseError).message,
    );
  }
}

export async function updateFileStatus(
  fileNo: number | string,
  fileYear: number | string,
  currentStatus: string,
  status: string,
) {
  const fileCode = getFullFileNo(fileNo, fileYear);
  const fileRef = getDatabaseReference(
    `file/${fileYear}/${toFileDbKey(fileNo)}`,
  );

  try {
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
  const fileRef = getDatabaseReference(
    `file/${fileYear}/${toFileDbKey(fileNoStr)}`,
  );

  try {
    await remove(fileRef);
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
  copy = false,
) {
  const currentFileKey = toFileDbKey(currentFileNo);
  const newFileKey = toFileDbKey(newFileNo);

  const currentFileRef = getDatabaseReference(
    `file/${fileYear}/${currentFileKey}`,
  );
  const newFileRef = getDatabaseReference(`file/${fileYear}/${newFileKey}`);

  try {
    if (copy) {
      await set(currentFileRef, newFileVal);
    } else {
      await remove(currentFileRef);
      if (!newFileVal) {
        await set(newFileRef, currentFileVal);
      } else {
        await remove(newFileRef);
        await set(newFileRef, currentFileVal);
        await set(currentFileRef, newFileVal);
      }
    }
    toast.success(
      `${copy ? "Copied the file details" : "Changed the file number"} successfully.`,
    );
  } catch (error) {
    toast.error(
      `Failed to ${copy ? "copy" : "change"} the file number`,
      (error as FirebaseError).message,
    );
  }
}
