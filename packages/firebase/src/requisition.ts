import { RequisitionData } from "@repo/types";
import {
  getDatabaseReference,
  getDatabaseReferenceExists,
  sanitizeData,
} from "./helpers";
import { remove, set } from "firebase/database";
import { toast } from "../../ui/src/core/toast";
import { FirebaseError } from "firebase/app";
import { toRequisitionDbKey } from "../../core/utils";

export async function requisitionInfo(dbRef: string, data: RequisitionData) {
  const isNew = await getDatabaseReferenceExists(dbRef);
  try {
    await set(getDatabaseReference(dbRef), data);
    toast.success(
      isNew
        ? "New requisition added successfully."
        : "Requisition updated successfully.",
    );
  } catch (error) {
    toast.error(
      isNew
        ? "Failed to add the new requisition"
        : "Failed to update the requisition",
      (error as FirebaseError).message,
    );
  }
}

export async function requisitionFileExpense(
  year: number | string,
  requisitionNo: number | string,
  fileNo: string,
  data: any,
) {
  const dbRef = `requisition/${year}/${toRequisitionDbKey(requisitionNo)}/files/${fileNo}`;
  const sanitizedData = sanitizeData(data);
  const result = ((): Record<string, any> => {
    if (!sanitizedData) return { port: 0 };
    const allNull = Object.values(sanitizedData).every((v) => v === null);
    return allNull ? { port: 0 } : sanitizedData;
  })();

  try {
    await set(getDatabaseReference(dbRef), result);
    toast.success("Requisition expense updated successfully.");
  } catch (error) {
    console.error("Failed to update the requisition expense:", error);
    toast.error(
      "Failed to update the requisition expense",
      (error as FirebaseError).message,
    );
  }
}

export async function deleteRequisition(
  requisitionNo: number | string,
  year: number | string,
) {
  const ref = getDatabaseReference(
    `requisition/${year}/${toRequisitionDbKey(requisitionNo)}`,
  );

  try {
    await remove(ref);
    toast.success("Deleted the requisition successfully.");
  } catch (error) {
    console.error("Failed to delete the requisition:", error);
    toast.error(
      "Failed to delete the requisition",
      (error as FirebaseError).message,
    );
  }
}
