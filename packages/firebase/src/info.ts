import type { ImporterData } from "@repo/types";
import { update, remove } from "firebase/database";
import { getDatabaseReference } from "./helpers";
import { toast } from "../../ui";
import { FirebaseError } from "firebase/app";

export async function updateImporterInfo(importer: string, data: ImporterData) {
  const ref = getDatabaseReference(`info/importer/${importer}`);
  try {
    await update(ref, data);
    toast.success(importer, "Importer info updated successfully");
  } catch (error) {
    toast.error(
      "Failed to update importer info:",
      (error as FirebaseError).message,
    );
  }
}

export async function removeImporterInfo(importer: string) {
  const ref = getDatabaseReference(`info/importer/${importer}`);
  try {
    await remove(ref);
    toast.success(importer, "Importer info removed successfully");
  } catch (error) {
    toast.error(
      "Failed to remove importer info:",
      (error as FirebaseError).message,
    );
  }
}
